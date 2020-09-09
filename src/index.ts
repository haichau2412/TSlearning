import { User } from './models/Users';

const user = new User({ id: 12 });

user.fetch();

user.on('change', () => {
  console.log('About to change a attribute');
});

declare global {
  interface Window {
    user: any;
  }
}

window.user = user;
