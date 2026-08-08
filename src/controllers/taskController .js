const Team = require('../models/Team');
const User = require('../models/User');
const Task = require('../models/Task');

const createTask = async (req, res) => {
    const userId = req.userId;
    const { teamId } = req.params;
    const { title, description, priority, assignedTo, dueDate } = req.body;

    try {
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: 'Time não encontrado' });
        }

        const isOwner = team.owner.toString() === userId;
        const isMember = team.members.some(memberId => memberId.toString() === userId);

        if (!isOwner && !isMember) {
            return res.status(403).json({ message: 'Você não faz parte desse time' });
        }

        const titleExists = await Task.findOne({ title, team: teamId });

        if (titleExists) {
            return res.status(409).json({ message: 'Já existe uma task com esse título nesse time' });
        }

        if (assignedTo) {
            const assignedUserExists = await User.findById(assignedTo);

            if (!assignedUserExists) {
                return res.status(404).json({ message: 'Usuário atribuído não encontrado' });
            }

            const assignedIsMember = team.members.some(memberId => memberId.toString() === assignedTo)
                || team.owner.toString() === assignedTo;

            if (!assignedIsMember) {
                return res.status(400).json({ message: 'O usuário atribuído precisa ser membro do time' });
            }
        }

        const task = await Task.create({
            title,
            description,
            team: teamId,
            priority,
            assignedTo,
            status: 'pendente',
            createdBy: userId,
            dueDate,
        });

        return res.status(201).json({
            message: `Task "${task.title}" criada com sucesso`,
            task,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

module.exports = { createTask };