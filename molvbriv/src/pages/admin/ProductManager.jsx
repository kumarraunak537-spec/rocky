
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Plus, Edit2, Trash2, X, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import './ProductManager.css';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const ITEMS_PER_PAGE = 20;

    // Image Verification State
    const [imageStatus, setImageStatus] = useState('idle'); // idle, checking, valid, invalid

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Clothes', // Default
        gender: '', // New
        subcategory: '', // New
        description: '',
        color: '',
        image: '',
        detailsText: '', // For textarea input
    });

    const SUBCATEGORIES = {
        Men: ["Jeans", "Shirts", "T-Shirts", "Formal Pants", "Jackets", "Hoodies", "Shoes"],
        Women: ["Saree", "Kurti", "Lehenga", "One Piece Dress", "Suit", "Tops", "Slippers", "Jutti", "Shoes"]
    };

    useEffect(() => {
        fetchProducts(0, true);
    }, []);

    const fetchProducts = async (pageIndex = 0, refresh = false) => {
        if (refresh) setLoading(true);

        const from = pageIndex * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            if (refresh) {
                setProducts(data || []);
            } else {
                setProducts(prev => [...prev, ...(data || [])]);
            }

            // If we got fewer items than requested, we've reached the end
            if ((data || []).length < ITEMS_PER_PAGE) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setPage(pageIndex);
        }
        setLoading(false);
    };

    const loadMore = () => {
        fetchProducts(page + 1, false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) alert('Error deleting product: ' + error.message);
            else {
                // Optimistic update
                setProducts(products.filter(p => p.id !== id));
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            gender: product.gender || '',
            subcategory: product.subcategory || '',
            description: product.description || '',
            color: product.color || '',
            image: product.image || '',
            detailsText: (product.details || []).join('\n'), // Convert array to text
        });
        setImageStatus('idle'); // Reset verification on edit
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            price: '',
            category: 'Clothes',
            gender: '',
            subcategory: '',
            description: '',
            color: '',
            image: '',
        });
        setImageStatus('idle');
        setIsModalOpen(true);
    };

    const verifyImage = (url) => {
        if (!url) return;
        setImageStatus('checking');
        const img = new Image();
        img.src = url;
        img.onload = () => setImageStatus('valid');
        img.onerror = () => setImageStatus('invalid');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.price || !formData.image) {
            alert("Name, Price, and Image URL are required!");
            return;
        }

        // Auto-verify if not verified yet
        if (imageStatus === 'idle') {
            verifyImage(formData.image);
            // We continue saving, but maybe we should warn? 
            // For now, let's proceed but user sees the status update.
        }

        // Convert detailsText to array (split by newlines, filter empty)
        const detailsArray = (formData.detailsText || '')
            .split('\n')
            .map(line => line.replace(/^[•\-\*]\s*/, '').trim()) // Remove bullet prefixes
            .filter(line => line.length > 0);

        const productData = {
            name: formData.name,
            price: parseFloat(formData.price),
            category: formData.category,
            gender: formData.gender || null,
            subcategory: formData.subcategory || null,
            description: formData.description || null,
            color: formData.color || null,
            image: formData.image,
            gallery: editingProduct?.gallery || [formData.image],
            details: detailsArray.length > 0 ? detailsArray : (editingProduct?.details || []),
        };

        if (isNaN(productData.price)) {
            alert("Price must be a valid number");
            return;
        }

        let error;
        try {
            console.log("Saving product data:", productData); // Debug Log

            if (editingProduct) {
                console.log("Updating product:", editingProduct.id);
                const { error: updateError } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', editingProduct.id);
                error = updateError;
            } else {
                console.log("Inserting new product...");
                const { error: insertError, data: insertData } = await supabase
                    .from('products')
                    .insert([productData])
                    .select(); // Select to confirm return
                error = insertError;
                console.log("Insert result:", { insertData, insertError });
            }
        } catch (err) {
            console.error("Unexpected catch error:", err);
            error = err;
        }

        if (error) {
            console.error('Supabase Save Error Details:', error);
            alert('FAILED to save product. Check console for details.\nError: ' + (error.message || JSON.stringify(error)));
        } else {
            console.log("Product saved successfully!");
            alert("Product saved successfully!");
            setIsModalOpen(false);
            setIsModalOpen(false);
            fetchProducts(0, true); // Reset list to show new/updated item at top
            // Reset form
            setFormData({
                name: '',
                price: '',
                category: 'Bags',
                gender: '',
                subcategory: '',
                description: '',
                color: '',
                image: '',
            });
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h2>Products</h2>
                <Link to="/admin/products/new" className="add-btn">
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Info</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-thumb"
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                                            {product.gender && <div>{product.gender}</div>}
                                            {product.subcategory && <div>{product.subcategory}</div>}
                                        </div>
                                    </td>
                                    <td>Rs.{product.price}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/admin/products/${product.id}/edit`} className="icon-btn edit">
                                                <Edit2 size={16} />
                                            </Link>
                                            <button className="icon-btn delete" onClick={() => handleDelete(product.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                                        No products found. Add one to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {!loading && hasMore && (
                <div style={{ textAlign: 'center', marginTop: '1rem', paddingBottom: '2rem' }}>
                    <button
                        onClick={loadMore}
                        className="btn-secondary"
                        style={{ padding: '0.8rem 2rem' }}
                    >
                        Load More Products
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{editingProduct ? 'Edit Product' : 'New Product'}</h3>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            {/* Name Input */}
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Classic Tote"
                                    required
                                />
                            </div>

                            {/* Price & Category */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Price (Rs.)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({
                                            ...formData,
                                            category: e.target.value,
                                            // Reset sub fields if changing away from Clothes
                                            gender: e.target.value === 'Clothes' ? formData.gender : '',
                                            subcategory: e.target.value === 'Clothes' ? formData.subcategory : ''
                                        })}
                                    >
                                        <option value="Clothes">Clothes</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Jewelry">Jewelry</option>
                                    </select>
                                </div>
                            </div>

                            {/* Clothes Specific Fields */}
                            {formData.category === 'Clothes' && (
                                <div className="form-row" style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '4px' }}>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select
                                            value={formData.gender}
                                            onChange={e => setFormData({ ...formData, gender: e.target.value, subcategory: '' })}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Men">Men</option>
                                            <option value="Women">Women</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Subcategory</label>
                                        <select
                                            value={formData.subcategory}
                                            onChange={e => setFormData({ ...formData, subcategory: e.target.value })}
                                            required
                                            disabled={!formData.gender}
                                        >
                                            <option value="">Select Item</option>
                                            {formData.gender && SUBCATEGORIES[formData.gender] && SUBCATEGORIES[formData.gender].map(sub => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Image Verification Section */}
                            <div className="form-group">
                                <label>Image URL</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        value={formData.image}
                                        onChange={e => {
                                            setFormData({ ...formData, image: e.target.value });
                                            if (imageStatus !== 'idle') setImageStatus('idle');
                                        }}
                                        placeholder="https://..."
                                        style={{ flex: 1 }}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="verify-btn"
                                        onClick={() => verifyImage(formData.image)}
                                        disabled={!formData.image || imageStatus === 'checking'}
                                        style={{
                                            padding: '0.8rem',
                                            background: '#f3f4f6',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {imageStatus === 'checking' ? '...' : 'Verify'}
                                    </button>
                                </div>

                                {formData.image && (
                                    <div className="image-preview-area" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {imageStatus === 'valid' && (
                                            <>
                                                <CheckCircle size={16} color="green" />
                                                <span style={{ color: 'green', fontSize: '0.85rem' }}>Image Valid</span>
                                                <img src={formData.image} alt="Preview" style={{ height: '40px', borderRadius: '4px', border: '1px solid #ddd' }} />
                                            </>
                                        )}
                                        {imageStatus === 'invalid' && (
                                            <>
                                                <AlertCircle size={16} color="red" />
                                                <span style={{ color: 'red', fontSize: '0.85rem' }}>Invalid Image URL</span>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Color */}
                            <div className="form-group">
                                <label>Color</label>
                                <input
                                    value={formData.color}
                                    onChange={e => setFormData({ ...formData, color: e.target.value })}
                                    placeholder="e.g. Brown"
                                />
                            </div>

                            {/* Description */}
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    placeholder="Brief product description..."
                                />
                            </div>

                            {/* Product Details (Bullet Points) */}
                            <div className="form-group">
                                <label>Product Details <span style={{ fontSize: '0.8rem', color: '#888' }}>(one per line)</span></label>
                                <textarea
                                    value={formData.detailsText || ''}
                                    onChange={e => setFormData({ ...formData, detailsText: e.target.value })}
                                    rows={4}
                                    placeholder="• Premium Quality Material
• Handcrafted Design
• Signature Branding"
                                />
                            </div>

                            {/* Actions */}
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button
                                    type="submit"
                                    className="save-btn"
                                    disabled={loading || (imageStatus === 'checking')}
                                >
                                    {loading ? 'Saving...' : 'Save Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManager;
