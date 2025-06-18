document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("accessToken");
  
    sessionStorage.setItem("sessionExpired", "true");
window.location.href = "./index.html";

    // ⛔ Якщо токена немає — редирект на головну з повідомленням
    if (!token) {
      sessionStorage.setItem("sessionExpired", "true");
      window.location.href = "./index.html";
      return;
    }
  
    // ✅ Завантаження профілю
    fetch("http://localhost:8080/api/v1/auth/profile", {
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Помилка авторизації. Спробуйте увійти ще раз.");
        }
        return res.json();
      })
      .then(data => {
        document.getElementById("username").textContent = data.username || "-";
        document.getElementById("email").textContent = data.email || "-";
        document.getElementById("phone").textContent = data.phoneNumber || "-";
        document.getElementById("typeUser").textContent = data.typeUser || "-";
        document.getElementById("role").textContent = data.role || "-";
        document.getElementById("isVerified").textContent = data.verified ? "Так" : "Ні";
      })
      .catch(err => {
        console.error("❌ Помилка при завантаженні профілю:", err);
        localStorage.removeItem("accessToken");
        sessionStorage.setItem("sessionExpired", "true");
        window.location.href = "./index.html";
      });
  
    // ✅ Завантаження обраного житла
    fetch("http://localhost:8080/api/v1/properties/favorites", {
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Помилка отримання обраного.");
        return res.json();
      })
      .then(properties => renderFavorites(properties))
      .catch(err => {
        console.error("⚠️ Помилка при завантаженні обраного:", err);
      });
  
    function renderFavorites(properties) {
      const list = document.getElementById("favorites-list");
      list.innerHTML = "";
  
      if (!properties.length) {
        list.innerHTML = '<p style="text-align:center;">У вас ще немає обраного житла.</p>';
        return;
      }
  
      properties.forEach(property => {
        const item = document.createElement("li");
        item.classList.add("car-card");
  
        item.innerHTML = `
          <img class="car-image" src="${property.imageUrl || './resources/Asset 1house_img.png'}" alt="image">
          <h3 class="car-title">${property.title || 'Нерухомість'}</h3>
          <p class="car-type">Кімнат: ${property.rooms || '-'}</p>
          <p class="car-mileage">Площа: ${property.area || '-'} м²</p>
          <p class="car-capacity">Поверх: ${property.floor || '-'}</p>
          <p class="car-fuel">Тип угоди: ${property.dealType || '-'}</p>
          <p class="car-price">${property.price ? property.price + '$' : '-'}</p>
        `;
  
        list.appendChild(item);
      });
    }
  });
  