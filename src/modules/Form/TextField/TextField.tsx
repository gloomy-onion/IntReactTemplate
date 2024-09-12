import React, { useState } from 'react';
import { Typography } from 'antd';
import { useFormContext } from 'react-hook-form';
import styles from './TextField.module.scss';

type TextFieldProps = {
    placeholder?: string;
    label?: string;
    name: string;
    type?: string;
    defaultValue?: string;
};

export const TextField = ({
    placeholder,
    label,
    name,
    type = 'text',
    defaultValue = '',
    ...props
}: TextFieldProps) => {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();
    const [isFocused, setIsFocused] = useState(false);

    const currentValue = watch(name, defaultValue);

    const fieldError = errors[name]?.message as string;

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setValue(name, '');
        setIsFocused(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={styles.textField}>
            <div className={styles.textFieldInputCover}>
                <input
                    {...register(name)}
                    type={type}
                    placeholder={isFocused ? '' : placeholder}
                    className={styles.formInput}
                    defaultValue={defaultValue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />
                {label && <Typography.Text className={styles.label}>{label}</Typography.Text>}
                {currentValue && <button className={styles.clearButton} onClick={handleClear} />}
            </div>
            {fieldError && <Typography.Text type="danger">{fieldError}</Typography.Text>}
        </div>
    );
};
