import axios from 'axios';
import Auth from './AuthService';

const API_URL = 'http://localhost:5027/api/';

const getPublicContent = () => {
     //return axios.get(API_URL + 'home')
};

const getPublicHome = {
    getCrud: () => {
        return axios.get(API_URL + 'home/crud');
    },
};

const headerAuthorization = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + Auth.getCurrentUser().token
        }
    }
};

const getAdminBoardCrud = async () => {
    return await axios.get(API_URL + 'crud', headerAuthorization())
};

const salvarCrud = async (method, url, crud) => {
    return await axios[method](url, crud, headerAuthorization())
};

const deletarCrud = async (id) => {
    return await axios.delete(API_URL + 'crud/' + id, headerAuthorization())
};

const UserService = {
    getPublicContent,
    getPublicHome,
    getAdminBoardCrud: getAdminBoardCrud,
    salvarCrud,
    deletarCrud,
};

export default UserService