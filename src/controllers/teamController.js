const Team = require('../models/Team');

const createTeam = async (req, res) => {
    const userId = req.userId; // Veio do middleware de autenticação 
    const { name, description, members = [] } = req.body;

     
    if (!name) {
        return res.status(400).json({ message: 'O nome do time é obrigatório' });
    }

    try {
         
        const nameExists = await Team.findOne({ name });
        if (nameExists) {
            return res.status(409).json({ message: 'Este nome de time já existe' });
        }

        
        const teamMembers = Array.from(new Set([...members, userId]));

        
        const team = await Team.create({
            name,
            description,
            owner: userId,
            members: teamMembers,
        });

        
        return res.status(201).json(team);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = { createTeam };