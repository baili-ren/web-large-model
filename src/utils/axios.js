import axios from 'axios';
const AXIOS_DEFAULT_CONFIG = {
    timeout: 0,
    maxContentLength: Infinity,
    headers: {},
    // baseURL: import.meta.env.VITE_APP_ISMOCK_ENV === 'true' ? '' : '/v2/web'
    // baseURL: import.meta.env.DEV ? '' : ""
    baseURL: import.meta.env.VITE_API_BASE_URL

};
const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);
// 注入请求拦截
// axiosInstance.interceptors.request.use(requestSuccessFn, requestFailFn);
// 注入失败拦截
// axiosInstance.interceptors.response.use(responseSuccessFn, responseFailFn);

export default axiosInstance;
