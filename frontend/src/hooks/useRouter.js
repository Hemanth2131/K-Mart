// src/hooks/useRouter.js
import { useState, useEffect } from 'react';

const useRouter = () => {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
  };

  const getParams = () => {
    const parts = route.split('/').filter(Boolean);
    return parts;
  };

  return {
    route,
    navigate,
    getParams,
  };
};

export default useRouter;