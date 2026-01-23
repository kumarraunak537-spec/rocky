import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const HeadManager = () => {
    const location = useLocation();

    useEffect(() => {
        fetchSiteSettings();
    }, [location]);

    const fetchSiteSettings = async () => {
        try {
            const { data } = await supabase
                .from('site_settings')
                .select('site_name, site_tagline, favicon_url')
                .limit(1)
                .single();

            if (data) {
                // Update Title
                // Logic: Page Name | Site Name
                // For now, simpler logic:
                if (data.site_name) {
                    document.title = data.site_name + (data.site_tagline ? ` - ${data.site_tagline}` : '');
                }

                // Update Favicon
                if (data.favicon_url) {
                    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                    link.type = 'image/x-icon';
                    link.rel = 'shortcut icon';
                    link.href = data.favicon_url;
                    document.getElementsByTagName('head')[0].appendChild(link);
                }
            }
        } catch (error) {
            console.error('Error updating head:', error);
        }
    };

    return null; // Logic only component
};

export default HeadManager;
