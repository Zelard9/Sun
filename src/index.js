const cast = [];
var makes = [];
var models = [];
var conditions = [];

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('./response.json');
  const response_json = await response.json();
  cars = response_json.cars;

  const form = document.querySelector(".js-form");
  const welcomeForm = document.querySelector(".welcome-form");
  const container = document.querySelector(".js-list");

  form.addEventListener("submit", handleSearch);
  welcomeForm.addEventListener("submit", handleWelcome);

  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "25px";
  container.innerHTML = createMarkup(cars);

  populateSelect('makes-select', makes);
  populateSelect('models-select', models);
  populateSelect('condition-select', conditions);

  const menuIcon = document.getElementById('menu-icon');
  const menu = document.getElementById('menu');

  var modal = document.getElementById("welcome-modal");
  var span = document.getElementsByClassName("close")[1];

  modal.style.display = "block";  

  span.onclick = function () {
    modal.style.display = "none";
  }

  menuIcon.addEventListener('click', () => {
    menu.classList.toggle('show');
    menu.classList.toggle('hide');
  });
});

function createMarkup(arr) {
  let array_makes = [];
  let array_models = [];
  let array_conditions = [];

  const list = arr.map(item => {
    array_makes.push(item.car);
    array_models.push(item.type);
    array_conditions.push(item.condition);

    return `
      <li class="car-card" data-id="${item.id}">
        <a href="car-details.html?id=${item.id}">
          <img src="${item.img}" alt="${item.type}" class="car-image">
          <h2 class="car-title">${item.car}</h2>
          <h3 class="car-type">${item.type}</h3>
         <h3><i class="fas fa-bed"></i> Кімнат: ${item.rooms}</h3>
         <h3><i class="fas fa-ruler-combined"></i> Площа: ${item.area} м²</h3>
         <h3><i class="fas fa-building"></i> Поверх: ${item.floor}</h3>
        <h3><i class="fas fa-tools"></i> Стан: ${item.condition}</h3>
        <h3><i class="fas fa-file-contract"></i> Тип угоди: ${item.offer_type}</h3>


          <span class="car-price">${item.price}$</span>
        </a>
      </li>
    `;
  }).join("");

  makes = [...new Set(array_makes)];
  models = [...new Set(array_models)];
  conditions = [...new Set(array_conditions)];

  return list;
}

function populateSelect(selectId, options) {
  const select = document.getElementById(selectId);
  select.appendChild(new Option("-Вибір-"));

  options.forEach(option => {
    select.appendChild(new Option(option));
  });
}

function handleSearch(event) {
  event.preventDefault();
  const elements = event.target.elements;

  const make = elements.make.value !== '-Вибір-' ? elements.make.value : '';
  const model = elements.model.value !== '-Вибір-' ? elements.model.value : '';
  const maxArea = elements.area.value;
  const maxFloor = elements.floor.value;
  const rooms = elements.rooms.value !== '-Вибір-' ? elements.rooms.value : '';
  const condition = elements.condition.value !== '-Вибір-' ? elements.condition.value : '';
  const offerType = elements.offer_type.value !== '-Вибір-' ? elements.offer_type.value : '';

  const result = cars.filter(car => {
    return (!make || car.car.toLowerCase().includes(make.toLowerCase())) &&
           (!model || car.type.toLowerCase().includes(model.toLowerCase())) &&
           (!maxArea || car.area <= parseInt(maxArea, 10)) &&
           (!maxFloor || car.floor <= parseInt(maxFloor, 10)) &&
           (!rooms || (rooms === "4+" ? car.rooms >= 4 : car.rooms == rooms)) &&
           (!condition || car.condition === condition) &&
           (!offerType || car.offer_type === offerType);
  });

  const container = document.querySelector(".js-list");

  container.innerHTML = result.length === 0
    ? `<div>Нічого не знайдено :(</div>`
    : createMarkup(result);
}

function handleWelcome(event) {
  event.preventDefault();

  let name = event.target.name.value;
  let user = document.getElementById('user');
  var modal = document.getElementById("welcome-modal");

  user.textContent = `Ви ввійшли як, ${name}`;
  modal.style.display = "none";

}


