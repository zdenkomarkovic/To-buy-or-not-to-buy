import { getAds, getUser, getCategories } from './src.js';

let ads;
let categoryId;
// const search = window.location.search;
// const parts = search.split('?');
// categoryId = parts[1];
// if (categoryId == undefined) categoryId = 'All categories';

async function loadData() {
  const ads = await getAds();
  const categories = await getCategories();
  showAds(ads);
  showCategories(categories);
  // chooseCategory();
}

const container1 = $('#container1');
const select = $('#select-category');

function showCategories(categories) {
  const option = $('<option>').html('Choose category').appendTo(select);
  option.attr('value', 'All categories');

  const option1 = $('<option>').html('All categories').appendTo(select);

  for (let i = 0; i < categories.length; i++) {
    const option2 = $('<option>')
      .attr('value', categories[i].id)
      .html(categories[i].name)
      .appendTo(select);
  }
  select.on('input', function () {
    categoryId = $('#select-category').val();
    console.log(categoryId);
    chooseCategory();
  });
}

async function showAds(ads) {
  const categories = await getCategories();
  container1.html('');

  for (let i = 0; i < ads.length; i++) {
    const divAds = $('<div>').attr('class', 'div-ads');
    divAds.appendTo(container1);

    const divPicture = $('<div>').attr('class', 'div-picture div-event');
    divPicture.appendTo(divAds);
    divPicture.on('click', function () {
      window.location.href = `ad_info?${ads[i].id}`;
    });

    const image = $('<img>').attr({
      src: ads[i].image,
      width: '250px',
      height: '250px',
    });
    image.appendTo(divPicture);

    const divTitle = $('<div>').attr('class', 'div-title div-event');
    divTitle.appendTo(divAds);
    divTitle.on('click', function () {
      window.location.href = `ad_info?${ads[i].id}`;
    });

    const h3 = $('<h2>');
    h3.html(`<b>${ads[i].title}</b>`);
    h3.appendTo(divTitle);

    const divList = $('<div>').attr('class', 'div-list div-event');
    divList.appendTo(divAds);
    divList.on('click', function () {
      window.location.href = `ad_info?${ads[i].id}`;
    });

    const list = $('<ul>');
    list.appendTo(divList);

    const category = categories.find(cat => cat.id == ads[i].categoryId);

    const line1 = $('<li>');
    line1.html(`Category: ${category.name}`);
    line1.appendTo(list);

    const line2 = $('<li>');
    line2.html(ads[i].description);
    line2.appendTo(list);

    const line3 = $('<li>');
    line3.html(`<i class="fa-regular fa-thumbs-up"></i> ${ads[i].likes}`);
    line3.appendTo(list);

    const divUser = $('<div>').attr('class', 'div-user div-event');
    divUser.appendTo(divAds);
    divUser.on('click', function () {
      window.location.href = `ad_info?${ads[i].id}`;
    });

    const user = await getUser(ads[i].userId);

    const nameUser = $(`<h4>User: ${user.firstName} ${user.lastName}.</h4>`);
    nameUser.appendTo(divUser);

    const adPrice = $(`<h3>Price: <b>${ads[i].price}e</b></h3>`);
    adPrice.appendTo(divUser);
  }
}

async function chooseCategory() {
  const ads = await getAds();
  // const categoryId = $('#select-category').val();
  if (categoryId == 'All categories') {
    showAds(ads);
  } else {
    const filteredAds = ads.filter(ad => ad.categoryId == categoryId);
    showAds(filteredAds);
  }
}
const btnSearch = $('#btnSearch').on('click', filteredByPrice);

async function filteredByPrice() {
  const priceMin = Number($('#min-price').val());
  const priceMax = Number($('#max-price').val());
  if ((priceMin != '') & (priceMax != '')) {
    ads = await getAds();

    const filteredPrice = ads.filter(
      ad => (ad.price > priceMin) & (ad.price < priceMax)
    );
    showAds(filteredPrice);
  }
}

const inputSearch = $('#input-search').on('input', function (event) {
  const searchTerm = $(event.target).val().toLowerCase();
  const divs = $('.div-ads');

  divs.each(function () {
    const title = $(this).find('h2').text().toLowerCase();
    if (title.includes(searchTerm)) {
      $(this).css('display', 'block');
    } else {
      $(this).css('display', 'none');
    }
  });
});
window.addEventListener('load', loadData);
