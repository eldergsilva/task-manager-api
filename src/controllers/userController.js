const bcrypt = require('bcrypt');

const User = require('../models/User');

const listUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};



const updateUser = async (req, res) => {
    const userId = req.userId;
    const { name, email, password } = req.body;

    try {
        if (email !== undefined) {
            const emailExists = await User.findOne({ email, _id: { $ne: userId } });

            if (emailExists) {
                return res.status(409).json({ message: 'Este email já está cadastrado' });
            }
        }

        const updates = { name, email };

        if (password !== undefined) {
            updates.password = await bcrypt.hash(password, 10);
        }

        
        Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const listLoggedUser = async (req, res) => {
    const userId = req.userId; 

    try {
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { listUsers,deleteUser,listLoggedUser,updateUser };