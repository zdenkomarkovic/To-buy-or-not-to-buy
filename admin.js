import { getUser, getCategories, deleteCategory } from './src.js';

const search = window.location.search;
const parts = search.split('=');
const id = parts[1];

async function loadData() {
  const user = await getUser(id);
  showUser(user);
  const categories = await getCategories();
  showCategories(categories);
}
const container1 = document.getElementById('container1');
function showUser(user) {
  const name = document.createElement('h1');
  name.innerHTML = `${user.firstName} ${user.lastName} - administrator`;
  container1.appendChild(name);

  const list = document.createElement('ul');
  container1.appendChild(list);

  const line1 = document.createElement('li');
  line1.innerHTML = `Address: ${user.address}`;
  list.appendChild(line1);

  const line2 = document.createElement('li');
  line2.innerHTML = `Phone number: ${user.phoneNumber}`;
  list.appendChild(line2);

  let word = 'Male';
  if (user.gender == 'F') word = 'Female';
  const line3 = document.createElement('li');
  line3.innerHTML = `Gender: ${word}`;
  list.appendChild(line3);
}
const container2 = document.getElementById('container2');

function showCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    const divCategory = document.createElement('div');
    divCategory.id = i;
    divCategory.className = 'div-category';
    container2.appendChild(divCategory);

    const categoryTitle = document.createElement('h3');
    categoryTitle.innerHTML = categories[i].name;
    divCategory.appendChild(categoryTitle);

    const image = document.createElement('img');
    image.src = categories[i].image;
    image.style.width = '270px';
    image.style.height = '270px';
    image.style.display = 'block';
    divCategory.appendChild(image);

    const btnUpdate = document.createElement('button');
    btnUpdate.className = 'button-admin';
    btnUpdate.innerHTML = 'Update Category';
    btnUpdate.onclick = updateCat;
    divCategory.appendChild(btnUpdate);

    const btnDelete = document.createElement('button');
    btnDelete.className = 'button-admin';
    btnDelete.innerHTML = 'Delete Category';
    btnDelete.onclick = deleteCat;
    divCategory.appendChild(btnDelete);

    function updateCat() {
      window.open(`category_edit?${categories[i].id}`, '_self');
    }

    async function deleteCat() {
      let popup = document.createElement('div');
      popup.className = 'popup';
      document.body.appendChild(popup);

      const message = document.createElement('p');
      message.innerHTML = 'To delete, insert "167".';
      popup.appendChild(message);

      const deleteInput = document.createElement('input');
      popup.appendChild(deleteInput);

      const cancelButton = document.createElement('button');
      cancelButton.innerHTML = 'Cancel';
      popup.appendChild(cancelButton);
      cancelButton.addEventListener('click', function () {
        popup.style.display = 'none';
      });

      const confirmButton = document.createElement('button');
      confirmButton.innerHTML = 'Delete';
      popup.appendChild(confirmButton);
      confirmButton.addEventListener('click', async function () {
        if (deleteInput.value === '167') {
          await deleteCategory(categories[i].id);
          document.getElementById(i).remove();
          popup.style.display = 'none';
        } else {
          alert('Pogrešan unos. Molimo pokušajte ponovo.');
        }
      });
    }
  }
}

window.addEventListener('load', loadData);
