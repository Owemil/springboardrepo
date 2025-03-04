import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PetlyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PetlyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers }));
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes


  // get user by username
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.data.user;
  }


  // handle authentication for login and sign up
  static async handleAuth(route, data = {}, method = 'post') {
    let res = await this.request(route, data, method);
    return res.data.token;

  }
  // update the user profile
  static async updateUser(route, data = {}, method = 'patch') {
    let res = await this.request(route, data, method);
    return res.data;

  }

  static async addFavPet(username, pet, method = 'post') {
    const data = {
      petName: pet.petName,
      petPic: pet.petPic
    }
    let res = await this.request(`users/${username}/favorites/pets/${pet.petId}`, data, method)
    return res
  }

  static async removeFavPet(username, id, method = 'delete') {
    const data = {}
    let res = await this.request(`users/${username}/favorites/pets/${id}`, data, method)
    return res
  }

  static async addFavOrg(username, org, method = 'post') {

    let res = await this.request(`users/${username}/favorites/orgs/${org.orgId}`, org, method)
    return res
  }

  static async removeFavOrg(username, id, method = 'delete') {
    const data = {}
    let res = await this.request(`users/${username}/favorites/orgs/${id}`, data, method)
    return res
  }



}



export default PetlyApi