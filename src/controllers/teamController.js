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
    const userId = req.userId; // ID do usuário logado vindo do middleware JWT

    try {
        // Busca todos os times onde o userId seja o 'owner' OU esteja dentro da lista 'members'
        const teams = await Team.find({
            $or: [
                { owner: userId },
                { members: userId } // O MongoDB já sabe buscar dentro do Array automaticamente
            ]
        })
        .populate('owner', 'name email')    // Traz nome e e-mail do criador
        .populate('members', 'name email'); // Traz nome e e-mail dos membros

        // Em listagens de busca, se não encontrar nada, retornamos um Array vazio [] com status 200,
        // e não 404. O status 404 é para quando a rota de um item específico não existe.
        return res.status(200).json(teams);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = { 
    createTeam,
    listTeams };