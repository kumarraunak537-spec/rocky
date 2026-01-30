import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Image as ImageIcon, X, Plus } from 'lucide-react';
import './SiteSettings.css';

const SiteSettings = () => {
    const [settings, setSettings] = useState({
        site_name: 'MOLVBRIV',
        site_tagline: 'Where Legacy Meets Luxury',
        logo_url: '',
        favicon_url: '',
        hero_image_url: '',
        maintenance_mode: false,
        maintenance_message: '',
        contact_email: '',
        contact_phone: '',
        address: '',
        currency: 'INR',
        currency_symbol: '₹',
        custom_head_scripts: '',
        custom_body_scripts: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .limit(1)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            if (data) setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setMessage({ type: 'error', text: 'Failed to load settings' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const uploadImage = (file, field) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('Image too large (max 5MB)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setSettings(prev => ({
                ...prev,
                [field]: e.target.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const updateImage = (field, value) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            let error;
            if (settings.id) {
                // Update existing
                const { error: updateError } = await supabase
                    .from('site_settings')
                    .update(settings)
                    .eq('id', settings.id);
                error = updateError;
            } else {
                // Insert new (should theoretically not happen if init worked, but for safety)
                const { error: insertError } = await supabase
                    .from('site_settings')
                    .insert([settings]);
                error = insertError;
            }

            if (error) throw error;
            setMessage({ type: 'success', text: 'Settings saved successfully!' });
        } catch (error) {
            console.error('Error saving settings:', error);
            setMessage({ type: 'error', text: 'Failed to save settings: ' + error.message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading settings...</div>;
    }

    return (
        <div className="site-settings-page">
            <div className="page-header">
                <h1>Site Settings</h1>
                <p>Configure your website's core settings</p>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="settings-form">
                {/* Brand Section */}
                <div className="settings-card">
                    <h2>Brand</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Site Name</label>
                            <input
                                type="text"
                                name="site_name"
                                value={settings.site_name}
                                onChange={handleChange}
                                placeholder="Your site name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Tagline</label>
                            <input
                                type="text"
                                name="site_tagline"
                                value={settings.site_tagline}
                                onChange={handleChange}
                                placeholder="Your tagline"
                            />
                        </div>
                        <div className="form-group">
                            <label>Logo</label>
                            <div className="image-uploader">
                                {settings.logo_url && (
                                    <div className="image-preview">
                                        <img src={settings.logo_url} alt="Logo" />
                                        <button
                                            type="button"
                                            className="btn-remove-image"
                                            onClick={() => updateImage('logo_url', '')}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                                <div className="upload-controls">
                                    <input
                                        type="file"
                                        id="logo-upload"
                                        accept="image/*"
                                        onChange={(e) => uploadImage(e.target.files[0], 'logo_url')}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="logo-upload" className="btn-upload">
                                        <ImageIcon size={16} />
                                        {settings.logo_url ? 'Change Logo' : 'Upload Logo'}
                                    </label>
                                    <span className="or-divider">OR</span>
                                    <input
                                        type="text"
                                        value={settings.logo_url}
                                        onChange={(e) => updateImage('logo_url', e.target.value)}
                                        placeholder="Paste Image URL"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Favicon</label>
                            <div className="image-uploader">
                                {settings.favicon_url && (
                                    <div className="image-preview favicon-preview">
                                        <img src={settings.favicon_url} alt="Favicon" />
                                        <button
                                            type="button"
                                            className="btn-remove-image"
                                            onClick={() => updateImage('favicon_url', '')}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                                <div className="upload-controls">
                                    <input
                                        type="file"
                                        id="favicon-upload"
                                        accept="image/*"
                                        onChange={(e) => uploadImage(e.target.files[0], 'favicon_url')}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="favicon-upload" className="btn-upload">
                                        <ImageIcon size={16} />
                                        {settings.favicon_url ? 'Change Favicon' : 'Upload Favicon'}
                                    </label>
                                    <span className="or-divider">OR</span>
                                    <input
                                        type="text"
                                        value={settings.favicon_url}
                                        onChange={(e) => updateImage('favicon_url', e.target.value)}
                                        placeholder="Paste Image URL"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="settings-card">
                    <h2>Hero Section</h2>
                    <p className="section-description">Customize the hero banner on your homepage</p>
                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>Hero Image</label>
                            <div className="image-uploader hero-uploader">
                                {settings.hero_image_url && (
                                    <div className="image-preview hero-preview">
                                        <img src={settings.hero_image_url} alt="Hero" />
                                        <button
                                            type="button"
                                            className="btn-remove-image"
                                            onClick={() => updateImage('hero_image_url', '')}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                                <div className="upload-controls">
                                    <input
                                        type="file"
                                        id="hero-upload"
                                        accept="image/*"
                                        onChange={(e) => uploadImage(e.target.files[0], 'hero_image_url')}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="hero-upload" className="btn-upload">
                                        <ImageIcon size={16} />
                                        {settings.hero_image_url ? 'Change Hero Image' : 'Upload Hero Image'}
                                    </label>
                                    <span className="or-divider">OR</span>
                                    <input
                                        type="text"
                                        value={settings.hero_image_url}
                                        onChange={(e) => updateImage('hero_image_url', e.target.value)}
                                        placeholder="Paste Image URL (Unsplash, etc.)"
                                    />
                                </div>
                            </div>
                            <p className="helper-text">Recommended size: 1920x1080px or higher for best quality</p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="settings-card">
                    <h2>Contact Information</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="contact_email"
                                value={settings.contact_email}
                                onChange={handleChange}
                                placeholder="support@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="contact_phone"
                                value={settings.contact_phone}
                                onChange={handleChange}
                                placeholder="+91..."
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Address</label>
                            <textarea
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                placeholder="Your business address"
                                rows={2}
                            />
                        </div>
                    </div>
                </div>

                {/* Currency Section */}
                <div className="settings-card">
                    <h2>Currency</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Currency Code</label>
                            <select name="currency" value={settings.currency} onChange={handleChange}>
                                <option value="INR">INR - Indian Rupee</option>
                                <option value="USD">USD - US Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                                <option value="GBP">GBP - British Pound</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Currency Symbol</label>
                            <input
                                type="text"
                                name="currency_symbol"
                                value={settings.currency_symbol}
                                onChange={handleChange}
                                placeholder="₹"
                            />
                        </div>
                    </div>
                </div>

                {/* Maintenance Section */}
                <div className="settings-card">
                    <h2>Maintenance Mode</h2>
                    <div className="form-group">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                name="maintenance_mode"
                                checked={settings.maintenance_mode}
                                onChange={handleChange}
                            />
                            <span className="toggle-switch"></span>
                            Enable Maintenance Mode
                        </label>
                        <p className="helper-text">When enabled, visitors will see a maintenance page.</p>
                    </div>
                    {settings.maintenance_mode && (
                        <div className="form-group">
                            <label>Maintenance Message</label>
                            <textarea
                                name="maintenance_message"
                                value={settings.maintenance_message}
                                onChange={handleChange}
                                placeholder="We are currently undergoing maintenance..."
                                rows={3}
                            />
                        </div>
                    )}
                </div>

                {/* Custom Scripts Section */}
                <div className="settings-card">
                    <h2>Custom Scripts</h2>
                    <p className="section-description">Add custom scripts like Google Analytics, Facebook Pixel, etc.</p>
                    <div className="form-group">
                        <label>Head Scripts (Before &lt;/head&gt;)</label>
                        <textarea
                            name="custom_head_scripts"
                            value={settings.custom_head_scripts}
                            onChange={handleChange}
                            placeholder="<!-- Paste your scripts here -->"
                            rows={4}
                            className="code-input"
                        />
                    </div>
                    <div className="form-group">
                        <label>Body Scripts (Before &lt;/body&gt;)</label>
                        <textarea
                            name="custom_body_scripts"
                            value={settings.custom_body_scripts}
                            onChange={handleChange}
                            placeholder="<!-- Paste your scripts here -->"
                            rows={4}
                            className="code-input"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSettings;
