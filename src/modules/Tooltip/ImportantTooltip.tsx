import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';
import { useLocalizationContext } from '../../context/LocalizationContext';

type ImportantTooltipProps = {
    children: ReactNode;
};

export const ImportantTooltip = ({ children }: ImportantTooltipProps) => {
    const { translate } = useLocalizationContext();

    const text = translate('importantTooltip');

    return (
        <div>
            <Tooltip title={text}>{children}</Tooltip>
        </div>
    );
};
