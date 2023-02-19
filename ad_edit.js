import { updateAd, getAd, getCategories } from './src.js';

const search = window.location.search;
const parts = search.split('?');
const id = parts[1];
let likes;
let userId;

async function loadData() {
  const categories = await getCategories();
  showCategories(categories);
  const ad = await getAd(id);
  document.getElementById('input-title').value = ad.title;
  document.getElementById('input-description').value = ad.description;
  document.getElementById('input-price').value = ad.price;
  document.getElementById('input-image').value = ad.image;
  document.getElementById('input-select').value = ad.categoryId;
  likes = ad.likes;
  userId = ad.userId;
}

const select = document.getElementById('input-select');

function showCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    const option2 = document.createElement('option');
    option2.innerHTML = categories[i].name;
    option2.value = categories[i].id;
    select.appendChild(option2);
  }
}

const btnUpdate = document.getElementById('button-update');
btnUpdate.addEventListener('click', update);

async function update() {
  const title = document.getElementById('input-title').value;
  const description = document.getElementById('input-description').value;
  const price = document.getElementById('input-price').value;
  const image = document.getElementById('input-image').value;
  const categoryId = document.getElementById('input-select').value;

  if (title == '' || description == '' || price == '' || image == '') {
    alert('PLEASE FILL IN ALL INPUTS!');
  } else {
    await updateAd(
      id,
      title,
      description,
      price,
      image,
      likes,
      categoryId,
      userId
    );
    window.history.back();
  }
}

window.addEventListener('load', loadData);
