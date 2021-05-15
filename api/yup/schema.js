const yup = require('yup');

const projects = yup.object({
    name: yup
    .string()
    .trim()
    .required('name is a required field')
    .max(50, 'name field can be maximum of 50 characters long'),

    description: yup
    .string()
    .trim()
    .required('description is a required field')
    .max(512, 'description field can be maximum of 512 characters long'),

    completed: yup.bool(),
});

const actions = yup.object({
    project_id: yup
    .string()
    .required('project ID is required')

    description: yup
    .string()
    .trim()
    .required('description is a required field')
    .max(512, 'description field can be maximum of 512 characters long'),

    notes: yup
    .string()
    .trim()
    .required('notes are required'),

    completed: yup.bool(),
});

module.exports = { projects, actions };