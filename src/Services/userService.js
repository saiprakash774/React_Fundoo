import Axios from './axiosService'
const httpService = new Axios();
export default class userService {
  baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/"
  login = (data) => {
    return httpService.Post(`${this.baseUrl}user/login`, data);
  }
  registration = (data) => {
    return httpService.Post(`${this.baseUrl}user/userSignUp`, data);
  }
  reset = (data) => {
    return httpService.Post(`${this.baseUrl}user/reset`, data);
  }
  resetpassword = (data, token) => {
    return httpService.Post(`${this.baseUrl}user/reset-password`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
}