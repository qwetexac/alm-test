import {
  useCallback,
  useEffect,
  useMemo,
  MutableRefObject,
  useState,
} from 'react';

import { NODE_LIST } from '../contants';

export const useDelete = (
  ref: MutableRefObject<HTMLDivElement | null>,
  onDelete: () => void
) => {
  const [isInsideTrashZone, setIsInside] = useState(false);
  const handleIntersect = useCallback<IntersectionObserverCallback>(
    ([entry]) => {
      setIsInside(!entry.isIntersecting);

      if (entry.isIntersecting) {
        document.removeEventListener('mouseup', onDelete);
        return;
      }

      document.addEventListener('mouseup', onDelete, { once: true });
    },
    [onDelete]
  );

  const observer = useMemo(() => {
    const safeZone = document.getElementById(NODE_LIST);
    if (!safeZone) return null;

    return new IntersectionObserver(handleIntersect, {
      threshold: 1,
      root: safeZone,
    });
  }, [ref.current, handleIntersect]);

  useEffect(() => {
    if (!observer) return;
    ref.current && observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref.current, observer]);

  return isInsideTrashZone;
};
