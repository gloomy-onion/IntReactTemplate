import { useEffect, useRef, useState } from 'react';

type Size = {
    width: number;
    height: number;
};

export const useResizeObserver = () => {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });
    const observedElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!observedElementRef.current) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setSize({ width, height });
            }
        });

        observer.observe(observedElementRef.current);

        return () => {
            observer.disconnect();
        };
    }, [observedElementRef]);

    return { observedElementRef, size };
};
