import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './SiteSettings.css';

const THEME_PRESETS = {
    luxury: {
        primary_color: '#08301e',
        secondary_color: '#c9a050',
        background_color: '#ebeae5',
        text_color: '#1a1a1a',
        accent_color: '#08301e',
    },
    minimal: {
        primary_color: '#000000',
        secondary_color: '#666666',
        background_color: '#ffffff',
        text_color: '#1a1a1a',
        accent_color: '#000000',
    },
    dark: {
        primary_color: '#ffffff',
        secondary_color: '#888888',
        background_color: '#121212',
        text_color: '#ffffff',
        accent_color: '#c9a050',
    },
    light: {
        primary_color: '#2c3e50',
        secondary_color: '#3498db',
        background_color: '#f8f9fa',
        text_color: '#2c3e50',
        accent_color: '#e74c3c',
    }
};

const ThemeSettings = () => {
    const [settings, setSettings] = useState({
        preset: 'luxury',
        primary_color: '#08301e',
        secondary_color: '#c9a050',
        background_color: '#ebeae5',
        text_color: '#1a1a1a',
        accent_color: '#08301e',
        muted_color: '#666666',
        border_color: '#dcdcdc',
        font_heading: 'Cormorant Garamond',
        font_body: 'Montserrat',
        font_size_base: '16px',
        border_radius: '4px',
        button_style: 'outlined',
        header_style: 'transparent'
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
                .from('theme_settings')
                .select('*')
                .limit(1)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            if (data) setSettings(data);
        } catch (error) {
            console.error('Error fetching theme:', error);
            setMessage({ type: 'error', text: 'Failed to load theme settings' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const applyPreset = (presetName) => {
        const preset = THEME_PRESETS[presetName];
        if (preset) {
            setSettings(prev => ({
                ...prev,
                preset: presetName,
                ...preset
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const { error } = await supabase
                .from('theme_settings')
                .upsert({
                    ...settings,
                    id: settings.id || undefined
                });

            if (error) throw error;
            setMessage({ type: 'success', text: 'Theme saved successfully!' });

            // Apply theme to document
            applyThemeToDocument(settings);
        } catch (error) {
            console.error('Error saving theme:', error);
            setMessage({ type: 'error', text: 'Failed to save theme' });
        } finally {
            setSaving(false);
        }
    };

    const applyThemeToDocument = (theme) => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', theme.primary_color);
        root.style.setProperty('--color-secondary', theme.secondary_color);
        root.style.setProperty('--color-cream', theme.background_color);
        root.style.setProperty('--color-charcoal', theme.text_color);
        root.style.setProperty('--color-gold', theme.accent_color);
    };

    if (loading) {
        return <div className="admin-loading">Loading theme settings...</div>;
    }

    return (
        <div className="theme-settings-page">
            <div className="page-header">
                <h1>Theme Settings</h1>
                <p>Customize your website's visual appearance</p>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="settings-form">
                {/* Theme Presets */}
                <div className="settings-card">
                    <h2>Theme Presets</h2>
                    <p className="section-description">Quick start with a pre-defined color scheme</p>
                    <div className="theme-presets">
                        {Object.entries(THEME_PRESETS).map(([name, preset]) => (
                            <div
                                key={name}
                                className={`preset-card ${settings.preset === name ? 'active' : ''}`}
                                onClick={() => applyPreset(name)}
                            >
                                <div
                                    className="preset-preview"
                                    style={{
                                        background: `linear-gradient(135deg, ${preset.primary_color} 0%, ${preset.secondary_color} 100%)`
                                    }}
                                />
                                <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Colors Section */}
                <div className="settings-card">
                    <h2>Colors</h2>
                    <div className="form-grid">
                        {[
                            { name: 'primary_color', label: 'Primary Color' },
                            { name: 'secondary_color', label: 'Secondary Color' },
                            { name: 'background_color', label: 'Background Color' },
                            { name: 'text_color', label: 'Text Color' },
                            { name: 'accent_color', label: 'Accent Color' },
                            { name: 'muted_color', label: 'Muted Color' },
                        ].map(({ name, label }) => (
                            <div key={name} className="form-group">
                                <label>{label}</label>
                                <div className="color-picker-group">
                                    <input
                                        type="color"
                                        name={name}
                                        value={settings[name]}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="text"
                                        name={name}
                                        value={settings[name]}
                                        onChange={handleChange}
                                        placeholder="#000000"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Typography Section */}
                <div className="settings-card">
                    <h2>Typography</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Heading Font</label>
                            <select name="font_heading" value={settings.font_heading} onChange={handleChange}>
                                <option value="Cormorant Garamond">Cormorant Garamond</option>
                                <option value="Playfair Display">Playfair Display</option>
                                <option value="Cinzel">Cinzel</option>
                                <option value="Lora">Lora</option>
                                <option value="Libre Baskerville">Libre Baskerville</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Body Font</label>
                            <select name="font_body" value={settings.font_body} onChange={handleChange}>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Open Sans">Open Sans</option>
                                <option value="Lato">Lato</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Inter">Inter</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Base Font Size</label>
                            <select name="font_size_base" value={settings.font_size_base} onChange={handleChange}>
                                <option value="14px">14px</option>
                                <option value="15px">15px</option>
                                <option value="16px">16px</option>
                                <option value="17px">17px</option>
                                <option value="18px">18px</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Border Radius</label>
                            <select name="border_radius" value={settings.border_radius} onChange={handleChange}>
                                <option value="0px">Sharp (0px)</option>
                                <option value="4px">Subtle (4px)</option>
                                <option value="8px">Rounded (8px)</option>
                                <option value="12px">More Rounded (12px)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Button & Header Styles */}
                <div className="settings-card">
                    <h2>UI Styles</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Button Style</label>
                            <select name="button_style" value={settings.button_style} onChange={handleChange}>
                                <option value="filled">Filled</option>
                                <option value="outlined">Outlined</option>
                                <option value="minimal">Minimal</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Header Style</label>
                            <select name="header_style" value={settings.header_style} onChange={handleChange}>
                                <option value="transparent">Transparent</option>
                                <option value="solid">Solid</option>
                                <option value="glassmorphism">Glassmorphism</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Theme'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ThemeSettings;
