const joi = require('joi');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const schemaTeam = joi.object({
    name: joi.string().trim().min(3).required().messages({
        'any.required': 'O campo nome é obrigatório',
        'string.empty': 'O campo nome é obrigatório',
        'string.min': 'O nome do time deve ter pelo menos 3 caracteres',
    }),

    description: joi.string().trim().allow('').max(250).messages({
        'string.base': 'A descrição deve ser um texto',
        'string.max': 'A descrição não pode ter mais de 250 caracteres',
    }),

    members: joi.array()
        .items(
            joi.string().regex(objectIdPattern).messages({
                'string.pattern.base': 'Cada membro deve ser um ID de usuário válido',
            })
        )
        .optional()
        .messages({
            'array.base': 'O campo membros deve ser uma lista',
        }),
});

module.exports = schemaTeam;