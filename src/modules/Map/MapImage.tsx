import React from 'react';
import mapImage from '../../shared/lib/assets/img/map.jpg';
import styles from './Map.module.scss';

const MapImage = () => (
    <img src={mapImage} className={styles.mapImg} alt="Map from Dora the explorer" />
);

export default MapImage;
