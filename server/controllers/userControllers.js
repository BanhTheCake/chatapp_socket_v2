const db = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getAllUser = async (req, res, next) => {
    try {
        const idAdmin = req.isAdmin;
        if (!idAdmin) {
            const err = new Error();
            err.status = 401;
            err.message = 'You Are Not Allow to do this';
            next(err);
        }
        const data = await db.Users.findAll({ where: { isAdmin: false } });
        return res.json(data);
    } catch (error) {
        next(error);
    }
};

const getCurrentUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const currentUser = await db.Users.findOne({
            where: { userId },
            raw: true,
        });
        if (currentUser) {
            delete currentUser.password;
            return res.json(currentUser);
        }
        return res.json({ login: false, message: 'You are not authenticate' });
    } catch (error) {
        next(error);
    }
};

const getFriendList = async (req, res, next) => {
    try {
        const userId = req.userId;
        const friendList = await db.Users.findOne({
            where: { userId },
            attributes: { exclude: ['password'] },
            include: [
                { association: 'userFriends', order: ['createAt', 'DESC'] },
                { association: 'friends', order: ['createAt', 'DESC'] },
            ],
        });

        if (!friendList) {
            return res.json({
                login: false,
                message: 'You must register to use this',
            });
        }
        const newFriendList = [
            ...JSON.parse(JSON.stringify(friendList?.friends)),
            ...JSON.parse(JSON.stringify(friendList?.userFriends)),
        ];
        newFriendList.map((item) => {
            delete item.password;
            return item;
        });
        return res.json(newFriendList);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const addFriend = async (req, res, next) => {
    try {
        const userId = req.userId;
        const { friendUserId } = req.body;
        const data = await db.Friends.create({ userId, friendUserId });
        return res.json({ message: 'successful', data });
    } catch (error) {
        next(error);
    }
};

const searchFriend = async (req, res, next) => {
    try {
        let { searchQuery } = req.body;
        console.log(searchQuery);
        searchQuery = searchQuery.trim();
        const data = await db.Users.findAll({
            where: { username: { [Op.like]: `%${searchQuery}%` } },
            attributes: { exclude: ['password'] },
        });
        return res.json(data);
    } catch (error) {
        next(error);
    }
};

const setImageUser = async (req, res, next) => {
    const userId = req.userId;
    const { image } = req.body;
    const data = await db.Users.update(
        { image, isFirstLogin: false },
        { where: { userId } }
    );
    if (!data) {
        const err = new Error();
        err.status = 401;
        err.message = 'Please Try Again';
        next(err);
    }
    return res.json({ message: 'successful' });
};

module.exports = {
    getAllUser,
    getCurrentUser,
    getFriendList,
    addFriend,
    searchFriend,
    setImageUser,
};
