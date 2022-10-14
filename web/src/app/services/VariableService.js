import httpClient from "./HttpClient";

const prefix = "/variables";

export default class VariableService {
  static async createVariable(variable) {
    return (await httpClient.post(`${prefix}`, variable)).data;
  }

  static async updateVariable(variable) {
    return (await httpClient.put(`${prefix}/${variable.id}`, variable)).data;
  }

  static async deleteVariable(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async getAllVariables() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getAllByPlanta(planta) {
    return (await httpClient.get(`${prefix}//${planta}`)).data;
  }

  static async getOneRegistro(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
}
