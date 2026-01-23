import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-center-wrapper">
                <h1 className="contact-title">Contact Us</h1>
                <p className="contact-subtitle">We are here to help you</p>

                <form className="contact-form-minimal" onSubmit={e => e.preventDefault()}>
                    <div className="form-group-minimal">
                        <label>NAME</label>
                        <div className="input-wrapper">
                            <input type="text" placeholder="Your Name" required />
                        </div>
                    </div>

                    <div className="form-group-minimal">
                        <label>EMAIL</label>
                        <div className="input-wrapper">
                            <input type="email" placeholder="your@email.com" required />
                        </div>
                    </div>

                    <div className="form-group-minimal">
                        <label>MESSAGE</label>
                        <div className="input-wrapper">
                            <textarea placeholder="How can we help?" rows="4" required></textarea>
                        </div>
                    </div>

                    <button type="submit" className="btn-submit-minimal">SEND MESSAGE</button>
                </form>

                <div className="contact-footer-info">
                    <p>Concierge: concierge@molvbriv.com</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
