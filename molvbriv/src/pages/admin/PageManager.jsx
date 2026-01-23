import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Plus, Edit, Trash2, Eye, EyeOff, Home, Layers } from 'lucide-react';
import './PageManager.css';

const PageManager = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPage, setEditingPage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        seo_title: '',
        seo_description: '',
        status: 'draft',
        is_homepage: false
    });

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPages(data || []);
        } catch (error) {
            console.error('Error fetching pages:', error);
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

        // Auto-generate slug from name
        if (name === 'name' && !editingPage) {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const openModal = (page = null) => {
        if (page) {
            setEditingPage(page);
            setFormData({
                name: page.name,
                slug: page.slug,
                seo_title: page.seo_title || '',
                seo_description: page.seo_description || '',
                status: page.status,
                is_homepage: page.is_homepage
            });
        } else {
            setEditingPage(null);
            setFormData({
                name: '',
                slug: '',
                seo_title: '',
                seo_description: '',
                status: 'draft',
                is_homepage: false
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingPage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingPage) {
                const { error } = await supabase
                    .from('pages')
                    .update(formData)
                    .eq('id', editingPage.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('pages')
                    .insert([formData]);
                if (error) throw error;
            }

            fetchPages();
            closeModal();
        } catch (error) {
            console.error('Error saving page:', error);
            alert('Error saving page: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this page?')) return;

        try {
            const { error } = await supabase
                .from('pages')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchPages();
        } catch (error) {
            console.error('Error deleting page:', error);
        }
    };

    const toggleStatus = async (page) => {
        const newStatus = page.status === 'published' ? 'draft' : 'published';
        try {
            const { error } = await supabase
                .from('pages')
                .update({ status: newStatus })
                .eq('id', page.id);
            if (error) throw error;
            fetchPages();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading pages...</div>;
    }

    return (
        <div className="page-manager">
            <div className="page-header">
                <div>
                    <h1>Pages</h1>
                    <p>Manage your website pages</p>
                </div>
                <button className="btn-add" onClick={() => openModal()}>
                    <Plus size={20} />
                    Add Page
                </button>
            </div>

            <div className="pages-table">
                <table>
                    <thead>
                        <tr>
                            <th>Page Name</th>
                            <th>URL Slug</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map(page => (
                            <tr key={page.id}>
                                <td>
                                    <div className="page-name">
                                        {page.is_homepage && <Home size={16} className="home-icon" />}
                                        {page.name}
                                    </div>
                                </td>
                                <td className="slug-cell">/{page.slug}</td>
                                <td>
                                    <span className={`status-badge ${page.status}`}>
                                        {page.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="actions">
                                        <Link
                                            to={`/admin/pages/${page.id}/sections`}
                                            className="btn-icon"
                                            title="Edit Sections"
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            <Layers size={18} />
                                        </Link>
                                        <button
                                            className="btn-icon"
                                            onClick={() => toggleStatus(page)}
                                            title={page.status === 'published' ? 'Unpublish' : 'Publish'}
                                        >
                                            {page.status === 'published' ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                        <button className="btn-icon" onClick={() => openModal(page)} title="Edit Settings">
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            className="btn-icon delete"
                                            onClick={() => handleDelete(page.id)}
                                            title="Delete"
                                            disabled={page.is_homepage}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {pages.length === 0 && (
                            <tr>
                                <td colSpan="4" className="empty-state">
                                    No pages found. Create your first page!
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
                        <h2>{editingPage ? 'Edit Page' : 'Add New Page'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Page Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., About Us"
                                />
                            </div>
                            <div className="form-group">
                                <label>URL Slug</label>
                                <div className="slug-input">
                                    <span>/</span>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleChange}
                                        required
                                        placeholder="about-us"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>SEO Title</label>
                                <input
                                    type="text"
                                    name="seo_title"
                                    value={formData.seo_title}
                                    onChange={handleChange}
                                    placeholder="Page title for search engines"
                                />
                            </div>
                            <div className="form-group">
                                <label>SEO Description</label>
                                <textarea
                                    name="seo_description"
                                    value={formData.seo_description}
                                    onChange={handleChange}
                                    placeholder="Brief description for search engines"
                                    rows={3}
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange}>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="is_homepage"
                                            checked={formData.is_homepage}
                                            onChange={handleChange}
                                        />
                                        Set as Homepage
                                    </label>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-save">
                                    {editingPage ? 'Update Page' : 'Create Page'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageManager;
