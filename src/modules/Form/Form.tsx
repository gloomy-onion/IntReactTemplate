import React from 'react';
import { Button, Typography } from 'antd';
import { SubmitHandler, useForm, FormProvider, useFieldArray } from 'react-hook-form';
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
        defaultValues: {
            surname: '',
            name: '',
            patronymic: '',
            contacts: {
                address: {
                    city: '',
                    street: '',
                    house: '',
                },
                phones: [{ value: '' }],
            },
        },
    });
    const { control } = methods;
    const { fields, append } = useFieldArray({
        control,
        name: 'contacts.phones' as const,
    });

    const onSubmit: SubmitHandler<FormType> = (data) => {
        const phoneValues = data.contacts.phones?.map((phone) => phone.value);

        const transformedData = {
            documentName,
            items: {
                ...data,
                contacts: {
                    ...data.contacts,
                    phones: phoneValues,
                },
            },
        };

        console.log(transformedData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={styles.form}>
                    <legend>
                        <Typography.Title level={2}>{documentName}</Typography.Title>
                    </legend>
                    <TextField label="Surname" name="surname" placeholder="Enter surname" />
                    <TextField label="Name" name="name" placeholder="Enter name" />
                    <TextField
                        label="Patronymic"
                        name="patronymic"
                        placeholder="Enter patronymic"
                    />
                    <fieldset className={styles.contacts}>
                        <legend>
                            <Typography.Title level={4} className={styles.formText}>
                                Contacts
                            </Typography.Title>
                        </legend>
                        <div className={styles.address}>
                            <Typography.Title level={4} className={styles.formText}>
                                Address
                            </Typography.Title>
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
                        <fieldset className={styles.phones}>
                            <legend>
                                <Typography.Title level={4} className={styles.formText}>
                                    Phones
                                </Typography.Title>
                            </legend>
                            {fields.map((phone, index) => (
                                <TextField
                                    key={phone.id}
                                    label={`Phone ${index + 1}`}
                                    name={`contacts.phones[${index}].value`}
                                    placeholder="Enter phone number"
                                />
                            ))}
                            <Button
                                size="large"
                                onClick={() => {
                                    append({ value: '' });
                                }}
                            >
                                Add
                            </Button>
                        </fieldset>
                    </fieldset>
                    <Button size="large" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
