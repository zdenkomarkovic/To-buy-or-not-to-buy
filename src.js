async function getUsers() {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'GET',
  });
  const users = await response.json();
  return users;
}

async function getUser(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'GET',
  });
  const users = await response.json();
  return users;
}
async function deleteUser(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE',
  });
  const users = await response.json();
  return users;
}
async function createUser(
  firstName,
  lastName,
  username,
  password,
  address,
  phoneNumber,
  gender,
  admin
) {
  const response = await fetch(`http://localhost:3000/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      address: address,
      phoneNumber: phoneNumber,
      gender: gender,
      admin: admin,
    }),
  });
  const user = await response.json();
  return user;
}
async function updateUser(id) {
  const response = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      address: address,
      phoneNumber: phoneNumber,
      gender: gender,
      admin: admin,
    }),
  });
  const user = await response.json();
  return user;
}

async function getUserByUsernameAndPassword(username, password) {
  const response = await fetch(
    `http://localhost:3000/users?username=${username}&password=${password}`,
    {
      method: 'GET',
    }
  );
  const user = await response.json();
  return user;
}

async function getCategories() {
  const response = await fetch(`http://localhost:3000/categories`, {
    method: 'GET',
  });
  const categories = await response.json();
  return categories;
}

async function getCategory(id) {
  const response = await fetch(`http://localhost:3000/categories/${id}`, {
    method: 'GET',
  });
  const category = await response.json();
  return category;
}

async function deleteCategory(id) {
  const response = await fetch(`http://localhost:3000/categories/${id}`, {
    method: 'DELETE',
  });
  const category = await response.json();
  return category;
}

async function createCategory(name, image) {
  const response = await fetch(`http://localhost:3000/categories`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      image: image,
    }),
  });
  const category = await response.json();
  return category;
}

async function updateCategory(id, name, image) {
  const response = await fetch(`http://localhost:3000/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      image: image,
    }),
  });
  const category = await response.json();
  return category;
}

async function getAds() {
  const response = await fetch(`http://localhost:3000/ads`, {
    method: 'GET',
  });
  const ads = response.json();
  return ads;
}

async function getAd(id) {
  const response = await fetch(`http://localhost:3000/ads/${id}`, {
    method: 'GET',
  });
  const ad = response.json();
  return ad;
}

async function deleteAd(id) {
  const response = await fetch(`http://localhost:3000/ads/${id}`, {
    method: 'DELETE',
  });
  const ad = response.json();
  return ad;
}

async function createAd(
  title,
  description,
  price,
  image,
  likes,
  categoryId,
  userId
) {
  const response = await fetch(`http://localhost:3000/ads`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
      image: image,
      likes: likes,
      categoryId: categoryId,
      userId: userId,
    }),
  });
  const ad = response.json();
  return ad;
}

async function updateAd(
  id,
  title,
  description,
  price,
  image,
  likes,
  categoryId,
  userId
) {
  const response = await fetch(`http://localhost:3000/ads/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
      image: image,
      likes: likes,
      categoryId: categoryId,
      userId: userId,
    }),
  });
  const ad = response.json();
  return ad;
}

async function getAdByUserId(userId) {
  const response = await fetch(`http://localhost:3000/ads?userId=${userId}`, {
    method: 'GET',
  });
  const ad = response.json();
  return ad;
}

async function getComments(adId) {
  const response = await fetch(`http://localhost:3000/comments?adId=${adId}`, {
    method: 'GET',
  });
  const comments = response.json();
  return comments;
}

async function postComment(text, adId) {
  const response = await fetch(`http://localhost:3000/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
      adId: adId,
    }),
  });
  const comment = response.json();
  return comment;
}

export {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  getUserByUsernameAndPassword,
  getCategories,
  getCategory,
  deleteCategory,
  createCategory,
  updateCategory,
  getAds,
  getAd,
  deleteAd,
  createAd,
  updateAd,
  getAdByUserId,
  getComments,
  postComment,
};
