import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Package, FileText, Settings, Palette, LogOut, Layers, Menu } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h1>MOLVBRIV Admin</h1>
                <nav className="admin-nav">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>

                    <div className="nav-divider"></div>
                    <span className="nav-section-title">Content</span>

                    <NavLink to="/admin/pages" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        <Layers size={20} />
                        Pages
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        <Package size={20} />
                        Products
                    </NavLink>
                    <NavLink to="/admin/navigation" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        <Menu size={20} />
                        Navigation
                    </NavLink>
                    <NavLink to="/admin/content" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        <FileText size={20} />
                        Content
                    </NavLink>

                    <div className="nav-divider"></div>
                    <span className="nav-section-title">Settings</span>

                    <NavLink to="/admin/settings" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        <Settings size={20} />
                        Site Settings
                    </NavLink>
                    <NavLink to="/admin/theme" className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
                        <Palette size={20} />
                        Theme
                    </NavLink>
                </nav>
                <div className="admin-user">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
