let cars = [];
let makes = [];
let models = [];
let conditions = [];

document.addEventListener('DOMContentLoaded', async () => {
  console.log("📦 DOM повністю завантажено");

  const container = document.querySelector(".js-list");
  container.innerHTML = `<div class="loading">Завантаження...</div>`;

  try {
    const response = await fetch('./response.json');
    if (!response.ok) throw new Error("❌ Неможливо завантажити response.json");

    const response_json = await response.json();
    cars = response_json.cars || [];

    container.innerHTML = createMarkup(cars);

    makes = [...new Set(cars.map(c => c.car))];
    models = [...new Set(cars.map(c => c.type))];
    conditions = [...new Set(cars.map(c => c.condition))];

    populateSelect('makes-select', makes);
    populateSelect('models-select', models);
    populateSelect('condition-select', conditions);

    populateSelect('makes-select-add', makes);
    populateSelect('models-select-add', models);
    populateSelect('fuel-types-select', conditions);

  } catch (err) {
    console.error("🚨 Помилка при завантаженні оголошень:", err);
    container.innerHTML = `<div class="error">Не вдалося завантажити дані</div>`;
  }

  const searchForm = document.querySelector(".car-search");
  if (searchForm) {
    console.log("🔍 Пошук активовано");
    searchForm.addEventListener("submit", handleSearch);
  }

  const welcomeForm = document.querySelector("#login-form");
  if (welcomeForm) {
    console.log("👤 Форма входу активна");
    welcomeForm.addEventListener("submit", handleWelcome);
  }

  const menuIcon = document.getElementById('menu-icon');
  const menu = document.getElementById('large-menu');
  if (menuIcon && menu) {
    menuIcon.addEventListener('click', () => {
      menu.classList.toggle('show');
      menu.classList.toggle('hide');
    });
  }

  if (sessionStorage.getItem("sessionExpired")) {
    const loginMessage = document.getElementById("login-message");
    if (loginMessage) loginMessage.textContent = "Сесію завершено. Увійдіть повторно.";
    sessionStorage.removeItem("sessionExpired");

    const loginModal = document.getElementById("login-modal");
    if (loginModal) loginModal.style.display = "flex";
  }
});

function createMarkup(arr) {
  return arr.map(item => `
    <li class="car-card" data-id="${item.id}">
      <a href="car-details.html?id=${item.id}">
        <img src="${item.img}" alt="${item.car} — ${item.type}" class="car-image">
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
  `).join("");
}

function populateSelect(selectId, options) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = '';
  select.appendChild(new Option("-Вибір-", ""));

  options.forEach(option => {
    select.appendChild(new Option(option));
  });
}

function handleSearch(event) {
  event.preventDefault();
  console.log("🔎 Відправка пошуку");

  const elements = event.target.elements;
  const make = elements.make?.value || '';
  const model = elements.model?.value || '';
  const maxArea = elements['engine-volume']?.value || '';
  const maxFloor = elements.floor?.value || '';
  const condition = elements.condition?.value || '';
  const offerType = elements.offer_type?.value || '';

  const result = cars.filter(car => {
    return (!make || car.car.toLowerCase().includes(make.toLowerCase())) &&
           (!model || car.type.toLowerCase().includes(model.toLowerCase())) &&
           (!maxArea || car.area <= parseInt(maxArea)) &&
           (!maxFloor || car.floor <= parseInt(maxFloor)) &&
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
  console.log("🔐 Вхід виконано");

  const name = event.target.username?.value || "Гість";
  const user = document.getElementById('user');
  if (user) {
    user.textContent = `Ви ввійшли як: ${name}`;
  }

  const modal = document.getElementById("login-modal");
  if (modal) modal.style.display = "none";
}

