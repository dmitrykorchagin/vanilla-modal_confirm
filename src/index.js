import './base';
import './modal';
import './confirm';

import './css/modal.css';

let fruits = [
  {
    id: 1,
    title: 'Яблоки',
    price: 20,
    img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'
  },
  {
    id: 2,
    title: 'Апельсины',
    price: 30,
    img:
      'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'
  },
  {
    id: 3,
    title: 'Манго',
    price: 40,
    img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'
  }
];

const toHTML = fruit => `
  <div class="col">
    <div class="card">
      <img class="card-img-top" style="height: 300px;" src="${fruit.img}" alt="${fruit.title}">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
      </div>
    </div>
  </div>
`;

function render() {
  const html = fruits.map(toHTML).join('');
  document.querySelector('#fruits').innerHTML = html;
}

render();

const modal = $.modal({
  title: 'DK Modal',
  closable: true,
  content: `
    <p>Lorem ipsum dolor sit.</p>
    <p>Lorem ipsum dolor sit.</p>
  `,
  width: '400px',
  footerButtons: [
    {
      text: 'Ок',
      classes: 'btn-primary',
      handler() {
        modal.close();
      }
    },
    {
      text: 'Cancel',
      classes: 'btn-danger',
      handler() {
        modal.close();
      }
    }
  ]
});

const priceModal = $.modal({
  title: 'Price',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Ок',
      classes: 'btn-primary',
      handler() {
        priceModal.close();
      }
    }
  ]
});

document.addEventListener('click', event => {
  event.preventDefault();

  const btnType = event.target.dataset.btn;
  const id = Number(event.target.dataset.id);
  const fruit = fruits.find(f => f.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`
      <price:>Цена на ${fruit.title}: <strong>${fruit.price}</strong></p>
    `);
    priceModal.open();
  }
  if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Удалить <strong>${fruit.title}</strong>?</p>`
    })
      .then(() => {
        fruits = fruits.filter(f => f.id !== id);
        render();
      })
      .catch(() => {
        console.log('Cancel');
      });
  }
});
