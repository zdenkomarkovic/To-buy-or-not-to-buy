import { createAd, getCategories } from './src.js';

const search = window.location.search;
const parts = search.split('?');
const userId = parts[1];

async function loadData() {
  const categories = await getCategories();

  showCategories(categories);
}
const select = document.getElementById('input-select');
const option1 = document.createElement('option');
option1.innerHTML = 'Choose category';
select.appendChild(option1);

function showCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    const option2 = document.createElement('option');
    option2.innerHTML = categories[i].name;
    option2.value = categories[i].id;
    select.appendChild(option2);
  }
}
const btnAdd = document.getElementById('ad-add');
btnAdd.addEventListener('click', adAdd);

async function adAdd() {
  const title = document.getElementById('input-title').value;
  const description = document.getElementById('input-description').value;
  const price = document.getElementById('input-price').value;
  const image = document.getElementById('input-image').value;
  const categoryId = document.getElementById('input-select').value;
  const likes = 0;
  if (
    title == '' ||
    description == '' ||
    price == '' ||
    image == '' ||
    categoryId == 'Choose category'
  ) {
    alert('PLEASE FILL IN ALL INPUTS!');
  } else {
    await createAd(title, description, price, image, likes, categoryId, userId);
    window.history.back();
  }
}

window.addEventListener('load', loadData);
