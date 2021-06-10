const URL = "https://collins-fitness-trackr.herokuapp.com/api/";

export function registerUser({ username, password }) {
  return fetch(URL + "users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error.response.data);
    });
}

export function userLogin({ username, password }) {
  return fetch(URL + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error.response.data);
    });
}
