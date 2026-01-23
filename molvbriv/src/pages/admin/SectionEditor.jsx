import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { ArrowLeft, Plus, Trash2, Eye, EyeOff, GripVertical, ChevronDown, ChevronUp, Image as ImageIcon, X, Star } from 'lucide-react';
import './SectionEditor.css';

const SECTION_TYPES = [
    { type: 'hero', label: 'Hero Banner', description: 'Large hero section with image and text' },
    { type: 'text_block', label: 'Text Block', description: 'Rich text content section' },
    { type: 'product_grid', label: 'Product Grid', description: 'Display products in a grid' },
    { type: 'gallery', label: 'Image Gallery', description: 'Showcase multiple images' },
    { type: 'testimonials', label: 'Testimonials', description: 'Customer testimonials slider' },
    { type: 'video', label: 'Video', description: 'Embedded video section' },
    { type: 'cta', label: 'Call to Action', description: 'CTA with button' },
];

const SectionEditor = () => {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(null);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [expandedSection, setExpandedSection] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPageAndSections();
    }, [pageId]);

    const fetchPageAndSections = async () => {
        try {
            // Fetch page
            const { data: pageData, error: pageError } = await supabase
                .from('pages')
                .select('*')
                .eq('id', pageId)
                .single();

            if (pageError) throw pageError;
            setPage(pageData);

            // Fetch sections
            const { data: sectionsData, error: sectionsError } = await supabase
                .from('sections')
                .select('*')
                .eq('page_id', pageId)
                .order('order_index', { ascending: true });

            if (sectionsError) throw sectionsError;
            setSections(sectionsData || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const addSection = async (type) => {
        const sectionInfo = SECTION_TYPES.find(s => s.type === type);
        const newSection = {
            page_id: pageId,
            section_type: type,
            name: sectionInfo?.label || type,
            content: getDefaultContent(type),
            settings: { padding: '80px 0', background: 'transparent' },
            order_index: sections.length,
            is_visible: true
        };

        try {
            const { data, error } = await supabase
                .from('sections')
                .insert([newSection])
                .select()
                .single();

            if (error) throw error;
            setSections([...sections, data]);
            setShowAddModal(false);
            setExpandedSection(data.id);
        } catch (error) {
            console.error('Error adding section:', error);
            alert('Error adding section: ' + error.message);
        }
    };

    const getDefaultContent = (type) => {
        switch (type) {
            case 'hero':
                return {
                    heading: 'Welcome to MOLVBRIV',
                    subheading: 'Where Legacy Meets Luxury',
                    buttonText: 'Shop Now',
                    buttonLink: '/collections',
                    backgroundImage: ''
                };
            case 'text_block':
                return {
                    heading: 'Section Heading',
                    text: 'Your content here...',
                    alignment: 'center'
                };
            case 'product_grid':
                return {
                    heading: 'Featured Products',
                    count: 4,
                    category: '',
                    showPrice: true
                };
            case 'gallery':
                return {
                    heading: 'Gallery',
                    images: []
                };
            case 'testimonials':
                return {
                    heading: 'What Our Customers Say',
                    testimonials: []
                };
            case 'video':
                return {
                    heading: '',
                    videoUrl: '',
                    autoplay: false
                };
            case 'cta':
                return {
                    heading: 'Ready to Explore?',
                    text: 'Discover our exclusive collection',
                    buttonText: 'Shop Now',
                    buttonLink: '/collections'
                };
            default:
                return {};
        }
    };

    const updateSection = async (sectionId, updates) => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('sections')
                .update(updates)
                .eq('id', sectionId);

            if (error) throw error;
            setSections(sections.map(s => s.id === sectionId ? { ...s, ...updates } : s));
        } catch (error) {
            console.error('Error updating section:', error);
        } finally {
            setSaving(false);
        }
    };

    const deleteSection = async (sectionId) => {
        if (!window.confirm('Delete this section?')) return;

        try {
            const { error } = await supabase
                .from('sections')
                .delete()
                .eq('id', sectionId);

            if (error) throw error;
            setSections(sections.filter(s => s.id !== sectionId));
        } catch (error) {
            console.error('Error deleting section:', error);
        }
    };

    const toggleVisibility = async (section) => {
        await updateSection(section.id, { is_visible: !section.is_visible });
    };

    const moveSection = async (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= sections.length) return;

        const newSections = [...sections];
        [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];

        // Update order indices
        for (let i = 0; i < newSections.length; i++) {
            await supabase
                .from('sections')
                .update({ order_index: i })
                .eq('id', newSections[i].id);
        }

        setSections(newSections.map((s, i) => ({ ...s, order_index: i })));
    };

    const uploadImage = (file, onSuccess) => {
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
            onSuccess(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const renderSectionEditor = (section) => {
        const content = section.content || {};

        const updateContent = (field, value) => {
            const newContent = { ...content, [field]: value };
            updateSection(section.id, { content: newContent });
        };

        switch (section.section_type) {
            case 'hero':
                return (
                    <div className="section-fields">
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                type="text"
                                value={content.heading || ''}
                                onChange={(e) => updateContent('heading', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Subheading</label>
                            <input
                                type="text"
                                value={content.subheading || ''}
                                onChange={(e) => updateContent('subheading', e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Button Text</label>
                                <input
                                    type="text"
                                    value={content.buttonText || ''}
                                    onChange={(e) => updateContent('buttonText', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Button Link</label>
                                <input
                                    type="text"
                                    value={content.buttonLink || ''}
                                    onChange={(e) => updateContent('buttonLink', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Background Image</label>
                            <div className="image-uploader">
                                {content.backgroundImage && (
                                    <div className="image-preview">
                                        <img src={content.backgroundImage} alt="Background" />
                                        <button
                                            className="btn-remove-image"
                                            onClick={() => updateContent('backgroundImage', '')}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                                <div className="upload-controls">
                                    <input
                                        type="file"
                                        id={`bg-upload-${section.id}`}
                                        accept="image/*"
                                        onChange={(e) => uploadImage(e.target.files[0], (url) => updateContent('backgroundImage', url))}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor={`bg-upload-${section.id}`} className="btn-upload">
                                        <ImageIcon size={16} />
                                        {content.backgroundImage ? 'Change Image' : 'Upload Image'}
                                    </label>
                                    <span className="or-divider">OR</span>
                                    <input
                                        type="text"
                                        placeholder="Paste Image URL"
                                        value={content.backgroundImage || ''}
                                        onChange={(e) => updateContent('backgroundImage', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'text_block':
                return (
                    <div className="section-fields">
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                type="text"
                                value={content.heading || ''}
                                onChange={(e) => updateContent('heading', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Text Content</label>
                            <textarea
                                rows={5}
                                value={content.text || ''}
                                onChange={(e) => updateContent('text', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Alignment</label>
                            <select
                                value={content.alignment || 'center'}
                                onChange={(e) => updateContent('alignment', e.target.value)}
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                    </div>
                );

            case 'product_grid':
                return (
                    <div className="section-fields">
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                type="text"
                                value={content.heading || ''}
                                onChange={(e) => updateContent('heading', e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Number of Products</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={content.count || 4}
                                    onChange={(e) => updateContent('count', parseInt(e.target.value))}
                                />
                            </div>
                            <div className="form-group">
                                <label>Category Filter</label>
                                <input
                                    type="text"
                                    placeholder="Leave empty for all"
                                    value={content.category || ''}
                                    onChange={(e) => updateContent('category', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'gallery':
                return (
                    <div className="section-fields">
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                type="text"
                                value={content.heading || ''}
                                onChange={(e) => updateContent('heading', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Images</label>
                            <div className="gallery-grid">
                                {(content.images || []).map((img, idx) => (
                                    <div key={idx} className="gallery-item">
                                        <img src={img} alt={`Gallery ${idx + 1}`} />
                                        <button
                                            className="btn-remove-image"
                                            onClick={() => {
                                                const newImages = [...(content.images || [])];
                                                newImages.splice(idx, 1);
                                                updateContent('images', newImages);
                                            }}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                <div className="gallery-upload">
                                    <input
                                        type="file"
                                        id={`gallery-upload-${section.id}`}
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            Array.from(e.target.files).forEach(file => {
                                                uploadImage(file, (url) => {
                                                    const currentImages = content.images || [];
                                                    updateContent('images', [...currentImages, url]);
                                                });
                                            });
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor={`gallery-upload-${section.id}`} className="btn-upload-box">
                                        <Plus size={24} />
                                        <span>Add Images</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'testimonials':
                return (
                    <div className="section-fields">
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                type="text"
                                value={content.heading || ''}
                                onChange={(e) => updateContent('heading', e.target.value)}
                            />
                        </div>
                        <div className="testimonials-editor">
                            {(content.testimonials || []).map((testimonial, idx) => (
                                <div key={idx} className="testimonial-item-editor">
                                    <div className="testimonial-header">
                                        <span>Testimonial #{idx + 1}</span>
                                        <button
                                            className="btn-icon delete"
                                            onClick={() => {
                                                const newTestimonials = [...(content.testimonials || [])];
                                                newTestimonials.splice(idx, 1);
                                                updateContent('testimonials', newTestimonials);
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                value={testimonial.name || ''}
                                                onChange={(e) => {
                                                    const newTestimonials = [...(content.testimonials || [])];
                                                    newTestimonials[idx] = { ...testimonial, name: e.target.value };
                                                    updateContent('testimonials', newTestimonials);
                                                }}
                                                placeholder="Customer Name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Role/Title</label>
                                            <input
                                                type="text"
                                                value={testimonial.role || ''}
                                                onChange={(e) => {
                                                    const newTestimonials = [...(content.testimonials || [])];
                                                    newTestimonials[idx] = { ...testimonial, role: e.target.value };
                                                    updateContent('testimonials', newTestimonials);
                                                }}
                                                placeholder="e.g. Verified Buyer"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Quote</label>
                                        <textarea
                                            rows={2}
                                            value={testimonial.quote || ''}
                                            onChange={(e) => {
                                                const newTestimonials = [...(content.testimonials || [])];
                                                newTestimonials[idx] = { ...testimonial, quote: e.target.value };
                                                updateContent('testimonials', newTestimonials);
                                            }}
                                            placeholder="What they said..."
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Rating (1-5)</label>
                                        <div className="rating-input">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <button
                                                    key={star}
                                                    className={`star-btn ${star <= (testimonial.rating || 5) ? 'active' : ''}`}
                                                    onClick={() => {
                                                        const newTestimonials = [...(content.testimonials || [])];
                                                        newTestimonials[idx] = { ...testimonial, rating: star };
                                                        updateContent('testimonials', newTestimonials);
                                                    }}
                                                >
                                                    <Star size={16} fill={star <= (testimonial.rating || 5) ? "currentColor" : "none"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                className="btn-add-testimonial"
                                onClick={() => {
                                    const newTestimonial = { name: '', role: '', quote: '', rating: 5 };
                                    updateContent('testimonials', [...(content.testimonials || []), newTestimonial]);
                                }}
                            >
                                <Plus size={16} /> Add Testimonial
                            </button>
                        </div>
                    </div>
                );

            case 'video':
                return (
                    <div className="section-fields">
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                type="text"
                                value={content.heading || ''}
                                onChange={(e) => updateContent('heading', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Video URL (YouTube/Vimeo/MP4)</label>
                            <input
                                type="text"
                                value={content.videoUrl || ''}
                                onChange={(e) => updateContent('videoUrl', e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="form-group">
                            <label>Poster Image (Optional)</label>
                            <div className="image-uploader">
                                {content.posterImage && (
                                    <div className="image-preview">
                                        <img src={content.posterImage} alt="Poster" />
                                        <button
                                            className="btn-remove-image"
                                            onClick={() => updateContent('posterImage', '')}
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                                <div className="upload-controls">
                                    <input
                                        type="file"
                                        id={`poster-upload-${section.id}`}
                                        accept="image/*"
                                        onChange={(e) => uploadImage(e.target.files[0], (url) => updateContent('posterImage', url))}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor={`poster-upload-${section.id}`} className="btn-upload">
                                        <ImageIcon size={16} />
                                        {content.posterImage ? 'Change' : 'Upload'}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={content.autoplay || false}
                                        onChange={(e) => updateContent('autoplay', e.target.checked)}
                                    />
                                    Autoplay (Muted)
                                </label>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={content.loop || false}
                                        onChange={(e) => updateContent('loop', e.target.checked)}
                                    />
                                    Loop
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 'cta':
                return (
                    <div className="section-fields">
                        <div className="form-group">
                            <label>Heading</label>
                            <input
                                type="text"
                                value={content.heading || ''}
                                onChange={(e) => updateContent('heading', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Text</label>
                            <textarea
                                rows={2}
                                value={content.text || ''}
                                onChange={(e) => updateContent('text', e.target.value)}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Button Text</label>
                                <input
                                    type="text"
                                    value={content.buttonText || ''}
                                    onChange={(e) => updateContent('buttonText', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Button Link</label>
                                <input
                                    type="text"
                                    value={content.buttonLink || ''}
                                    onChange={(e) => updateContent('buttonLink', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="section-fields">
                        <p style={{ color: '#888' }}>Editor for this section type coming soon.</p>
                    </div>
                );
        }
    };

    if (loading) {
        return <div className="admin-loading">Loading...</div>;
    }

    if (!page) {
        return <div className="admin-loading">Page not found</div>;
    }

    return (
        <div className="section-editor">
            <div className="editor-header">
                <button className="btn-back" onClick={() => navigate('/admin/pages')}>
                    <ArrowLeft size={20} />
                    Back to Pages
                </button>
                <div className="editor-title">
                    <h1>Edit: {page.name}</h1>
                    <span className={`status-badge ${page.status}`}>{page.status}</span>
                </div>
                {saving && <span className="saving-indicator">Saving...</span>}
            </div>

            <div className="sections-list">
                {sections.map((section, index) => (
                    <div key={section.id} className={`section-card ${!section.is_visible ? 'hidden' : ''}`}>
                        <div className="section-header" onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
                            <div className="section-info">
                                <GripVertical size={18} className="drag-handle" />
                                <span className="section-type">{SECTION_TYPES.find(t => t.type === section.section_type)?.label || section.section_type}</span>
                                {section.name !== SECTION_TYPES.find(t => t.type === section.section_type)?.label && (
                                    <span className="section-name">- {section.name}</span>
                                )}
                            </div>
                            <div className="section-actions">
                                <button className="btn-sm" onClick={(e) => { e.stopPropagation(); moveSection(index, 'up'); }} disabled={index === 0}>
                                    <ChevronUp size={16} />
                                </button>
                                <button className="btn-sm" onClick={(e) => { e.stopPropagation(); moveSection(index, 'down'); }} disabled={index === sections.length - 1}>
                                    <ChevronDown size={16} />
                                </button>
                                <button className="btn-sm" onClick={(e) => { e.stopPropagation(); toggleVisibility(section); }}>
                                    {section.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button className="btn-sm delete" onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }}>
                                    <Trash2 size={16} />
                                </button>
                                {expandedSection === section.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                        </div>
                        {expandedSection === section.id && (
                            <div className="section-content">
                                {renderSectionEditor(section)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className="btn-add-section" onClick={() => setShowAddModal(true)}>
                <Plus size={20} />
                Add Section
            </button>

            {/* Add Section Modal */}
            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal section-modal" onClick={e => e.stopPropagation()}>
                        <h2>Add Section</h2>
                        <div className="section-types-grid">
                            {SECTION_TYPES.map(type => (
                                <div key={type.type} className="section-type-card" onClick={() => addSection(type.type)}>
                                    <h3>{type.label}</h3>
                                    <p>{type.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SectionEditor;
