import React, { Suspense, lazy } from 'react';
import { Modal } from 'antd';
import { Loading } from '../Loading';
import { useLocalizationContext } from '../../context/LocalizationContext';
import styles from './Map.module.scss';

type MapProps = {
    open: boolean;
    onClose: () => void;
};
const LazyMapImage = lazy(() => import('./MapImage'));

export const Map = ({ open, onClose }: MapProps) => {
    const { translate } = useLocalizationContext();

    return (
        <Modal
            title={translate('map')}
            open={open}
            onCancel={onClose}
            footer={null}
            className={styles.modalMap}
        >
            <Suspense fallback={<Loading />}>
                <LazyMapImage />
            </Suspense>
        </Modal>
    );
};
