const cast = [];
var makes = [];
var models = [];
var fuel_types = [];

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('./response.json')
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
  container.insertAdjacentHTML("beforeend", createMarkup(cars));

  populateSelect('makes-select', makes);
  populateSelect('models-select', models);
  populateSelect('fuel-types-select', fuel_types);

  const menuIcon = document.getElementById('menu-icon');
  const menu = document.getElementById('menu');

  var modal = document.getElementById("welcome-modal");
  var span = document.getElementsByClassName("close")[1];

  modal.style.display = "block";  

  span.onclick = function() {
    modal.style.display = "none";
  }

  menuIcon.addEventListener('click', () => {
    if (menu.classList.contains('show')) {
      menu.classList.remove('show');
      menu.classList.add('hide');
    } else {
      menu.classList.remove('hide');
      menu.classList.add('show');
    }
  });
})

function createMarkup(arr) {
  var array_makes = [];
  var array_models = [];
  var array_fuel_types = [];

  const list = arr.map(item => {
    array_makes.push(item.car);
    array_models.push(item.type);
    array_fuel_types.push(item.fuel);

    return `
      <li class="car-card" data-id="${item.id}">
        <a href="car-details.html?id=${item.id}">
          <img src="${item.img}" alt="${item.type}" class="car-image">
          <h2 class="car-title">${item.car}</h2>
          <h3 class="car-type">${item.type}</h3>
          <h3 class="car-mileage">${item.mileage}км</h3>
          <h3 class="car-capacity"> Об'єм двигуна: ${item.capacity}</h3>
          <h3 class="car-fuel">Тип палива: ${item.fuel}</h3>
          <span class="car-price">${item.price}$</span>
        </a>
      </li>
    `;
  }).join("");

  makes = [...new Set(array_makes)];
  models = [...new Set(array_models)];
  fuel_types = [...new Set(array_fuel_types)];

  return list;
}


function populateSelect(selectId, options) {
  const select = document.getElementById(selectId);
  select.appendChild(new Option("-Вибір-"));

  options.map(option => {
    select.appendChild(new Option(option));
  });
}

function handleSearch(event) {
  event.preventDefault();

  const elements = event.target.elements;
  const make = elements.make.value == '-Місто-' ? '' : elements.make.value;
  const model = elements.model.value == '-Район-' ? '' : elements.model.value;
  const mileage = elements.mileage.value;
  const engineVolume = elements.engine_volume.value;
  const fuelType = elements.fuel.value == '-Купівля/оренда-' ? '' : elements.fuel.value ;
  
  const result = cars       
                  .filter(car => {
                    return (!make || car.car.toLowerCase().includes(make.toLowerCase())) &&
                          (!model || car.type.toLowerCase().includes(model.toLowerCase())) &&
                          (!mileage || car.mileage <= parseInt(mileage, 10)) &&
                          (!engineVolume || car.capacity == parseFloat(engineVolume)) &&
                          (!fuelType || car.fuel.toLowerCase().includes(fuelType.toLowerCase()));
                  });
  const container = document.querySelector(".js-list");

  if (result.length === 0) {
    container.innerHTML = `<div>Нічого не знайдено :(</div>`;
  } else {
    container.innerHTML = createMarkup(result);
  }
}

function handleWelcome(event) {
  event.preventDefault();

  let name = event.target.name.value;
  let user = document.getElementById('user');
  var modal = document.getElementById("welcome-modal");

  user.textContent = `Привіт, ${name}!`;
  modal.style.display = "none";
}

async function createCar() {

}
