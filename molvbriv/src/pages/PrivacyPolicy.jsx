import React from 'react';
import './OurStory.css'; // Reusing similar text styles for consistency

const PrivacyPolicy = () => {
    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className="story-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Privacy Policy</h1>

            <div className="story-content" style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.8', color: '#444' }}>
                <p style={{ marginBottom: '20px' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>1. Introduction</h3>
                <p>
                    Welcome to MOLVBRIV. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regarding of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>2. Data We Collect</h3>
                <p>
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px', marginBottom: '10px' }}>
                    <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier.</li>
                    <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                    <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
                    <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                </ul>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>3. How We Use Your Data</h3>
                <p>
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px', marginBottom: '10px' }}>
                    <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    <li>Where we need to comply with a legal or regulatory obligation.</li>
                </ul>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>4. Data Security</h3>
                <p>
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>5. Contact Us</h3>
                <p>
                    If you have any questions about this privacy policy or our privacy practices, please contact us at: support@molvbriv.com.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
