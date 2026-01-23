import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/journalData';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import './ArticleView.css';

const ArticleView = () => {
    const { id } = useParams();
    const article = articles.find(a => a.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="article-not-found section-padding text-center">
                <h2>Article Not Found</h2>
                <Link to="/journal" className="btn-back">Back to Journal</Link>
            </div>
        );
    }

    return (
        <div className="article-view">
            {/* Hero Image */}
            <div className="article-hero" style={{ backgroundImage: `url(${article.image})` }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="article-header animate-fade-in">
                        <span className="article-category">{article.category}</span>
                        <h1 className="article-title">{article.title}</h1>
                        <div className="article-meta">
                            <span className="meta-item"><Calendar size={16} /> {article.date}</span>
                            <span className="meta-item"><Clock size={16} /> 5 min read</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container article-container">
                <Link to="/journal" className="back-link">
                    <ArrowLeft size={20} /> Back to Journal
                </Link>

                <div className="article-content animate-fade-in-up" dangerouslySetInnerHTML={{ __html: article.content }}>
                    {/* Content injected here */}
                </div>

                <div className="article-footer">
                    <div className="share-links">
                        <span>Share:</span>
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">Pinterest</a>
                    </div>
                </div>
            </div>

            {/* Related Articles could go here */}
        </div>
    );
};

export default ArticleView;
