import { getAd, getUser, getComments, postComment, updateAd } from './src.js';

const page = window.location.search;
const parts = page.split('?');
const id = parts[1];

async function loadData() {
  const ad = await getAd(id);
  showAd(ad);
  const comments = await getComments(id);
  showComents(comments);
}

const image = document.getElementById('ad-info-image');
const ul1 = document.getElementById('ul-ad-info1');
const ul2 = document.getElementById('ul-ad-info2');
const textarea = document.getElementById('textarea-ad-edit');
const btnComent = document.getElementById('btn-ad-info');
const divComent = document.getElementById('div-coment-ad-info');

async function showAd(ad) {
  ul1.innerHTML = '';
  ul2.innerHTML = '';

  image.src = ad.image;

  const line11 = document.createElement('li');
  line11.innerHTML = `<h2>${ad.title} - ${ad.price}e</h2>`;
  ul1.appendChild(line11);

  const line12 = document.createElement('li');
  line12.innerHTML = ad.description;
  ul1.appendChild(line12);

  const line13 = document.createElement('li');
  line13.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> ${ad.likes}`;
  ul1.appendChild(line13);
  line13.onclick = update;

  async function update() {
    const title = ad.title;
    const description = ad.description;
    const price = ad.price;
    const image = ad.image;
    const likes = ad.likes + 1;
    const categoryId = ad.categoryId;
    const userId = ad.userId;

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
    loadData();
  }

  const user = await getUser(ad.userId);

  const line21 = document.createElement('li');
  line21.innerHTML = `<i class="fa-solid fa-phone"></i>  ${user.firstName} ${user.lastName}`;
  ul2.appendChild(line21);
  const line22 = document.createElement('li');
  ul2.appendChild(line22);
  line21.addEventListener('click', function () {
    line22.innerHTML = user.phoneNumber;
  });

  const line23 = document.createElement('li');
  ul2.appendChild(line23);

  line23.appendChild(textarea);

  const line24 = document.createElement('li');
  ul2.appendChild(line24);
  line24.appendChild(btnComent);

  btnComent.addEventListener('click', function () {
    const text = textarea.value;
    const adId = id;
    if (text != '') {
      postComment(text, adId);
      textarea.value = '';

      loadData();
    }
  });
}

function showComents(comments) {
  divComent.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const divText = document.createElement('div');
    divText.className = 'div-text-ad-info';
    divComent.appendChild(divText);
    const text = document.createElement('p');
    text.innerHTML = comments[i].text;
    divText.appendChild(text);
  }
}

let zoom = true;
image.addEventListener('click', function () {
  if (zoom) {
    image.classList.add('fullscreen-image');
    zoom = false;
  } else {
    image.classList.remove('fullscreen-image');
    zoom = true;
  }
});

window.addEventListener('load', loadData);
