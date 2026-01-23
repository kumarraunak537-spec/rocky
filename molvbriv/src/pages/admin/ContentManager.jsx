import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Plus, Edit, Trash2, Search, FileText, Image as ImageIcon } from 'lucide-react';
import './ContentManager.css';

const ContentManager = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching articles:', error);
        } else {
            setArticles(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting article');
        } else {
            fetchArticles();
        }
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="admin-loading">Loading articles...</div>;

    return (
        <div className="content-manager">
            <div className="content-header">
                <div className="header-title">
                    <h1>Content Manager</h1>
                    <p>Manage your journal articles and blog posts</p>
                </div>
                <Link to="/admin/content/new" className="btn-primary">
                    <Plus size={18} /> New Article
                </Link>
            </div>

            <div className="toolbar">
                <div className="search-wrapper">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="articles-grid">
                {filteredArticles.length === 0 ? (
                    <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                        <div className="empty-icon">
                            <FileText size={32} />
                        </div>
                        <h3>No articles found</h3>
                        <p>Get started by creating your first article for the journal.</p>
                        <Link to="/admin/content/new" className="btn-primary">
                            <Plus size={18} /> Create Article
                        </Link>
                    </div>
                ) : (
                    filteredArticles.map(article => (
                        <div key={article.id} className="article-card">
                            <div className="card-image">
                                {article.image ? (
                                    <img src={article.image} alt={article.title} />
                                ) : (
                                    <div className="placeholder-image">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <span className={`status-badge ${article.status}`}>
                                        {article.status}
                                    </span>
                                    <span>{article.category}</span>
                                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                                </div>
                                <h3 className="card-title">{article.title}</h3>
                                <p className="card-excerpt">{article.excerpt || 'No excerpt available.'}</p>
                                <div className="card-actions">
                                    <Link to={`/admin/content/${article.id}/edit`} className="btn-icon" title="Edit">
                                        <Edit size={16} />
                                    </Link>
                                    <button className="btn-icon delete" onClick={() => handleDelete(article.id)} title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContentManager;
