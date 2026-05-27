import { useState, useEffect } from 'react';

export function usePageTransition(loading, delay = 300) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowContent(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [loading, delay]);

  return showContent;
}