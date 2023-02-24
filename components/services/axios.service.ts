import { Axios, AxiosError, AxiosResponse, AxiosRequestConfig, HeadersDefaults, AxiosRequestHeaders } from 'axios';

class Service extends Axios {
    constructor (config: AxiosRequestConfig) {
        super(config);
        this.interceptors.response.use(this.handleSuccess, this.handleError);
        this.defaults.headers.common = {};
    }

    setHeader (name: keyof HeadersDefaults['common'], value: AxiosRequestHeaders['common']) {
        this.defaults.headers.common[name] = value;
    }

    handleSuccess<TData = any> (response: AxiosResponse<TData>) {
        return response;
    }

    handleError (error: AxiosError) {
        return Promise.reject(error);
    }

    redirectTo (document: any, path: string) {
        document.location = path;
    }
}

export default new Service({
    transformResponse: res => {
        return JSON.parse(res);
    },
    transformRequest: req => {
        return JSON.stringify(req);
    },
    headers: {
        'Access-Control-Allow-Origin': 'true',
        'Content-Type': 'application/json'
    }
});
