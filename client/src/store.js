import { writable } from 'svelte/store';

export const user = writable({
  loggedIn: false,
  username: null,
  token: null
});

export const login = (username, token) => {
  user.update(u => {
    u.loggedIn = true;
    u.username = username;
    u.token = token;
    return u;
  });
};
