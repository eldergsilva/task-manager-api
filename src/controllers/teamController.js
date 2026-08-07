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

const listTeams = async (req, res) => {
    const userId = req.userId;

    try {
        const teams = await Team.find({
            $or: [
                { owner: userId },
                { members: userId },
            ],
        })
            .populate('owner', 'name email')
            .populate('members', 'name email');

        return res.status(200).json(teams);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const deleteTeam = async (req, res) => {
    const { id } = req.params;    
    const userId = req.userId;    

    try {        
        const team = await Team.findById(id);
         
        if (!team) {
            return res.status(404).json({ message: 'Time não encontrado' });
        }

        if (team.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Somente  o Owner do time tem permissão para excluí-lo' });
        }
         
        await team.deleteOne();         
        return res.status(200).json({ message: `Time :  ${team.name} , deletado com sucesso` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


const updateTeam = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const { name, description, members } = req.body;

    try {
        const team = await Team.findById(id);

        if (!team) {
            return res.status(404).json({ message: 'Time não encontrado' });
        }

        if (team.owner.toString() !== userId) {
            return res.status(403).json({ message: 'Somente o owner do time tem permissão para editá-lo' });
        }

        if (members !== undefined && members.length > 0) {
            const validMembers = await User.find({ _id: { $in: members } });

            if (validMembers.length !== members.length) {
                return res.status(400).json({ message: 'Um ou mais membros informados não existem' });
            }
        }

        const updates = {};
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;

        if (members !== undefined) {
            updates.members = Array.from(new Set([...members, team.owner.toString()]));
        }

        const teamAtualizado = await Team.findByIdAndUpdate(id, updates, { new: true })
            .populate('owner', 'name email')
            .populate('members', 'name email');

        return res.status(200).json({
            message: `Time "${teamAtualizado.name}" atualizado com sucesso`,
            team: teamAtualizado,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = { 
    createTeam,
    listTeams,
    updateTeam,
    deleteTeam
};