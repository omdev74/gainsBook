import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
const ProtectedRoute: React.FC = () => {
    const { isLoggedIn, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;