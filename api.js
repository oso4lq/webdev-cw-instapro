// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod

import { setPosts } from "./index.js";

const personalKey = "oso4";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("No authorisation");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
};

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("This username is already taken");
    }
    return response.json();
  });
};

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Incorrect login or password");
    }
    return response.json();
  });
};

// Add image to the server, returns URL
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
};

export const addPost = ({ token, imageUrl }) => {
  const commentInputElement = document.getElementById('description')
  return fetch(postsHost, {
    method: 'POST',
    body: JSON.stringify({
      description: commentInputElement.value,
      imageUrl,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 400) {
      alert('No photo or description')
    } else {
      return response.json()
    }
  })
};

export const getUserPosts = ({ token, userId }) => {
  return fetch(`${postsHost}/user-posts/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error('No authorisation')
      }
      return response.json()
    })
    .then((data) => {
      setPosts(data.posts)
      return data.posts
    })
    .catch((error) => {
      alert('No internet connection. Try again later')
      console.warn(error)
    })
};

export const addLike = ({ token, postId }) => {
  return fetch(`${postsHost}/${postId}/like`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 401) {
      alert('Log in to like posts')
      throw new Error('No authorisation')
    };
    return response.json()
  })
};

export const removeLike = ({ token, postId }) => {
  return fetch(`${postsHost}/${postId}/dislike`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 401) {
      alert('Log in to unlike posts')
      throw new Error('No authorisation')
    };
    return response.json()
  })
};