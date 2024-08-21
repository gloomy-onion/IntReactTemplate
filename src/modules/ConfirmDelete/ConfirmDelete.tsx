import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { useLocalizationContext } from '../../context/LocalizationContext';
import { getButtonType } from '../../shared/lib/utils/themeUtils';
import { useThemeContext } from '../../context/ThemeContext';

type ConfirmDeleteProps = {
    open: boolean;
    handleOk: (id: string) => void;
    handleCancel: () => void;
};

export const ConfirmDelete = ({ open, handleOk, handleCancel }: ConfirmDeleteProps) => {
    const { translate } = useLocalizationContext();
    const { currentTheme } = useThemeContext();
    const buttonType = getButtonType(currentTheme);

    return (
        <Modal
            open={open}
            title={translate('confirmDeleteTitle')}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" type="default" size="large" onClick={handleCancel}>
                    {translate('cancel')}
                </Button>,
                <Button key="confirm" type={buttonType} size="large" onClick={() => handleOk}>
                    {translate('confirm')}
                </Button>,
            ]}
        >
            <Typography.Text>{translate('confirmDelete')}</Typography.Text>
        </Modal>
    );
};
