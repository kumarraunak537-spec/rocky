import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Maintenance from '../pages/Maintenance';

const MaintenanceGuard = ({ children }) => {
    const [isMaintenance, setIsMaintenance] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkMaintenanceMode();
    }, []);

    const checkMaintenanceMode = async () => {
        try {
            const { data } = await supabase
                .from('site_settings')
                .select('maintenance_mode')
                .limit(1)
                .single();

            if (data?.maintenance_mode) {
                setIsMaintenance(true);
            }
        } catch (error) {
            console.error('Error checking maintenance mode:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null; // Or a simple spinner

    if (isMaintenance) {
        return <Maintenance />;
    }

    return children;
};

export default MaintenanceGuard;
