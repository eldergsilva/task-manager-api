const joi = require('joi');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const schemaCreateTask = joi.object({
    title: joi.string().trim().min(3).required().messages({
        'any.required': 'O campo título é obrigatório',
        'string.empty': 'O campo título é obrigatório',
        'string.min': 'O título deve ter pelo menos 3 caracteres',
    }),

    description: joi.string().trim().min(3).required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório',
        'string.min': 'A descrição deve ter pelo menos 3 caracteres',
    }),

    priority: joi.string().valid('baixa', 'media', 'alta').messages({
        'any.only': 'A prioridade deve ser: baixa, media ou alta',
    }),

    assignedTo: joi.string().regex(objectIdPattern).messages({
        'string.pattern.base': 'O campo assignedTo deve ser um ID de usuário válido',
    }),

    dueDate: joi.date().greater('now').messages({
        'date.base': 'A data de prazo deve ser uma data válida',
        'date.greater': 'A data de prazo não pode estar no passado',
    }),
});

module.exports = schemaCreateTask;