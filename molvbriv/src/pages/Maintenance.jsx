import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Wrench } from 'lucide-react';

const Maintenance = () => {
    const [message, setMessage] = useState('We are currently undergoing maintenance. Please check back soon.');

    useEffect(() => {
        const fetchMessage = async () => {
            const { data } = await supabase
                .from('site_settings')
                .select('maintenance_message')
                .limit(1)
                .single();

            if (data?.maintenance_message) {
                setMessage(data.maintenance_message);
            }
        };
        fetchMessage();
    }, []);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ebeae5', // Theme background
            color: '#1a1a1a',
            fontFamily: "'Cormorant Garamond', serif",
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{ marginBottom: '1.5rem', color: '#08301e' }}>
                <Wrench size={48} />
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Site Under Maintenance</h1>
            <p style={{
                fontFamily: "'Montserrat', sans-serif",
                maxWidth: '500px',
                lineHeight: '1.6',
                color: '#555'
            }}>
                {message}
            </p>
        </div>
    );
};

export default Maintenance;
