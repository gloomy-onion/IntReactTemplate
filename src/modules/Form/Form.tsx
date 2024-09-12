import React from 'react';
import { Button, Typography } from 'antd';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from './TextField';
import styles from './Form.module.scss';
import { FormType } from '../../shared/types/form';
import { formSchema } from '../../shared/lib/constants/formSchema';

type FormProps = {
    documentName: string;
};

export const Form = ({ documentName = 'Document' }: FormProps) => {
    const methods = useForm<FormType>({
        resolver: yupResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormType> = (data) => {
        const transformedData = {
            documentName,
            items: { ...data },
        };

        console.log(transformedData);
    };

    return (
        <FormProvider {...methods}>
            <form id="form" onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={styles.form}>
                    <Typography.Title level={2}>{documentName}</Typography.Title>
                    <TextField label="Surname" name="surname" placeholder="Enter surname" />
                    <TextField label="Name" name="name" placeholder="Enter name" />
                    <TextField
                        label="Patronymic"
                        name="patronymic"
                        placeholder="Enter patronymic"
                    />

                    <div className={styles.contacts}>
                        <Typography.Title level={4}>Contacts</Typography.Title>
                        <div className={styles.address}>
                            <Typography.Title level={4}>Address</Typography.Title>
                            <TextField
                                label="City"
                                name="contacts.address.city"
                                placeholder="Enter city"
                            />
                            <TextField
                                label="Street"
                                name="contacts.address.street"
                                placeholder="Enter street"
                            />
                            <TextField
                                label="House"
                                name="contacts.address.house"
                                placeholder="Enter house"
                            />
                        </div>
                        <div className={styles.phones}>
                            <Typography.Title level={4}>Phones</Typography.Title>
                            <TextField
                                label="Phone"
                                name="contacts.phones[0]"
                                placeholder="Enter phone number"
                            />
                            <Button size="large">Add</Button>
                        </div>
                    </div>
                    <Button size="large" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
