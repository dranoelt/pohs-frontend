import axios from "axios";
import authHeaders from "./auth-headers";
const API_URL = 'http://pohs-backend.user.cloudjkt01.com/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'register', {
        UserName: username, UserEmail: email, UserPassword: password
    });
};

const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login', {
        UserEmail: email, UserPassword: password
    });
    localStorage.setItem('user', JSON.stringify(response.data));
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const refreshToken = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(API_URL + 'refresh', {token: user.Token}, {headers: authHeaders()});
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(response.data));
}

const changeProfile = (name, email) => {
    const user = getCurrentUser();
    const newUser = {
        UserName: name,
        UserEmail: email,
        UserId: user.UserId,
        Token: user.Token,
        exp: user.exp
    }
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(newUser));
}

const check = (email) => {
    return axios.post(API_URL + `check`, {UserEmail: email});
}

const forgetpass = (email, password) => {
    return axios.patch(API_URL + `forgetpass`, {UserEmail: email, UserPassword: password});
}

const authService = {
    register, login, logout, getCurrentUser, refreshToken, check, forgetpass, changeProfile
};

export default authService;