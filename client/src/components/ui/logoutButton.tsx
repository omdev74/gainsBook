import React from 'react';
import { Button } from './button';
const backednURI = import.meta.env.VITE_BACKEND_URI;
const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            // Optional: Call backend logout endpoint to invalidate token
            const token = localStorage.getItem('authToken');
            if (token) {
                await fetch(`${backednURI}/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Include the token if needed
                    },
                });
            }

            // Clear token from storage
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken'); // If you use sessionStorage

            // Redirect to login page
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            <Button onClick={handleLogout}>
                Logout
            </Button>
        </div>

    );
};

export default LogoutButton;
