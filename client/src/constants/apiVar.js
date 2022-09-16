const urlBase = `https://chatappsocketbackend.onrender.com`;

// Auth
const apiRefreshToken = `${urlBase}/auth/refreshAccessToken`;
const apiAuthUserReload = `${urlBase}/auth/authUserReloadPage`;
const apiLogin = `${urlBase}/auth/login`;
const apiRegister = `${urlBase}/auth/register`;
const apiLogout = `${urlBase}/auth/logout`;

// Message
const apiGetCurrentMessage = `${urlBase}/message/getCurrentMessage`;
const apiAddNewMessage = `${urlBase}/message/newMessage`;

// Friends
const apiGetFriendList = `${urlBase}/getFriendList`;
const apiSearchFriendList = `${urlBase}/searchFriendList`;
const apiAddFriend = `${urlBase}/addFriend`;

const apiSetImageUser = `${urlBase}/setImageUser`;

export {
    urlBase,
    apiRefreshToken,
    apiAuthUserReload,
    apiLogin,
    apiRegister,
    apiLogout,
    apiGetCurrentMessage,
    apiAddNewMessage,
    apiGetFriendList,
    apiSearchFriendList,
    apiAddFriend,
    apiSetImageUser,
};
