import { getCategories } from './src.js';

async function loadData() {
  const categories = await getCategories();
  showCategories(categories);
}
const container = document.getElementById('container');

function showCategories(categories) {
  for (let i = 0; i < categories.length; i++) {
    const divCategory = document.createElement('div');
    divCategory.className = 'div-category';
    container.appendChild(divCategory);
    divCategory.addEventListener('click', function () {
      window.open(`ads.html`, '_self');
    });

    const categoryName = document.createElement('h3');
    categoryName.innerHTML = categories[i].name;
    divCategory.appendChild(categoryName);

    const image = document.createElement('img');
    image.src = categories[i].image;
    image.style.width = '280px';
    image.style.height = '280px';
    divCategory.appendChild(image);
  }
}

window.addEventListener('load', loadData);
