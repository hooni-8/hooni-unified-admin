import api from "./GatewayInstance";

const baseUrl = process.env.REACT_APP_API_GATEWAY;

const accessToken = localStorage.getItem('accessToken');

export const get = async (path, opts) => {
    let result = {};

    await api.get(baseUrl + path, {
        params: opts,
    }).then((response) => {
        if (response.status === 200) {
            result = response;
            result.status = response.status;
        }
    }).catch((error) => {
        result = error.response;
        console.error(error);
    });
    return result;
}

export const post = async (path, payload) => {
    let result = {};

    await api.post(baseUrl + path, payload, {})
        .then((response) => {
            if (response.status === 200) {
                result = response;
                result.status = response.status;
            }
        })
        .catch((error) => {
            result = error.response;
            console.error(error);
        })
    return result;
}

export const session = async () => {
    let result = { isLogin: false, userName: '', userCode: '', role: '' };

    await api.post(baseUrl + "/auth/session", { accessToken })
        .then((response) => {
            const data = response.data;

            result = {isLogin: data.status, userName: data.name, userCode: data.userCode, role: data.role};
        })
        .catch((error) => {
            console.error(error)
        })
    return result;
}