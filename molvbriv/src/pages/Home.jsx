import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroData, featuredCollections, storyTeaser, seasonalHighlight } from '../data/homeData';
import './Home.css';

const Home = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollValue = window.scrollY;
            if (heroRef.current) {
                // Parallax effect
                heroRef.current.style.transform = `translateY(${scrollValue * 0.5}px)`;
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-image-wrapper" ref={heroRef}>
                    <img src={heroData.image} alt="Molvbriv Hero" className="hero-image" />
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content container">
                    <span className="hero-established animate-fade-in">Established 2026</span>

                    <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Where Legacy <br />
                        <span className="italic-accent">Meets Luxury</span>
                    </h1>

                    <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        Timeless pieces crafted with passion, designed for those who appreciate the
                        <br /> art of true elegance.
                    </p>

                    <div className="hero-buttons animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <Link to="/collections" className="btn-hero btn-hero-primary">
                            Explore Collections
                        </Link>
                        <Link to="/our-story" className="btn-hero btn-hero-outline">
                            Our Story
                        </Link>
                    </div>
                </div>

                <div className="scroll-indicator animate-fade-in" style={{ animationDelay: '1s' }}>
                    <span>Scroll</span>
                    <ChevronDown size={20} />
                </div>
            </section>

            {/* Featured Collections */}
            <section className="featured-section section-padding">
                <div className="container">
                    <h2 className="section-title text-center">Signature Collections</h2>
                    <div className="featured-grid">
                        {featuredCollections.map((collection, index) => (
                            <Link to={collection.link} key={collection.id} className="featured-item group">
                                <div className="featured-img-wrapper">
                                    <img src={collection.image} alt={collection.title} className="featured-img" />
                                    <div className="featured-overlay">
                                        <span className="btn-text">View Collection</span>
                                    </div>
                                </div>
                                <h3 className="featured-title">{collection.title}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Teaser (Parallax) */}
            <section className="story-teaser">
                <div className="story-bg" style={{ backgroundImage: `url(${storyTeaser.image})` }}></div>
                <div className="story-content-wrapper container">
                    <div className="story-content">
                        <span className="eyebrow">The Heritage</span>
                        <h2 className="story-title">{storyTeaser.title}</h2>
                        <p className="story-desc">{storyTeaser.description}</p>
                        <Link to="/our-story" className="btn-link">
                            Read Our Story <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Seasonal Highlight */}
            <section className="seasonal-section section-padding">
                <div className="container">
                    <div className="seasonal-grid">
                        <div className="seasonal-image">
                            <img src={seasonalHighlight.image} alt={seasonalHighlight.title} />
                        </div>
                        <div className="seasonal-text flex-center">
                            <div className="seasonal-content-inner">
                                <span className="eyebrow">This Season</span>
                                <h2 className="seasonal-title">{seasonalHighlight.title}</h2>
                                <p className="seasonal-desc">{seasonalHighlight.description}</p>
                                <Link to="/journal/6" className="btn-outline">
                                    View Lookbook
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
