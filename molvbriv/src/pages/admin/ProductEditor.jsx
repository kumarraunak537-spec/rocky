import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import {
    ArrowLeft, Save, Trash2, X, Plus, GripVertical,
    Image as ImageIcon, CheckCircle, AlertCircle, Tag,
    Package, DollarSign, BarChart3, Search, Eye
} from 'lucide-react';
import './ProductEditor.css';

const ProductEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id || id === 'new';

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [toast, setToast] = useState(null);

    // Form State
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        compare_price: '',
        cost: '',
        sku: '',
        stock_quantity: 0,
        track_inventory: false,
        status: 'draft',
        category: 'Clothes',
        gender: '',
        subcategory: '',
        color: '',
        image: '',
        gallery: [],
        details: [],
        tags: [],
        is_featured: false,
        seo_title: '',
        seo_description: '',
        url_handle: '',
    });

    const [newTag, setNewTag] = useState('');
    const [newDetail, setNewDetail] = useState('');
    const [uploading, setUploading] = useState(false);

    const SUBCATEGORIES = {
        Men: ["Jeans", "Shirts", "T-Shirts", "Formal Pants", "Jackets", "Hoodies", "Shoes"],
        Women: ["Saree", "Kurti", "Lehenga", "One Piece Dress", "Suit", "Tops", "Slippers", "Jutti", "Shoes"]
    };

    // Fetch existing product
    useEffect(() => {
        if (!isNew) {
            fetchProduct();
        }
    }, [id]);

    // Auto-generate URL handle from name
    useEffect(() => {
        if (product.name && !product.url_handle) {
            const handle = product.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            updateProduct({ url_handle: handle });
        }
    }, [product.name]);

    const fetchProduct = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching product:', error);
            showToast('Error loading product', 'error');
        } else if (data) {
            setProduct({
                ...data,
                gallery: data.gallery || [],
                details: data.details || [],
                tags: data.tags || [],
                price: data.price?.toString() || '',
                compare_price: data.compare_price?.toString() || '',
                cost: data.cost?.toString() || '',
            });
        }
        setLoading(false);
    };

    const updateProduct = (updates) => {
        setProduct(prev => ({ ...prev, ...updates }));
        setHasChanges(true);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Calculate profit margin
    const calculateMargin = () => {
        const price = parseFloat(product.price) || 0;
        const cost = parseFloat(product.cost) || 0;
        if (price > 0 && cost > 0) {
            const margin = ((price - cost) / price * 100).toFixed(1);
            return `${margin}% margin`;
        }
        return null;
    };

    // Convert file to base64 and add to gallery (works without Supabase Storage)
    const uploadImage = async (file) => {
        if (!file) return;

        setUploading(true);

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            setUploading(false);
            return;
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image too large (max 5MB)', 'error');
            setUploading(false);
            return;
        }

        try {
            // Convert to base64
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Url = e.target.result;

                // Add to gallery
                const newGallery = [...product.gallery, base64Url];
                updateProduct({
                    gallery: newGallery,
                    image: product.image || base64Url
                });

                showToast('Image added!', 'success');
                setUploading(false);
            };
            reader.onerror = () => {
                showToast('Failed to read image', 'error');
                setUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error('Upload error:', err);
            showToast('Failed to add image', 'error');
            setUploading(false);
        }
    };

    // Handle file input change
    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            Array.from(files).forEach(file => uploadImage(file));
        }
    };

    // Handle drag and drop
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            Array.from(files).forEach(file => uploadImage(file));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeImage = (url) => {
        const newGallery = product.gallery.filter(img => img !== url);
        updateProduct({
            gallery: newGallery,
            image: product.image === url ? (newGallery[0] || '') : product.image
        });
    };

    const setMainImage = (url) => {
        updateProduct({ image: url });
    };

    // Tags
    const addTag = () => {
        if (newTag && !product.tags.includes(newTag)) {
            updateProduct({ tags: [...product.tags, newTag] });
            setNewTag('');
        }
    };

    const removeTag = (tag) => {
        updateProduct({ tags: product.tags.filter(t => t !== tag) });
    };

    // Details
    const addDetail = () => {
        if (newDetail && !product.details.includes(newDetail)) {
            updateProduct({ details: [...product.details, newDetail] });
            setNewDetail('');
        }
    };

    const removeDetail = (detail) => {
        updateProduct({ details: product.details.filter(d => d !== detail) });
    };

    // Save product
    const handleSave = async () => {
        if (!product.name || !product.price) {
            showToast('Name and Price are required', 'error');
            return;
        }

        setSaving(true);

        const productData = {
            name: product.name,
            description: product.description || null,
            price: parseFloat(product.price),
            compare_price: product.compare_price ? parseFloat(product.compare_price) : null,
            cost: product.cost ? parseFloat(product.cost) : null,
            sku: product.sku || null,
            stock_quantity: parseInt(product.stock_quantity) || 0,
            track_inventory: product.track_inventory,
            status: product.status,
            category: product.category,
            gender: product.gender || null,
            subcategory: product.subcategory || null,
            color: product.color || null,
            image: product.image || product.gallery[0] || null,
            gallery: product.gallery,
            details: product.details,
            tags: product.tags,
            is_featured: product.is_featured,
            seo_title: product.seo_title || null,
            seo_description: product.seo_description || null,
            url_handle: product.url_handle || null,
        };

        console.log('Saving product:', productData);

        let error;
        if (isNew) {
            const { error: insertError } = await supabase
                .from('products')
                .insert([productData]);
            error = insertError;
        } else {
            const { error: updateError } = await supabase
                .from('products')
                .update(productData)
                .eq('id', id);
            error = updateError;
        }

        setSaving(false);

        if (error) {
            console.error('Save error:', error);
            showToast('Failed to save: ' + error.message, 'error');
        } else {
            showToast('Product saved successfully!', 'success');
            setHasChanges(false);
            if (isNew) {
                navigate('/admin/products');
            }
        }
    };

    // Delete product
    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this product? This cannot be undone.')) {
            return;
        }

        const { error } = await supabase.from('products').delete().eq('id', id);

        if (error) {
            showToast('Failed to delete: ' + error.message, 'error');
        } else {
            showToast('Product deleted', 'success');
            navigate('/admin/products');
        }
    };

    // Discard changes
    const handleDiscard = () => {
        if (hasChanges && !window.confirm('Discard unsaved changes?')) {
            return;
        }
        if (isNew) {
            navigate('/admin/products');
        } else {
            fetchProduct();
            setHasChanges(false);
        }
    };

    if (loading) {
        return <div className="editor-loading">Loading product...</div>;
    }

    return (
        <div className="product-editor">
            {/* Toast Notification */}
            {toast && (
                <div className={`toast toast-${toast.type}`}>
                    {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    {toast.message}
                </div>
            )}

            {/* Top Bar */}
            <div className="editor-topbar">
                <div className="topbar-left">
                    <Link to="/admin/products" className="back-btn">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1>{isNew ? 'Add product' : product.name || 'Edit product'}</h1>
                    <span className={`status-badge status-${product.status}`}>
                        {product.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                </div>
                <div className="topbar-right">
                    {hasChanges && (
                        <button className="btn-discard" onClick={handleDiscard}>
                            Discard
                        </button>
                    )}
                    <button
                        className="btn-save"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        <Save size={16} />
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="editor-content">
                {/* Left Column */}
                <div className="editor-main">

                    {/* Title & Description */}
                    <div className="editor-card">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={product.name}
                                onChange={e => updateProduct({ name: e.target.value })}
                                placeholder="Short sleeve t-shirt"
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={product.description}
                                onChange={e => updateProduct({ description: e.target.value })}
                                placeholder="Describe your product..."
                                rows={5}
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="editor-card">
                        <h3><ImageIcon size={18} /> Media</h3>
                        <div className="media-grid">
                            {product.gallery.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`media-item ${product.image === img ? 'main' : ''}`}
                                >
                                    <img src={img} alt={`Product ${idx + 1}`} />
                                    <div className="media-actions">
                                        {product.image !== img && (
                                            <button onClick={() => setMainImage(img)} title="Set as main">
                                                <CheckCircle size={14} />
                                            </button>
                                        )}
                                        <button onClick={() => removeImage(img)} className="delete" title="Remove">
                                            <X size={14} />
                                        </button>
                                    </div>
                                    {product.image === img && <span className="main-badge">Main</span>}
                                </div>
                            ))}
                            <div
                                className="media-dropzone"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileSelect}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="image-upload" className="dropzone-label">
                                    {uploading ? (
                                        <span>Uploading...</span>
                                    ) : (
                                        <>
                                            <Plus size={24} />
                                            <span>Drop images here or click to upload</span>
                                        </>
                                    )}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="editor-card">
                        <h3><DollarSign size={18} /> Pricing</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={product.price}
                                    onChange={e => updateProduct({ price: e.target.value })}
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="form-group">
                                <label>Compare-at price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={product.compare_price}
                                    onChange={e => updateProduct({ compare_price: e.target.value })}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Cost per item</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={product.cost}
                                    onChange={e => updateProduct({ cost: e.target.value })}
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="form-group margin-display">
                                {calculateMargin() && (
                                    <span className="margin-badge">{calculateMargin()}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Inventory */}
                    <div className="editor-card">
                        <h3><Package size={18} /> Inventory</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>SKU (Stock Keeping Unit)</label>
                                <input
                                    type="text"
                                    value={product.sku}
                                    onChange={e => updateProduct({ sku: e.target.value })}
                                    placeholder="SKU-001"
                                />
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    value={product.stock_quantity}
                                    onChange={e => updateProduct({ stock_quantity: e.target.value })}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={product.track_inventory}
                                    onChange={e => updateProduct({ track_inventory: e.target.checked })}
                                />
                                Track quantity
                            </label>
                        </div>
                        <div className="stock-status">
                            {product.stock_quantity > 0 ? (
                                <span className="in-stock">● In stock ({product.stock_quantity})</span>
                            ) : (
                                <span className="out-of-stock">● Out of stock</span>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="editor-card">
                        <h3><BarChart3 size={18} /> Product Details</h3>
                        <div className="tags-list">
                            {product.details.map((detail, idx) => (
                                <span key={idx} className="tag-item">
                                    {detail}
                                    <button onClick={() => removeDetail(detail)}><X size={12} /></button>
                                </span>
                            ))}
                        </div>
                        <div className="tag-input">
                            <input
                                type="text"
                                value={newDetail}
                                onChange={e => setNewDetail(e.target.value)}
                                placeholder="Add detail (e.g. 100% Cotton)"
                                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addDetail())}
                            />
                            <button onClick={addDetail}><Plus size={16} /></button>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="editor-card">
                        <h3><Search size={18} /> Search engine listing</h3>
                        <div className="seo-preview">
                            <div className="seo-title">{product.seo_title || product.name || 'Page title'}</div>
                            <div className="seo-url">molvbriv.com/products/{product.url_handle || 'url-handle'}</div>
                            <div className="seo-desc">{product.seo_description || product.description?.slice(0, 150) || 'Description...'}</div>
                        </div>
                        <div className="form-group">
                            <label>Page title</label>
                            <input
                                type="text"
                                value={product.seo_title}
                                onChange={e => updateProduct({ seo_title: e.target.value })}
                                placeholder={product.name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Meta description</label>
                            <textarea
                                value={product.seo_description}
                                onChange={e => updateProduct({ seo_description: e.target.value })}
                                placeholder="Brief description for search engines..."
                                rows={3}
                            />
                        </div>
                        <div className="form-group">
                            <label>URL handle</label>
                            <input
                                type="text"
                                value={product.url_handle}
                                onChange={e => updateProduct({ url_handle: e.target.value })}
                                placeholder="product-url-handle"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="editor-sidebar">
                    {/* Status */}
                    <div className="editor-card">
                        <h3>Status</h3>
                        <select
                            value={product.status}
                            onChange={e => updateProduct({ status: e.target.value })}
                            className="status-select"
                        >
                            <option value="draft">Draft</option>
                            <option value="active">Active</option>
                        </select>
                    </div>

                    {/* Organization */}
                    <div className="editor-card">
                        <h3>Product organization</h3>
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={product.category}
                                onChange={e => updateProduct({
                                    category: e.target.value,
                                    gender: e.target.value === 'Clothes' ? product.gender : '',
                                    subcategory: e.target.value === 'Clothes' ? product.subcategory : ''
                                })}
                            >
                                <option value="Clothes">Clothes</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Jewelry">Jewelry</option>
                            </select>
                        </div>

                        {product.category === 'Clothes' && (
                            <>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select
                                        value={product.gender}
                                        onChange={e => updateProduct({ gender: e.target.value, subcategory: '' })}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Subcategory</label>
                                    <select
                                        value={product.subcategory}
                                        onChange={e => updateProduct({ subcategory: e.target.value })}
                                        disabled={!product.gender}
                                    >
                                        <option value="">Select...</option>
                                        {product.gender && SUBCATEGORIES[product.gender]?.map(sub => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label>Color</label>
                            <input
                                type="text"
                                value={product.color}
                                onChange={e => updateProduct({ color: e.target.value })}
                                placeholder="e.g. Brown"
                            />
                        </div>

                        <div className="form-group">
                            <label>Tags</label>
                            <div className="tags-list">
                                {product.tags.map((tag, idx) => (
                                    <span key={idx} className="tag-item">
                                        {tag}
                                        <button onClick={() => removeTag(tag)}><X size={12} /></button>
                                    </span>
                                ))}
                            </div>
                            <div className="tag-input">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={e => setNewTag(e.target.value)}
                                    placeholder="Add tag"
                                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                />
                                <button onClick={addTag}><Plus size={16} /></button>
                            </div>
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={product.is_featured}
                                    onChange={e => updateProduct({ is_featured: e.target.checked })}
                                />
                                Featured product
                            </label>
                        </div>
                    </div>

                    {/* Delete */}
                    {!isNew && (
                        <div className="editor-card danger-zone">
                            <button className="btn-delete" onClick={handleDelete}>
                                <Trash2 size={16} />
                                Delete product
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductEditor;
