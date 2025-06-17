
  // Отримати інфу про користувача
  fetch('http://localhost:8080/api/v1/auth/register', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('username').textContent = data.username;
    document.getElementById('email').textContent = data.email;
    document.getElementById('phone').textContent = data.phoneNumber;
    document.getElementById('typeUser').textContent = data.typeUser;
    document.getElementById('role').textContent = data.role;
    document.getElementById('isVerified').textContent = data.verified ? 'Так' : 'Ні';
  });

  // Завантажити улюблені
  fetch('https://sunback-production.up.railway.app/api/v1/properties/favorites', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(properties => renderFavorites(properties))
  .catch(err => console.error('Помилка при завантаженні обраного:', err));

  function renderFavorites(properties) {
    const list = document.getElementById('favorites-list');
    list.innerHTML = '';

    if (properties.length === 0) {
      list.innerHTML = '<p style="text-align:center;">У вас ще немає обраного житла.</p>';
      return;
    }

    properties.forEach(property => {
      const item = document.createElement('li');
      item.classList.add('car-card');

      item.innerHTML = `
        <img class="car-image" src="${property.imageUrl || './resources/Asset 1house_img.png'}" alt="image">
        <h3 class="car-title">${property.title || 'Нерухомість'}</h3>
        <p class="car-type">Кімнат: ${property.rooms}</p>
        <p class="car-mileage">Площа: ${property.area} м²</p>
        <p class="car-capacity">Поверх: ${property.floor}</p>
        <p class="car-fuel">Тип угоди: ${property.dealType}</p>
        <p class="car-price">${property.price}$</p>
      `;

      list.appendChild(item);
    });
  }

