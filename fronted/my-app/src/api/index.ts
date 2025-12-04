import axios from 'axios'

class HttpRequest {
    baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_BASE_URL;
    }

    getInsideConfig() {
        return {
            baseURL: this.baseUrl,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    interceptors(instance: any) {
        instance.interceptors.request.use(
            (config: any) => {
                return config;
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );

        instance.interceptors.response.use(
            (response: any) => {
                return response.data; // ⭐ 这里返回 data，更好用
            },
            (error: any) => {
                return Promise.reject(error);
            }
        );
    }

    request(options: any) {
        const instance = axios.create();
        options = { ...this.getInsideConfig(), ...options };
        this.interceptors(instance);
        return instance(options);
    }

    /** -------------------------
     *   封装 GET / POST / PUT / DELETE
     *  ------------------------- */

    get(url: string, params?: any) {
        return this.request({
            url,
            method: 'get',
            params
        });
    }

    post(url: string, data?: any) {
        return this.request({
            url,
            method: 'post',
            data
        });
    }

    put(url: string, data?: any) {
        return this.request({
            url,
            method: 'put',
            data
        });
    }

    delete(url: string, params?: any) {
        return this.request({
            url,
            method: 'delete',
            params
        });
    }
}

export default new HttpRequest();
