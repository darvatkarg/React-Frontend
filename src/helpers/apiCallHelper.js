import apiHelper from "./apiHelper";

export async function register(data) {
  return await apiHelper("POST", "/register", data);
}

export async function login(data, headers) {
  return await apiHelper("POST", "/login", data, headers);
}

export async function logOut(header) {
  return await apiHelper("GET", "/logout", null, header);
}

export async function findAllUsers() {
  return await apiHelper("GET", "/findall");
}

// export async function findUserByID(id) {
//   return await apiHelper("GET", `/find/${id}`);
// }

export async function getUser(header) {
  return await apiHelper("GET", `/find`, null, header);
}

export async function updateUser(id, data) {
  return await apiHelper("PUT", `/update/${id}`, data);
}

export async function deleteUser(id) {
  return await apiHelper("DELETE", `/delete/${id}`);
}
