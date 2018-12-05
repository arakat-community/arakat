import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, Canceler } from "axios";
/* import { get as getCookie } from "es-cookie";
import Exception from "../../common/models/exception"; */

const config: AxiosRequestConfig = {
    cancelToken: new axios.CancelToken((cancel: Canceler) => {
        return null;
    }),
    maxContentLength: 2000,
    maxRedirects: 5,
    responseType: "json",
    timeout: 10000,
    validateStatus: (status: number) => status >= 200 && status < 300,
    withCredentials: true,
};

/**
 * generates asyncrone http requests
 * request class is a generic class that waits a return type.
 * each function used for requests are generic functions that waits type of parameter
 */
class Request<T> {
    public endPoint: string = "";

    /**
     * constructor of request class
     * @param baseUrl base url that will request will be made (ex: http://api.domain.com)
     * @param endPoint endpoint address of api (ex: /login)
     */
    constructor(baseUrl: string, endPoint: string) {

        /**
         * this part intercepts request and adds accessToken to header
         */
        axios.interceptors.request.use((axiosConfig: AxiosRequestConfig) => {
            axiosConfig.baseURL = baseUrl;

            /**
             * in ts of getcookie, return type is undefined or 0, however it returns 0 when a cookie is set
             */
           /*  if (getCookie("accessToken")) {
                axiosConfig.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
            } else {
                axiosConfig.headers.Authorization = "Basic YXN0YXJ1czphc3RhcnVzc2VjcmV0";
            } */

            return axiosConfig;
        });

        this.endPoint = endPoint;
    }

    /**
     * get request
     * @param parameters get parameter
     */
    public async get<K>(parameters?: K): Promise<any> {
        const result: any = await axios.get<T>(`${this.endPoint}${this.getUrlParam(parameters)}`, config)
            .then(this.handleResponse)
            .catch(this.handleError);
        return result;
    }

    /**
     * delete request
     * @param parameter delete parameter
     */
    public async delete<K>(parameter: K): Promise<any> {
        const result: any = await axios.delete(`${this.endPoint}${this.getUrlParam(parameter)}`, config)
            .then(this.handleResponse)
            .catch(this.handleError);
        return result;
    }

    /**
     * head request
     * @param parameters head parameter
     */
    public async head<K>(parameters: K): Promise<any> {
        const result: any = await axios.head(`${this.endPoint}${this.getUrlParam(parameters)}`, config)
            .then(this.handleResponse)
            .catch(this.handleError);
        return result;
    }

    /**
     * post request
     * @param data post data
     */
    public async post<K>(data: K): Promise<any> {
        const result: any = await axios.post<T>(`${this.endPoint}`, data, config)
            .then(this.handleResponse)
            .catch(this.handleError);
        return result;
    }

    /**
     * put request
     * @param data put data
     */
    public async put<K>(data: K): Promise<any> {
        const result: any = await axios.put<T>(`${this.endPoint}`, data, config)
            .then(this.handleResponse)
            .catch(this.handleError);
        return result;
    }

    /**
     * patch request
     * @param data patch data
     */
    public async patch<K>(data: K): Promise<any> {
        const result: any = await axios.patch<T>(`${this.endPoint}`, data, config)
            .then(this.handleResponse)
            .catch(this.handleError);
        return result;
    }

    /**
     * handles response data
     */
    private handleResponse(response: AxiosResponse): T {
        const data: any = response.data.hasOwnProperty("meta")
            && !response.data.meta.messageCode ? response.data.data : response.data;
        return data as T;
    }

    /**
     * handles errors on error
     */
    private handleError = (error: AxiosError) => {
        if (error.response) {
            const { meta } = error.response.data;
           /*  throw new Exception(meta.message); */
        } else {
/*             throw new Exception("response.message.network.error");
 */        }
    }

    /**
     * gets an object and transform it to query string parameter
     */
    private getUrlParam: (parameters: any) => string = (parameters: any) => {
        let query: string = "";

        if (parameters) {
            if (Object.keys(parameters).length > 0) {
                query = "?";
                Object
                    .keys(parameters)
                    .forEach((key) => {
                        if (parameters[key] !== undefined && parameters[key] !== null) {
                            query += `${key}=${parameters[key]}&`;
                        }
                    });
            } else {
                query = `/${parameters}`;
            }
        }

        return query;
    }
}

export default Request;
