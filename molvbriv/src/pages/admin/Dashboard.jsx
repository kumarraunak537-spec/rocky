import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { ShoppingBag, FileText, Layers, Settings, Plus, Layout } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        articles: 0,
        pages: 0,
        sections: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetch counts in parallel
            const [
                { count: productsCount },
                { count: articlesCount },
                { count: pagesCount },
                { count: sectionsCount }
            ] = await Promise.all([
                supabase.from('products').select('*', { count: 'exact', head: true }),
                supabase.from('articles').select('*', { count: 'exact', head: true }),
                supabase.from('pages').select('*', { count: 'exact', head: true }),
                supabase.from('sections').select('*', { count: 'exact', head: true })
            ]);

            setStats({
                products: productsCount || 0,
                articles: articlesCount || 0,
                pages: pagesCount || 0,
                sections: sectionsCount || 0
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-container">Loading dashboard...</div>;

    const navCards = [
        {
            title: 'New Product',
            icon: <Plus size={24} />,
            link: '/admin/products/new'
        },
        {
            title: 'Write Article',
            icon: <FileText size={24} />,
            link: '/admin/content/new'
        },
        {
            title: 'Manage Pages',
            icon: <Layout size={24} />,
            link: '/admin/pages'
        },
        {
            title: 'Site Settings',
            icon: <Settings size={24} />,
            link: '/admin/settings'
        }
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header animate-fade-in">
                <h1>Welcome Back</h1>
                <p>Here's what's happening with your store today.</p>
            </header>

            {/* Stats Overview */}
            <div className="stats-grid animate-fade-in-up">
                <div className="stat-card">
                    <div className="stat-icon">
                        <ShoppingBag size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total Products</span>
                        <span className="stat-value">{stats.products}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FileText size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Articles</span>
                        <span className="stat-value">{stats.articles}</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <Layers size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Active Pages</span>
                        <span className="stat-value">{stats.pages}</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-section animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h2 className="section-title">Quick Actions</h2>
                <div className="actions-grid">
                    {navCards.map((card, index) => (
                        <Link key={index} to={card.link} className="action-card">
                            {card.icon}
                            <span>{card.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
