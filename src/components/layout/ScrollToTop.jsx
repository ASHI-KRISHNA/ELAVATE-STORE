import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Utility component that resets the window scroll position to the top.
 * Triggers automatically whenever the React Router location path changes.
 * * @returns {null} Renders nothing to the DOM.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;