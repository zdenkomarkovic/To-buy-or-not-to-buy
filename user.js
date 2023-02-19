import { getUser, getAdByUserId, deleteAd, getCategories } from './src.js';

const search = window.location.search;
const parts = search.split('=');
const id = parts[1];

async function loadData() {
  const user = await getUser(id);
  showUser(user);
  const ads = await getAdByUserId(id);
  const categories = await getCategories();
  showAds(ads);
  showCategories(categories);
}

// prikaz kategorija

const select = document.getElementById('select-category');

async function showCategories(categories) {
  const user = await getUser(id);

  for (let i = 0; i < categories.length; i++) {
    const option2 = document.createElement('option');
    option2.innerHTML = categories[i].name;
    option2.value = categories[i].id;
    select.appendChild(option2);
    select.addEventListener('change', chooseCategory);
  }
  const option3 = document.createElement('option');
  option3.innerHTML = 'All categories';
  select.appendChild(option3);
}

// odabir kategorija

async function chooseCategory() {
  const ads = await getAdByUserId(id);
  const categoryId = document.getElementById('select-category').value;
  if (categoryId == 'All categories') {
    showAds(ads);
  } else {
    const filteredAds = ads.filter(ad => ad.categoryId == categoryId);
    showAds(filteredAds);
  }
}

// prikaz podataka korisnika

const name = document.getElementById('name');
const ul = document.getElementById('user-data');
const link = document.getElementById('link-add-ad');

function showUser(user) {
  link.href = `ad_add?${user.id}`;
  name.innerHTML = `${user.firstName} ${user.lastName}`;

  const li1 = document.createElement('li');
  li1.innerHTML = `Address: ${user.address}`;
  ul.appendChild(li1);

  const li2 = document.createElement('li');
  li2.innerHTML = `Phone number: ${user.phoneNumber}`;
  ul.appendChild(li2);

  let word = 'Male';
  if (user.gender == 'F') word = 'Female';
  const li3 = document.createElement('li');
  li3.innerHTML = `Gender: ${word}`;
  ul.appendChild(li3);
}

const table = document.getElementById('table-ad');
// prikaz oglasa

async function showAds(ads) {
  const categories = await getCategories();
  table.innerHTML = '';

  for (let i = 0; i < ads.length; i++) {
    const list = document.createElement('ul');
    const tr = document.createElement('tr');
    table.appendChild(tr);
    tr.id = i;

    const td1 = document.createElement('td');
    tr.appendChild(td1);
    td1.appendChild(list);

    const category = categories.find(cat => cat.id == ads[i].categoryId);

    const line1 = document.createElement('li');
    line1.innerHTML = `Category: ${category.name}`;
    list.appendChild(line1);

    const line2 = document.createElement('li');
    line2.innerHTML = `-- ${ads[i].title} --`;
    list.appendChild(line2);

    const line3 = document.createElement('li');
    line3.innerHTML = ads[i].description;
    list.appendChild(line3);

    const line4 = document.createElement('li');
    line4.innerHTML = `Price: ${ads[i].price}e`;
    list.appendChild(line4);

    const line5 = document.createElement('li');
    line5.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> ${ads[i].likes}`;
    list.appendChild(line5);

    const line6 = document.createElement('li');
    list.appendChild(line6);

    const btnDelete = document.createElement('button');
    btnDelete.innerHTML = 'Delete Ad';
    btnDelete.id = 'deleteButton';
    line6.appendChild(btnDelete);

    // popup prozor za brisanje oglasa

    btnDelete.addEventListener('click', function () {
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
          await deleteAd(ads[i].id);
          document.getElementById(i).remove();
          popup.style.display = 'none';
        } else {
          alert('Pogrešan unos. Molimo pokušajte ponovo.');
        }
      });
    });

    const line7 = document.createElement('li');
    list.appendChild(line7);

    const linkUpdate = document.createElement('a');
    linkUpdate.innerHTML = 'Update Ad';
    linkUpdate.href = `ad_edit?${ads[i].id}`;
    line7.appendChild(linkUpdate);

    const td2 = document.createElement('td');
    tr.appendChild(td2);

    const image = document.createElement('img');
    image.src = ads[i].image;
    image.style.width = '400px';
    image.style.height = '400px';
    td2.appendChild(image);
  }
}
window.addEventListener('load', loadData);
