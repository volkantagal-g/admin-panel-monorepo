/* eslint-disable no-param-reassign */
import { useEffect, useCallback } from 'react';
import { useTheme } from 'react-jss';
import { useNavigate, useLocation } from 'react-router-dom';

import useQuery from '@shared/shared/hooks/useQuery';

const CLEAR_SCROLL_TO_STYLE_MS = 3000;
const DISCONNECT_OBSERVER_MS = 5000;
const OFFSET_TOP = 50;

export default function ScrollTo({
  borderDisappearTimeout = CLEAR_SCROLL_TO_STYLE_MS,
  offsetTop = OFFSET_TOP,
}) {
  const query = useQuery();
  const theme = useTheme();
  const scrollToId = query?.get('scrollTo');
  const counter = query?.get('c');
  const location = useLocation();
  const navigate = useNavigate();

  const scrollIntoView = useCallback(element => {
    const { pathname } = location;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offsetTop;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    element.style.border = `2px solid ${theme.color.primary}`;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    navigate(pathname, { replace: true });

    const timerId = setTimeout(() => {
      element.style.border = 'none';
    }, borderDisappearTimeout);

    return () => {
      clearTimeout(timerId);
    };
  }, [location, offsetTop, theme.color.primary, navigate, borderDisappearTimeout]);

  useEffect(() => {
    const element = document.getElementById(scrollToId);
    if (scrollToId && element) {
      scrollIntoView(element);
    }
    else if (scrollToId) {
      let observer;
      const observerCallback = () => {
        const el = document.getElementById(scrollToId);
        if (el) {
          scrollIntoView(el);
          observer.disconnect();
        }
      };
      observer = new MutationObserver(observerCallback);
      observer.observe(document.body, { childList: true, subtree: true });

      const timeoutId = setTimeout(() => {
        observer.disconnect();
      }, DISCONNECT_OBSERVER_MS);

      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
    return null;
  }, [theme.color.primary, scrollToId, counter, scrollIntoView]);

  return null;
}
