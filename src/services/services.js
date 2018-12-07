import 'babel-polyfill'
import axios from '../axios/axios-todo'

export default class Service {
  getResource = async (url) => {
    const res = await axios.get(url);
    if (res.statusText !== "OK") {
      throw new (Error)(`Could not fetch ${url}, reseived ${res.statusText}`)
    }
    return await res;
  }

  postResource = async (url, params) => {
    const res = await axios.post(url, params);
    if (res.statusText !== "Created") {
      throw new (Error)(`Could not fetch ${url}, reseived ${res.statusText}`)
    }
    return await res;
  }

  todos = async () => {
    const res = await this.getResource('/todos')
    return res.data
  }

  toggleDone = async (id, params) => {
    const res = await this.postResource(`/tdone/${id}`, params)
    return res.data
  }

  toggleImportant = async (id, params) => {
    const res = await this.postResource(`/tinportant/${id}`, params)
    return res.data
  }
}