import * as Yup from 'yup';

export const FilterBarSchema = Yup.object().shape({
    search: Yup.string()
        .required('Mandatory info missing')
        .min(3, 'Seems a bit short...')
        .max(50, 'We prefer insecure system, try a shorter...')

});