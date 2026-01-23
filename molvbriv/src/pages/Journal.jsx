import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { articles, categories } from '../data/journalData';
import './Journal.css';

const Journal = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredArticles = activeCategory === "All"
        ? articles
        : articles.filter(article => article.category === activeCategory || article.category === "All"); // Simplified logic

    return (
        <div className="journal-page">
            <div className="journal-header text-center section-padding">
                <h1 className="page-title">The Journal</h1>
                <p className="page-subtitle">Stories of Craft, Culture, and Elegance.</p>
            </div>

            <div className="container">
                {/* Categories */}
                <div className="category-filter">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid */}
                <div className="journal-grid">
                    {filteredArticles.map(article => (
                        <article key={article.id} className="journal-card animate-fade-in">
                            <Link to={`/journal/${article.id}`} className="journal-img-wrapper">
                                <img src={article.image} alt={article.title} />
                            </Link>
                            <div className="journal-content">
                                <div className="journal-meta">
                                    <span className="journal-cat">{article.category}</span>
                                    <span className="journal-date">{article.date}</span>
                                </div>
                                <h2 className="journal-title">
                                    <Link to={`/journal/${article.id}`}>{article.title}</Link>
                                </h2>
                                <p className="journal-excerpt">{article.excerpt}</p>
                                <Link to={`/journal/${article.id}`} className="read-more">Read Story</Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Journal;
