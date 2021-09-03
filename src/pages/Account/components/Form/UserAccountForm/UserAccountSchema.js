import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const UserAccountSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Mandatory info missing')
        .matches(/^[a-zA-Z\s]+$/, 'Full name'),
    phone: Yup.string()
        .required('Mandatory info missing')
        .matches(phoneRegExp, 'Phone number is not valid'),
    country: Yup.string()
        .typeError('Mandatory info missing')
        .required(),
    city: Yup.string()
        .typeError('Mandatory info missing')
        .required(),
    address: Yup.string()
        .typeError('Mandatory info missing')
        .required()
});