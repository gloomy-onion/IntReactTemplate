import React, { FocusEvent, InputHTMLAttributes, useState } from 'react';
import { Typography } from 'antd';
import { useFormContext, get } from 'react-hook-form';
import styles from './TextField.module.scss';

type TextFieldProps = {
    label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({
    placeholder,
    label,
    name = '',
    type = 'text',
    onFocus,
    onBlur,
    ...props
}: TextFieldProps) => {
    const {
        register,
        formState: { errors },
        setValue,
        watch,
    } = useFormContext();
    const [isFocused, setIsFocused] = useState(false);

    const currentValue = watch(name);
    const fieldError = get(errors, name)?.message;
    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setValue(name, '');
        setIsFocused(false);
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <div className={styles.textField}>
            <div className={styles.textFieldInputCover}>
                <input
                    {...props}
                    {...register(name)}
                    type={type}
                    placeholder={isFocused ? '' : placeholder}
                    className={styles.formInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {label && <Typography.Text className={styles.label}>{label}</Typography.Text>}
                {currentValue && <button className={styles.clearButton} onClick={handleClear} />}
            </div>
            {fieldError && <Typography.Text type="danger">{fieldError}</Typography.Text>}
        </div>
    );
};
