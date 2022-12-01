import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:5027/api/';

const user = JSON.parse(localStorage.getItem('user'))

const getPublicContent = () => {
    return axios.get(API_URL + '/');
};

/*

const getPublicHome = {
    getCrud: () => {
        return axios.get(API_URL + 'home');
    },
};*/

const headerAuthorization = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + AuthService.getCurrentUser().token
        }
    }
};


const getAdminBoardCrud = async () => {
    return await axios.get(API_URL + 'hotel', {headers: {Authorization: 'Bearer ' + user.token }});
};
/*
const salvarCrud = async (method, url, crud) => {
    return await axios[method](url, crud, headerAuthorization())
};

const deletarCrud = async (id) => {
    return await axios.delete(API_URL + 'crud/' + id, headerAuthorization())
};
*/


const UserService = {
    getPublicContent,
    //getPublicHome,
    getAdminBoardCrud//: getAdminBoardCrud,
    //salvarCrud,
    //deletarCrud,
};

export default UserService