const Team = require('../models/Team');
const User = require('../models/User');

const createTeam = async (req, res) => {
    const userId = req.userId;
    const { name, description, members = [] } = req.body;

    try {
        const nameExists = await Team.findOne({ name, owner: userId });

        if (nameExists) {
            return res.status(409).json({ message: 'Este nome de time já existe' });
        }

        if (members.length > 0) {
            const validMembers = await User.find({ _id: { $in: members } });

            if (validMembers.length !== members.length) {
                return res.status(400).json({ message: 'Um ou mais membros informados não existem' });
            }
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


const listTeams = async (req,res)=>{
    
const userId = req.userId; 

    try {
        const team = await Team.findById(userId).select('-password');

        if (!team) {
            return res.status(404).json({ message: 'Time  não encontrado' });
        }

        return res.status(200).json(team);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

module.exports = { 
    createTeam,
    listTeams };