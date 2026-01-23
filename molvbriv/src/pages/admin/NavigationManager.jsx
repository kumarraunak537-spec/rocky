import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Plus, Edit, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import './PageManager.css'; // Reusing styles

const NavigationManager = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeLocation, setActiveLocation] = useState('header');
    const [formData, setFormData] = useState({
        label: '',
        url: '',
        location: 'header',
        order_index: 0,
        is_visible: true,
        open_in_new_tab: false
    });

    useEffect(() => {
        fetchNavigation();
    }, [activeLocation]);

    const fetchNavigation = async () => {
        try {
            const { data, error } = await supabase
                .from('navigation')
                .select('*')
                .eq('location', activeLocation)
                .order('order_index', { ascending: true });

            if (error) throw error;
            setItems(data || []);
        } catch (error) {
            console.error('Error fetching navigation:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                label: item.label,
                url: item.url,
                location: item.location,
                order_index: item.order_index,
                is_visible: item.is_visible,
                open_in_new_tab: item.open_in_new_tab || false
            });
        } else {
            setEditingItem(null);
            setFormData({
                label: '',
                url: '',
                location: activeLocation,
                order_index: items.length,
                is_visible: true,
                open_in_new_tab: false
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingItem) {
                const { error } = await supabase
                    .from('navigation')
                    .update(formData)
                    .eq('id', editingItem.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('navigation')
                    .insert([formData]);
                if (error) throw error;
            }

            fetchNavigation();
            closeModal();
        } catch (error) {
            console.error('Error saving navigation:', error);
            alert('Error saving: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this menu item?')) return;

        try {
            const { error } = await supabase
                .from('navigation')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchNavigation();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const toggleVisibility = async (item) => {
        try {
            const { error } = await supabase
                .from('navigation')
                .update({ is_visible: !item.is_visible })
                .eq('id', item.id);
            if (error) throw error;
            fetchNavigation();
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading navigation...</div>;
    }

    return (
        <div className="page-manager">
            <div className="page-header">
                <div>
                    <h1>Navigation</h1>
                    <p>Manage header and footer menus</p>
                </div>
                <button className="btn-add" onClick={() => openModal()}>
                    <Plus size={20} />
                    Add Menu Item
                </button>
            </div>

            {/* Location Tabs */}
            <div className="nav-tabs">
                {['header', 'footer'].map(loc => (
                    <button
                        key={loc}
                        className={`nav-tab ${activeLocation === loc ? 'active' : ''}`}
                        onClick={() => setActiveLocation(loc)}
                    >
                        {loc} Menu
                    </button>
                ))}
            </div>

            <div className="pages-table">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '40px' }}></th>
                            <th>Label</th>
                            <th>URL</th>
                            <th>Visible</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td><GripVertical size={16} style={{ color: '#ccc', cursor: 'grab' }} /></td>
                                <td>
                                    <strong>{item.label}</strong>
                                    {item.open_in_new_tab && <ExternalLink size={12} style={{ marginLeft: '0.5rem', color: '#888' }} />}
                                </td>
                                <td className="slug-cell">{item.url}</td>
                                <td>
                                    <span
                                        className={`status-badge ${item.is_visible ? 'published' : 'draft'}`}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => toggleVisibility(item)}
                                    >
                                        {item.is_visible ? 'Visible' : 'Hidden'}
                                    </span>
                                </td>
                                <td>
                                    <div className="actions">
                                        <button className="btn-icon" onClick={() => openModal(item)} title="Edit">
                                            <Edit size={18} />
                                        </button>
                                        <button className="btn-icon delete" onClick={() => handleDelete(item.id)} title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td colSpan="5" className="empty-state">
                                    No menu items. Add your first one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Label</label>
                                <input
                                    type="text"
                                    name="label"
                                    value={formData.label}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., About Us"
                                />
                            </div>
                            <div className="form-group">
                                <label>URL</label>
                                <input
                                    type="text"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    required
                                    placeholder="/about or https://..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <select name="location" value={formData.location} onChange={handleChange}>
                                    <option value="header">Header</option>
                                    <option value="footer">Footer</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="is_visible"
                                            checked={formData.is_visible}
                                            onChange={handleChange}
                                        />
                                        Visible
                                    </label>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="open_in_new_tab"
                                            checked={formData.open_in_new_tab}
                                            onChange={handleChange}
                                        />
                                        Open in new tab
                                    </label>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-save">
                                    {editingItem ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavigationManager;
