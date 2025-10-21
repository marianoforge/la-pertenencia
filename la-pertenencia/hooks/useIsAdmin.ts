import { useEffect, useState } from "react";

import { useAuth } from "./useAuth";

/**
 * Hook para verificar si el usuario actual es administrador
 * NOTA: Cualquier usuario autenticado en Firebase tiene permisos de admin.
 * Los usuarios se crean manualmente en Firebase Console.
 * @returns {Object} { isAdmin: boolean, isLoading: boolean, userUid: string }
 */
export const useIsAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true);
      return;
    }

    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    // Si el usuario está autenticado, es admin
    setIsAdmin(true);
    setIsLoading(false);
  }, [user, authLoading]);

  return { isAdmin, isLoading, userUid: user?.uid };
};
