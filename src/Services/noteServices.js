import Axios from './axiosService'
const httpService = new Axios();

export default class noteServices {
  baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/"
  userNote = (data, token) => {
    return httpService.Post(`${this.baseUrl}notes/addNotes`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  getNote = (token) => {
    return httpService.GET(`${this.baseUrl}notes/getNotesList`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
  colorNote = (data, token) => {
    return httpService.Post(`${this.baseUrl}notes/changesColorNotes`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
  updateNote = (data, token) => {
    return httpService.Post(`${this.baseUrl}notes/updateNotes`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  archieveNote = (data, token) => {
    return httpService.Post(`${this.baseUrl}notes/archiveNotes`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
  trashNote = (data, token) => {
    return httpService.Post(`${this.baseUrl}notes/trashNotes`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
}