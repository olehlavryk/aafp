import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is a required field'),
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!')
        .required('Mandatory info missing')
        .matches(/^[a-zA-Z\s]+$/, 'Full name'),
    phone: Yup.string()
        .required('Mandatory info missing')
        .matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string()
        .label('Password')
        .required('Mandatory info missing')
        .min(8, 'Seems a bit short...')
        .max(35, 'We prefer insecure system, try a shorter password.')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
            'Invalid password',
        )
});

export { RegisterSchema }