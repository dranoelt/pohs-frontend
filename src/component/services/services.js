import axios from "axios";
import authHeaders from "./auth-headers";
const API_URL = 'http://pohs-backend.user.cloudjkt01.com/api/';

const getData = section => {
    return axios.get(API_URL + `${section}`, {headers: authHeaders()})
}
const getDataById = (section, id) => {
    return axios.get(API_URL + `${section}/${id}`, {headers: authHeaders()})
}
const createData = (section, data) => {
    return axios.post(API_URL + `${section}`, data, {headers: authHeaders()})
}
const updateData = (section, id, data) => {
    return axios.patch(API_URL + `${section}/${id}`, data, {headers: authHeaders()})
}
const getDatabyData = (section, data) => {
    return axios.post(API_URL + `${section}`, data, {headers: authHeaders()})
}

const service = {
    getData, getDataById, createData, updateData, getDatabyData
}

export default service;