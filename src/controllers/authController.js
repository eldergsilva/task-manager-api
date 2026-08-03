const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(409).json({ message: 'Este email já está cadastrado' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: passwordHash });

        return res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        const senhaValida = await bcrypt.compare(password, user.password);

        if (!senhaValida) {
            return res.status(401).json({ message: 'Email ou senha inválidos' });
        }

        const tokenGerado = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: tokenGerado,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };