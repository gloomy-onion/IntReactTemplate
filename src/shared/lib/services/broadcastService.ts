import { BroadcastMessage } from '../../types/broadcast';

const channelName = 'theme_channel';
const channel: BroadcastChannel | null = new BroadcastChannel(channelName);

export const sendMessage = (message: BroadcastMessage): void => {
    if (channel) {
        // eslint-disable-next-line unicorn/require-post-message-target-origin
        channel.postMessage(message);
    }
};

export const listenToMessages = (callback: (message: BroadcastMessage) => void): void => {
    if (channel) {
        const handleMessage = (event: MessageEvent<BroadcastMessage>) => {
            callback(event.data);
        };

        channel.addEventListener('message', handleMessage);
    }
};
