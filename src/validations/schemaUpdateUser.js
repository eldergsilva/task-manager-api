const joi = require('joi');

const schemaUpdateUser = joi.object({
    name: joi.string().messages({
        'string.empty': 'O campo nome não pode ser vazio',
    }),

    email: joi.string().email().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'string.empty': 'O campo email não pode ser vazio',
    }),

    password: joi.string().min(5).messages({
        'string.min': 'A senha precisa conter, no mínimo, 5 caracteres',
        'string.empty': 'O campo senha não pode ser vazio',
    }),
}).min(1).messages({
    'object.min': 'Envie ao menos um campo para atualizar',
});

module.exports = schemaUpdateUser;