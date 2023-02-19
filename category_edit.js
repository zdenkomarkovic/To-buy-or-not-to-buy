import { getCategory, updateCategory } from './src.js';

const search = window.location.search;
const parts = search.split('?');
const id = parts[1];
console.log(id);
async function loadData() {
  const category = await getCategory(id);
  console.log(category);
  document.getElementById('input-category').value = category.name;
  document.getElementById('input-image').value = category.image;
}

const btnUpdate = document.getElementById('button-update');
btnUpdate.onclick = update;
async function update() {
  const name = document.getElementById('input-category').value;
  const image = document.getElementById('input-image').value;
  if (name == '' || image == '') {
    alert('PLEASE FILL IN ALL INPUTS!');
  } else {
    await updateCategory(id, name, image);
    window.history.back();
  }
}
const btnBack = document.getElementById('button-back');
btnBack.addEventListener('click', function () {
  window.history.back();
});
window.addEventListener('load', loadData);
