import serviceHelpers from '../helpers/serviceHelpers';
import axiosService from './axios.service';
class AuthService {
    constructor () {
        serviceHelpers();
    }

    candidateLogin (payload: object) {
        return axiosService.post(process.env.NEXT_PUBLIC_API_URL + '/candidate/login', payload).then(res => res.data);
    }

    employerLogin (payload: object) {
        return axiosService.post(process.env.NEXT_PUBLIC_API_URL + '/employer/login', payload).then(res => res.data);
    }

    socialLogin (payload: object, platform: string) {
        switch (platform) {
            case 'facebook':
                return axiosService.post(process.env.NEXT_PUBLIC_API_URL + '/candidate/login/' + platform, payload).then(res => res.data);
            case 'google':
                return axiosService.post(process.env.NEXT_PUBLIC_API_URL + '/candidate/login/' + platform, payload).then(res => res.data);
            case 'linkedin':
                return axiosService.post(process.env.NEXT_PUBLIC_API_URL + '/candidate/login/' + platform, payload).then(res => res.data.data);
            default:
                break;
        }
    }

    registerUser (payload: object, role: string) {
        return axiosService.post(process.env.NEXT_PUBLIC_API_URL + `/${role}/register`, payload).then(res => res.data);
    }
}

export default new AuthService();
