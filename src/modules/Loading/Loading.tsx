import React from 'react';
import { Progress, Spin } from 'antd';
import styles from './Loading.module.scss';

export const Loading = () => (
    <div className={styles.loading}>
        <Progress percent={100} />
        <Spin tip="Loading" size="large" />
    </div>
);
