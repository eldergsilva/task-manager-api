const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,  
            unique: true,    
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: '',
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;