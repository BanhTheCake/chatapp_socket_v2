const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getCurrentMessage = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { currentUserId } = req.query;
        const messageList = await db.Messages.findAll({
            where: {
                from: { [Op.or]: [userId, currentUserId] },
                to: { [Op.or]: [userId, currentUserId] },
            },
            separate: true,
            order: [['createdAt', 'DESC']],
        });
        if (!messageList) {
            return res.json({ login: false, message: 'Please Try Again' });
        }
        return res.json(messageList);
    } catch (error) {
        next(error);
    }
};

const addNewMessage = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { currentUserId, text } = req.body;
        const data = await db.Messages.create({
            from: userId,
            to: currentUserId,
            text,
        });
        if (!data) {
            return res.json({ login: false, message: 'Please Try Again' });
        }
        return res.json(data);
    } catch (error) {
        next(error);
    }
};

module.exports = { getCurrentMessage, addNewMessage };
