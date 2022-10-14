import httpClient from "./HttpClient";

const prefix = "/roles";

export default class RolService {
  static async createRol(rol) {
    return (await httpClient.post(`${prefix}`, rol)).data;
  }

  static async updateRol(rol) {
    return (await httpClient.put(`${prefix}/${rol.id}`, rol)).data;
  }

  static async deleteRol(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async getAllRoles() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getRolById(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
}
