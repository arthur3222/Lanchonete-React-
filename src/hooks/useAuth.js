import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export function useAuth(requiredRoles = []) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const stored = localStorage.getItem("authUser");
      if (!stored) {
        setLoading(false);
        return null;
      }

      const userData = JSON.parse(stored);
      
      // Validar se o token ainda é válido
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        handleLogout();
        return null;
      }

      // Verificar roles se necessário
      if (requiredRoles.length > 0 && !requiredRoles.includes(userData.role)) {
        navigate("/", { replace: true });
        return null;
      }

      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      handleLogout();
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    supabase.auth.signOut();
    setUser(null);
    navigate("/", { replace: true });
  };

  return { user, loading, logout: handleLogout, refresh: checkAuth };
}
