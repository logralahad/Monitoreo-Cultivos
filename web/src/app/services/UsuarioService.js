import httpClient from "./HttpClient";

const prefix = "/users";

export default class UsuarioService {
  static async createUser(user) {
    return (await httpClient.post(`${prefix}`, user)).data;
  }

  static async updateUser(user) {
    return (await httpClient.put(`${prefix}/${user.id}`, user)).data;
  }

  static async deleteUser(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async login(user) {
    return (await httpClient.post(`${prefix}/login`, user)).data;
  }

  static async getAllUsers() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getById(id) {
    return (await httpClient.get(`${prefix}/getById/${id}`)).data;
  }

  static async getByRol(rol) {
    return (await httpClient.get(`${prefix}/getByRol/${rol}`)).data;
  }
}
