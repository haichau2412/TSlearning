import { Event } from './Event';
import { Sync } from './Sync';
import { Attribute } from './Attribute';

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const url = 'http://localhost:3000/users';

export class User {
  private events: Event = new Event();
  private sync: Sync<UserProps> = new Sync(url);
  private attr: Attribute<UserProps>;

  constructor(attrs: UserProps) {
    this.attr = new Attribute(attrs);
  }

  async fetch(): Promise<UserProps> {
    const id = this.attr.get('id');
    if (!id) {
      return {};
    }
    return this.sync.fetch(id).then((resp) => {
      if (resp.status === 200) {
        this.attr.set(resp.data);
      }
      return resp.data;
    });
  }

  async save(): Promise<boolean> {
    const data = this.attr.getData();
    return this.sync.save(data).then((resp) => {
      if (resp.status === 200) {
        return true;
      }
      return false;
    });
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.on;
  }

  get get() {
    return this.attr.get;
  }

  get set() {
    this.events.trigger('change');
    return this.attr.set;
  }
}
