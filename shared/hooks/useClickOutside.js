import { useEffect, useRef } from 'react';

export default function useClickOutside({ inside = () => {}, outside = () => {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = ({ target }) => {
      if (ref.current && !ref.current.contains(target)) outside();
      else inside();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inside, outside]);
  return { ref };
}
