import axios from "axios";

import { debug } from "../constants/debug";

const api = axios.create({
    baseURL: "/api/v1",
    headers: { "Content-Type": "application/json" },
});

/* *** UTILS *** */
//
const defaultQuery = {
    name: undefined,
    passportId: undefined,
    name: undefined,
    email: undefined,
    age: undefined,
    minCash: undefined,
    maxCash: undefined,
    active: undefined,
};

const responseHandler = async (requestFunction) => {
    try {
        const response = await requestFunction();
        return response.data;
    } catch (error) {
        debug && console.error("Error request: ", error.response.data);
        return error.response.data;
    }
};
//
/* *** END UTILS *** */

export const getUsers = async (query) => {
    return await responseHandler(async () => await api.get("/users", { params: query }));
};

export const createUser = async (query) => {
    return await responseHandler(async () => await api.post("/users", query));
};

export const updateUser = async (id, query) => {
    return await responseHandler(
        async () => await api.put("/users/" + String(id), query)
    );
};

export const deleteUser = async (id, query) => {
    return await responseHandler(async () => await api.delete("/users/" + String(id)));
};
