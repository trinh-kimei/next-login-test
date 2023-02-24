import axiosService from '../services/axios.service';

const serviceHelpers = () => {
    axiosService.setHeader('access_token', 'Bearer ');
    axiosService.setHeader('language', 'en');
};

export default serviceHelpers;
