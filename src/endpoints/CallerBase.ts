import axios, { Axios } from 'axios';

class CallerBase {
  protected readonly axios: Axios;
  protected readonly baseURL: string;

  constructor(serverSide: boolean = false, token: string = '') {
    this.axios = axios;

    this.baseURL = 'https://api.shebausait.com';
    // this.baseURL = 'http://localhost:8080';

    // TODO this header on the server
    this.axios.defaults.headers.common.Authorization = serverSide
      ? token
      : `Bearer ${localStorage.getItem('token')}`;
  }

  multipart() {
    this.axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  }
}

export default CallerBase;
