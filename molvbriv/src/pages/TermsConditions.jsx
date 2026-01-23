import React from 'react';
import './OurStory.css'; // Reusing similar text styles for consistency

const TermsConditions = () => {
    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className="story-title" style={{ textAlign: 'center', marginBottom: '40px' }}>Terms & Conditions</h1>

            <div className="story-content" style={{ fontFamily: 'var(--font-sans)', lineHeight: '1.8', color: '#444' }}>
                <p style={{ marginBottom: '20px' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>1. Agreement to Terms</h3>
                <p>
                    These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and MOLVBRIV (“we,” “us” or “our”), concerning your access to and use of the MOLVBRIV website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).
                </p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>2. Intellectual Property Rights</h3>
                <p>
                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                </p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>3. Products</h3>
                <p>
                    We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
                </p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>4. Purchases and Payment</h3>
                <p>
                    We accept the following forms of payment: Visa, Mastercard, American Express, PayPal, Google Pay, Apple Pay. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Site.
                </p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>5. Return Policy</h3>
                <p>
                    Please review our Return Policy posted on the Site prior to making any purchases.
                </p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>6. Governing Law</h3>
                <p>
                    These Terms shall be governed by and defined following the laws of India. MOLVBRIV and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                </p>

                <h3 style={{ fontFamily: 'var(--font-serif)', marginTop: '30px', marginBottom: '15px' }}>7. Contact Us</h3>
                <p>
                    In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: support@molvbriv.com.
                </p>
            </div>
        </div>
    );
};

export default TermsConditions;
