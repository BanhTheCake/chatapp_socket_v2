const db = require('../models');

const socketInit = (io) => {
    io.on('connection', (socket) => {
        socket.on('connect-room', (data) => {
            const newData = [data.from, data.to].sort();
            socket.join(`${newData[0]}:${newData[1]}`);
        });
        socket.on('leave-room', (data) => {
            const newData = [data.from, data.to].sort();
            socket.leave(`${newData[0]}:${newData[1]}`);
        });
        socket.on('send-message', (data) => {
            const newData = [data.from, data.to].sort();
            io.to(`${newData[0]}:${newData[1]}`).emit('receive-message', data);
        });
        socket.on('addFriend', async (data) => {
            const { userId, friend } = data;
            const currentUser = await db.Users.findOne({
                where: { userId },
                raw: true,
            });
            delete currentUser.password;
            socket.broadcast.emit('receiveFriend', { currentUser, friend });
        });
        socket.on('disconnect', () => {
        });
    });
};

module.exports = socketInit;
