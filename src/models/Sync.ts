import axios, { AxiosPromise } from 'axios';
import { UserProps } from './Users';
interface HasID {
  id?: number;
}

export class Sync<T extends HasID> {
  constructor(public rootURL: string) {}

  fetch = (id: number | undefined): AxiosPromise<UserProps> => {
    return axios.get(`${this.rootURL}/${id}`);
  };

  save(data: T): AxiosPromise<UserProps> {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootURL}/${id}`, data);
    } else {
      return axios.post(this.rootURL, data);
    }
  }
}
