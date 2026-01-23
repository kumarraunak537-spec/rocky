import React, { useEffect } from 'react';
import { storyChapters, materials, timeline } from '../data/storyData';
import './OurStory.css';

const OurStory = () => {
    useEffect(() => {
        // Reveal interaction using IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, { threshold: 0.1 });

        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="story-page">

            {/* Chapter 1: The Beginning */}
            <section className="story-chapter hero-chapter">
                <div className="chapter-bg">
                    <img src={storyChapters.chapter1.image} alt="Atelier" />
                </div>
                <div className="chapter-content text-center">
                    <span className="chapter-num">Chapter I</span>
                    <h1 className="chapter-title">{storyChapters.chapter1.title}</h1>
                    <p className="chapter-subtitle">{storyChapters.chapter1.subtitle}</p>
                    <div className="scroll-indicator">
                        <span>Scroll to Explore</span>
                        <div className="line"></div>
                    </div>
                </div>
            </section>

            {/* Chapter 2: Founder's Vision */}
            <section className="story-chapter split-chapter section-padding">
                <div className="container split-layout">
                    <div className="split-images reveal-on-scroll">
                        <img src={storyChapters.chapter2.image1} alt="Founder" className="img-portrait" />
                        <img src={storyChapters.chapter2.image2} alt="Detail" className="img-detail" />
                    </div>
                    <div className="split-text reveal-on-scroll">
                        <span className="chapter-num">Chapter II</span>
                        <h2 className="section-title">The Founder's Vision</h2>
                        <blockquote className="vision-quote">"{storyChapters.chapter2.quote}"</blockquote>
                        <p className="vision-text">{storyChapters.chapter2.text}</p>
                    </div>
                </div>
            </section>

            {/* Chapter 3: Craftsmanship (Parallax) */}
            <section className="story-chapter parallax-chapter">
                <div className="parallax-bg" style={{ backgroundImage: `url(${storyChapters.chapter3.bgImage})` }}></div>
                <div className="parallax-content reveal-on-scroll">
                    <span className="chapter-num">Chapter III</span>
                    <h2 className="section-title text-white">The Craftsmanship</h2>
                    <p className="text-white">{storyChapters.chapter3.description}</p>
                </div>
            </section>

            {/* Chapter 4: The Atelier */}
            <section className="story-chapter split-chapter section-padding bg-cream">
                <div className="container split-layout reverse">
                    <div className="split-text reveal-on-scroll">
                        <span className="chapter-num">Chapter IV</span>
                        <h2 className="section-title">{storyChapters.chapter4.title}</h2>
                        <p className="vision-text">{storyChapters.chapter4.description}</p>
                    </div>
                    <div className="split-images reveal-on-scroll">
                        <img src={storyChapters.chapter4.image} alt="Atelier" className="img-portrait" style={{ width: '100%', height: '500px' }} />
                    </div>
                </div>
            </section>

            {/* Chapter 5: Philosophy */}
            <section className="story-chapter parallax-chapter small-parallax">
                <div className="parallax-bg" style={{ backgroundImage: `url(${storyChapters.chapter5.image})` }}></div>
                <div className="parallax-content reveal-on-scroll">
                    <span className="chapter-num">Chapter V</span>
                    <h2 className="section-title text-white">{storyChapters.chapter5.title}</h2>
                    <p className="text-white" style={{ maxWidth: '700px' }}>{storyChapters.chapter5.description}</p>
                </div>
            </section>

            {/* Chapter 6: Materials */}
            <section className="story-chapter materials-chapter section-padding">
                <div className="container">
                    <div className="text-center mb-lg reveal-on-scroll">
                        <span className="chapter-num">Chapter VI</span>
                        <h2 className="section-title">The Materials</h2>
                    </div>
                    <div className="materials-grid">
                        {materials.map(material => (
                            <div key={material.id} className="material-card reveal-on-scroll">
                                <div className="material-img">
                                    <img src={material.image} alt={material.name} />
                                </div>
                                <div className="material-info">
                                    <h3>{material.name}</h3>
                                    <p>{material.origin}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default OurStory;
