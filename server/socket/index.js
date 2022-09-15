const db = require('../models');

const socketInit = (io) => {
    io.on('connection', (socket) => {
        try {
            socket.on('connect-room', (data) => {
                try {     
                    const newData = [data.from, data.to].sort();
                    socket.join(`${newData[0]}:${newData[1]}`);
                } catch (error) {
                    console.log(error);
                }
            });
            socket.on('leave-room', (data) => {
                try {
                    const newData = [data.from, data.to].sort();
                    socket.leave(`${newData[0]}:${newData[1]}`);
                } catch (error) {
                    console.log(error);                
                }
            });
            socket.on('send-message', (data) => {
                try {
                    console.log(data);
                    const newData = [data.from, data.to].sort();
                    io.to(`${newData[0]}:${newData[1]}`).emit('receive-message', data);
                } catch (error) {
                    console.log(error);                
                }
            });
            socket.on('addFriend', async (data) => {
                try {
                    const { userId, friend } = data;
                    const currentUser = await db.Users.findOne({
                        where: { userId },
                        raw: true,
                    });
                    delete currentUser.password;
                    socket.broadcast.emit('receiveFriend', { currentUser, friend });
                } catch (error) {
                    console.log(error);                
                }
            });
            socket.on('disconnect', () => {
                console.log('disconnect');
            });
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = socketInit;
