import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { ArrowLeft, Save, Image as ImageIcon, X } from 'lucide-react';
import './ProductEditor.css'; // Reusing ProductEditor styles

const ContentEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [article, setArticle] = useState({
        title: '',
        slug: '',
        category: 'Lifestyle',
        excerpt: '',
        content: '',
        image: '',
        status: 'draft',
        author: 'Admin',
        published_at: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (!isNew) fetchArticle();
    }, [id]);

    // Auto-generate slug
    useEffect(() => {
        if (article.title && !article.slug && isNew) {
            const slug = article.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setArticle(prev => ({ ...prev, slug }));
        }
    }, [article.title]);

    const fetchArticle = async () => {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', id)
            .single();

        if (data) setArticle(data);
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    };

    const uploadImage = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => setArticle(prev => ({ ...prev, image: e.target.result }));
        reader.readAsDataURL(file);
    };

    const handleSave = async () => {
        if (!article.title) return alert('Title is required');
        setSaving(true);

        const payload = { ...article };
        let error;

        if (isNew) {
            const { error: insertError } = await supabase.from('articles').insert([payload]);
            error = insertError;
        } else {
            const { error: updateError } = await supabase.from('articles').update(payload).eq('id', id);
            error = updateError;
        }

        setSaving(false);
        if (error) {
            alert('Error saving article: ' + error.message);
        } else {
            navigate('/admin/content');
        }
    };

    if (loading) return <div className="editor-loading">Loading...</div>;

    return (
        <div className="product-editor"> {/* Reusing class for layout */}
            <div className="editor-topbar">
                <div className="topbar-left">
                    <Link to="/admin/content" className="back-btn">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1>{isNew ? 'New Article' : 'Edit Article'}</h1>
                    <span className={`status-badge ${article.status}`}>{article.status}</span>
                </div>
                <div className="topbar-right">
                    <button className="btn-save" onClick={handleSave} disabled={saving}>
                        <Save size={16} /> {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            <div className="editor-content">
                <div className="editor-main">
                    <div className="editor-card">
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                value={article.title}
                                onChange={handleChange}
                                placeholder="Article Title"
                            />
                        </div>
                        <div className="form-group">
                            <label>Content (HTML)</label>
                            <textarea
                                name="content"
                                value={article.content}
                                onChange={handleChange}
                                rows={15}
                                placeholder="<p>Write your article content here...</p>"
                                style={{ fontFamily: 'monospace' }}
                            />
                        </div>
                    </div>

                    <div className="editor-card">
                        <h3>Excerpt</h3>
                        <textarea
                            name="excerpt"
                            value={article.excerpt}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Short summary..."
                        />
                    </div>
                </div>

                <div className="editor-sidebar">
                    <div className="editor-card">
                        <h3>Status</h3>
                        <select name="status" value={article.status} onChange={handleChange}>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                        <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label>Published Date</label>
                            <input
                                type="date"
                                name="published_at"
                                value={article.published_at}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="editor-card">
                        <h3>Organization</h3>
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                value={article.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={article.slug}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="editor-card">
                        <h3>Cover Image</h3>
                        <div className="image-uploader">
                            {article.image && (
                                <div className="image-preview">
                                    <img src={article.image} alt="Cover" />
                                    <button className="btn-remove-image" onClick={() => setArticle(prev => ({ ...prev, image: '' }))}>
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                            <div className="upload-controls">
                                <label className="btn-upload" style={{ width: '100%', justifyContent: 'center' }}>
                                    <ImageIcon size={16} /> Upload Image
                                    <input type="file" hidden accept="image/*" onChange={e => uploadImage(e.target.files[0])} />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentEditor;
