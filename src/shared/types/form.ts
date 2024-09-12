export type FormType = {
    surname: string;
    name: string;
    patronymic?: string | null;
    contacts: {
        address: {
            city: string;
            street: string;
            house: string;
        };
        phones?: string[] | null;
    };
};
