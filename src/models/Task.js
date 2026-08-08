const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team',
            required: true,
        },
        status: {
            type: String,
            enum: ['pendente', 'em_andamento', 'concluida'],
            default: 'pendente',
        },
        priority: {
            type: String,
            enum: ['baixa', 'media', 'alta'],
            default: 'media',
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;