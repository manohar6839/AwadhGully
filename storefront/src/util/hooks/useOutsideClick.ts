import { useEffect, useRef } from 'react';

export const useOutsideClick = (
    ref: React.RefObject<HTMLElement>,
    handler: (event: MouseEvent | TouchEvent) => void,
) => {
    // Use a ref to store the handler so we don't re-run the effect when it changes
    const handlerRef = useRef(handler);
    
    // Update the ref when handler changes
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            // Check if click is outside the ref element
            if (!ref.current || ref.current.contains(event.target as Node)) return;
            // Call the current handler from ref
            handlerRef.current(event);
        };
        
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref]); // Only re-run if ref changes, not when handler changes
};
