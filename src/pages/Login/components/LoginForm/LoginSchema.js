import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is a required field'),
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