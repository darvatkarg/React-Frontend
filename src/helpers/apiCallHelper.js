import apiHelper from "./apiHelper";

export async function register(data){
    return await apiHelper('POST', '/register', data)
}

export async function login(data){
    return await apiHelper('POST', '/login', data)
}

export async function findAllUsers(){
    return await apiHelper('GET', '/findall')
}

export async function findUserByID(id){
    return await apiHelper('GET', `/find/${id}`)
}

export async function updateUser(id, data){
    return await apiHelper('PUT', `/update/${id}`, data)
}

export async function deleteUser(id){
    return await apiHelper('DELETE', `/delete/${id}`)
}