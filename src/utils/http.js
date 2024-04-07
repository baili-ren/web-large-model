import axios from "axios";
// import merge from "lodash/merge";


// 实例
const instance = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30 * 1000, // request timeout
});

instance.interceptors.request.use((config) => {
    // const customHeader = {
    //     Requesttype: "Ajax",
    // };
    // config.headers = merge(config.headers, customHeader);
    return config;
});

instance.interceptors.response.use(
    // success handler: status code that lie within the range of 2xx
    (res) => {
        // TODO: 结构字段名均待定，记得改
        const { data = {} } = res;
        const { returnCode = 0, returnMsg, returnUserMsg, msg } = data;
        let errMsg = returnMsg || returnUserMsg || msg || "系统错误";
        if (returnCode === 0) {
            return Promise.resolve(data);
        } else {
            handleErrMsgOnce({
                content: errMsg,
            });
            return Promise.reject(data);
        }
    },
    // error handler: status codes that falls outside the range of 2xx
    (error) => {
        return Promise.reject(error);
    }
);

export function request (type, path, param = {}, config = {}) {
    return new Promise((resolve, reject) => {
        instance[type](path, param, config)
            .then((response) => resolve(response))
            .catch((err) => reject(err));
    });
}

/**
 *
 * @param {String} path   [request url path]
 * @param {Object} param  [request params]
 * @param {Object} config  [axios config]
 */
export function GET (path, param = {}, config = {}) {
    return request("get", path, param, config);
}

export function POST (path, param = {}, config = {}) {
    return request("post", path, param, config);
}

export function PUT (path, param = {}, config = {}) {
    return request("put", path, param, config);
}

export function PATCH (path, param = {}, config = {}) {
    return request("patch", path, param, config);
}

export function DELETE (path, param = {}, config = {}) {
    return request("delete", path, param, config);
}

/**
 * 上传表单方法
 * @param {*} path
 * @param {*} params
 * @param {Object} config  [axios config]
 */
export function FORMDATA (path, params, config = {}) {
    const formdata = new FormData();
    Object.keys(params).forEach((key) => {
        formdata.append(key, params[key]);
    });

    const defaultFormDataConfig = {
        method: "post",
        data: formdata,
        headers: {
            "content-type": "multipart/form-data;charset=UTF-8",
        },
    };
    return new Promise((resolve, reject) => {
        request(path, merge(defaultFormDataConfig, config))
            .then((response) => resolve(response))
            .catch((err) => reject(err));
    });
}

export default {
    GET,
    POST,
    PUT,
    DELETE,
    FORMDATA,
    PATCH,
};
