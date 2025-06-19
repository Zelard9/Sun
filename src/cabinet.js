/*document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      console.warn("🚫 Токен не знайдено. Ніякого редиректу не буде.");
      sessionStorage.setItem("sessionExpired", "true");
      return;
    }
  
    console.log("🔐 Є токен: ", token);
  
    // ✅ Завантаження профілю
    fetch("http://localhost:8080/api/v1/auth/profile", {
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("⛔ Помилка авторизації. Status: " + res.status);
        return res.json();
      })
      .then(data => {
        console.log("✅ Профіль завантажено:", data);
        document.getElementById("username").textContent = data.username || "-";
        document.getElementById("email").textContent = data.email || "-";
        document.getElementById("phone").textContent = data.phoneNumber || "-";
        document.getElementById("typeUser").textContent = data.typeUser || "-";
        document.getElementById("role").textContent = data.role || "-";
        document.getElementById("isVerified").textContent = data.verified ? "Так" : "Ні";
      })
      .catch(err => {
        console.error("❌ AUTH ERROR:", err.message);
        localStorage.removeItem("accessToken");
        sessionStorage.setItem("sessionExpired", "true");
        window.location.href = "./index.html";
      });
  
    // ✅ Завантаження обраного
    fetch("http://localhost:8080/api/v1/properties/favorites", {
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Помилка отримання обраного: " + res.status);
        return res.json();
      })
      .then(renderFavorites)
      .catch(err => {
        console.error("⚠️ ПОМИЛКА ОТРИМАННЯ ОБРАНОГО:", err.message);
      });
  
    function renderFavorites(properties) {
      const list = document.getElementById("favorites-list");
      if (!list) return;
  
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
  
    // 🧹 Перевірка та обробка кнопки виходу
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        window.location.href = "./index.html";
      });
    } else {
      console.warn("⚠️ Кнопку виходу (#logout-btn) не знайдено в DOM.");
    }
  });
  */
//   document.addEventListener("DOMContentLoaded", () => {
//     const token = localStorage.getItem("accessToken");
  
//     if (!token) {
//       console.warn("🚫 Токен не знайдено. Перенаправлення на головну.");
//       sessionStorage.setItem("sessionExpired", "true");
//       window.location.href = "./index.html";
//       return;
//     }
  
//     console.log("🔐 Отримано токен:", token);
  
//     // 1. Завантаження профілю користувача
//     fetch("http://localhost:8080/api/v1/auth/profile", {
//       headers: {
//         "Authorization": "Bearer " + token,
//         "Content-Type": "application/json"
//       }
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("⛔ Помилка авторизації. Status: " + res.status);
//         return res.json();
//       })
//       .then(data => {
//         console.log("✅ Профіль отримано:", data);
//         document.getElementById("username").textContent = data.username || "-";
//         document.getElementById("email").textContent = data.email || "-";
//         document.getElementById("phone").textContent = data.phoneNumber || "-";
//         document.getElementById("typeUser").textContent = data.typeUser || "-";
//         document.getElementById("role").textContent = data.role || "-";
//         document.getElementById("isVerified").textContent = data.verified ? "Так" : "Ні";
//       })
//       .catch(err => {
//         console.error("❌ AUTH ERROR:", err.message);
//         // ❗ Не видаляємо токен одразу, просто показуємо повідомлення або перенаправляємо
//         sessionStorage.setItem("sessionExpired", "true");
//         window.location.href = "./index.html";
//       });
  
//     // 2. Завантаження обраного житла
//     fetch("http://localhost:8080/api/v1/properties/favorites", {
//       headers: {
//         "Authorization": "Bearer " + token,
//         "Content-Type": "application/json"
//       }
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("Помилка отримання обраного: " + res.status);
//         return res.json();
//       })
//       .then(renderFavorites)
//       .catch(err => {
//         console.warn("⚠️ Не вдалося завантажити обране:", err.message);
//       });
  
//     // Функція для рендера улюблених житл
//     function renderFavorites(properties) {
//       const list = document.getElementById("favorites-list");
//       if (!list) return;
  
//       list.innerHTML = "";
  
//       if (!properties.length) {
//         list.innerHTML = '<p style="text-align:center;">У вас ще немає обраного житла.</p>';
//         return;
//       }
  
//       properties.forEach(property => {
//         const item = document.createElement("li");
//         item.classList.add("car-card");
  
//         item.innerHTML = `
//           <img class="car-image" src="${property.imageUrl || './resources/Asset 1house_img.png'}" alt="image">
//           <h3 class="car-title">${property.title || 'Нерухомість'}</h3>
//           <p class="car-type">Кімнат: ${property.rooms || '-'}</p>
//           <p class="car-mileage">Площа: ${property.area || '-'} м²</p>
//           <p class="car-capacity">Поверх: ${property.floor || '-'}</p>
//           <p class="car-fuel">Тип угоди: ${property.dealType || '-'}</p>
//           <p class="car-price">${property.price ? property.price + '$' : '-'}</p>
//         `;
  
//         list.appendChild(item);
//       });
//     }
  
//     // 3. Кнопка виходу
//     const logoutBtn = document.getElementById("logout-btn");
//     if (logoutBtn) {
//       logoutBtn.addEventListener("click", () => {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "./index.html";
//       });
//     } else {
//       console.warn("⚠️ Кнопку #logout-btn не знайдено в DOM.");
//     }
//   });
  