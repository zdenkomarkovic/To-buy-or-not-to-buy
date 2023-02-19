import { createCategory } from './src.js';

const btnAdd = document.getElementById('button-add');
btnAdd.onclick = addCategory;
async function addCategory() {
  const name = document.getElementById('input-category').value;
  const image = document.getElementById('input-image').value;
  if (name == '' || image == '') {
    alert('PLEASE FILL IN ALL INPUTS!');
  } else {
    await createCategory(name, image);
    window.history.back();
  }
}
const btnBack = document.getElementById('button-back');
btnBack.addEventListener('click', function () {
  window.history.back();
});
