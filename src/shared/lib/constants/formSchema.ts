import * as yup from 'yup';

export const formSchema = yup.object({
    surname: yup
        .string()
        .required('Surname is required')
        .min(3, 'Surname must be at least 3 characters')
        .max(50, 'Surname cannot exceed 50 characters')
        .matches(/^[A-Za-zЁА-яё]+$/, 'Use only letters'),
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
    patronymic: yup.string().nullable(),
    contacts: yup.object().shape({
        address: yup.object().shape({
            city: yup.string().required('City is required'),
            street: yup.string().required('Street is required'),
            house: yup.string().required('House is required'),
        }),
        phones: yup.array().of(yup.string().required('Phone number is required')).nullable(),
    }),
});
