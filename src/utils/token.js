import * as jose from "jose";

export const getToken = () => {
    return JSON.parse(localStorage.getItem("token")) || null;
};

export const setToken = (token = null) => {
    localStorage.setItem("token", JSON.stringify(token));
};

export const deleteToken = () => {
    localStorage.removeItem("token");
};

export const decodeToken = () => {
    return jose.jwtDecrypt(getToken());
};