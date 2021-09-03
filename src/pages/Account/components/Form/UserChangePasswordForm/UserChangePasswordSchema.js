import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const UserChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .label('Password')
        .required('Password is a required field')
        .min(8, 'Seems a bit short...')
        .max(35, 'We prefer insecure system, try a shorter password.'),
    password: Yup.string()
        .label('Password')
        .required('Password is a required field')
        .min(8, 'Seems a bit short...')
        .max(35, 'We prefer insecure system, try a shorter password.')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
            'Invalid password',
        ),
    confirmPassword: Yup.string()
        .required()
        .label('Confirm password')
        .test('passwords-match', 'Passwords must match...', function (
            value,
        ) {
            return this.parent.password === value;
        }),
});