import React, { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        Ya: {
            share2: (element: HTMLDivElement) => void;
        };
    }
}

export const YandexShare: React.FC = () => {
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (element && window?.Ya?.share2) {
            window.Ya.share2(element);
        }
    }, [element]);

    const shareRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const target = shareRef.current;

        const callback: MutationCallback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    console.log('A child node has been added or removed.');
                } else if (mutation.type === 'attributes') {
                    console.log(`The ${mutation.attributeName} attribute was modified.`);
                }
            }
        };

        const observer = new MutationObserver(callback);

        const config: MutationObserverInit = { childList: true, subtree: true };

        if (target) {
            observer.observe(target, config);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={setElement}
            style={{ width: 50 }}
            className="ya-share2"
            data-curtain
            data-shape="round"
            data-limit="0"
            data-more-button-type="short"
            data-services="messenger,vkontakte,odnoklassniki"
        />
    );
};
