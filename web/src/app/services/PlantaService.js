import httpClient from "./HttpClient";

const prefix = "/plantas";

export default class PlantaService {
  static async createPlanta(planta) {
    return (await httpClient.post(`${prefix}`, planta)).data;
  }

  static async updatePlanta(planta) {
    return (await httpClient.put(`${prefix}/${planta.id}`, planta)).data;
  }

  static async deletePlanta(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async getAllPlantas() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async getPlantaById(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }
}
