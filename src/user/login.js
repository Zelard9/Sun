// /*document.addEventListener("DOMContentLoaded", () => {
//     const loginModal = document.getElementById("login-modal");
//     const loginForm = document.getElementById("login-form");
//     const switchToRegisterBtn = document.getElementById("switchToRegister");
//     const loginMessage = document.getElementById("login-message");
//     const closeLoginBtn = document.getElementById("closeLogin");
  
//     // Якщо немає accessToken — показати модалку входу
//     if (!localStorage.getItem("accessToken") && loginModal) {
//       loginModal.style.display = "flex";
//       if (loginMessage) loginMessage.textContent = "Будь ласка, увійдіть у систему";
//     }
  
//     // Закриття модалки
//     if (closeLoginBtn) {
//       closeLoginBtn.addEventListener("click", () => {
//         loginModal.style.display = "none";
//         if (loginMessage) loginMessage.textContent = "";
//       });
//     }
  
//     // Перехід до реєстрації
//     if (switchToRegisterBtn) {
//       switchToRegisterBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         loginModal.style.display = "none";
//         const regModal = document.getElementById("registration-modal");
//         if (regModal) regModal.style.display = "flex";
//       });
//     }
  
//     // Обробка логіну
//     if (loginForm) {
//       loginForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
  
//         const email = loginForm.username?.value;
//         const password = loginForm.password?.value;
  
//         if (!email || !password) {
//           if (loginMessage) loginMessage.textContent = "Введіть email та пароль!";
//           return;
//         }
  
//         try {
//             const res = await fetch("http://localhost:8080/api/v1/auth/login", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ email, password })
//             });
          
//             const raw = await res.text(); // 🟡 Перевірка відповіді
//             console.log("📦 Відповідь сервера:", raw);
          
//             if (!res.ok) throw new Error(raw);
          
//             const result = JSON.parse(raw); // парсим тільки після перевірки статусу
          
//             if (!result.accessToken || !result.refreshToken) {
//               throw new Error("Сервер не повернув accessToken або refreshToken");
//             }
          
//             localStorage.setItem("accessToken", result.accessToken);
//             localStorage.setItem("refreshToken", result.refreshToken);
          
//             loginModal.style.display = "none";
//             loginForm.reset();
//             loginMessage.textContent = "";
          
//             const userDisplay = document.getElementById("user");
//             if (userDisplay) {
//               userDisplay.textContent = `Ви ввійшли як: ${result.username || email}`;
//             }
          
//             window.location.reload();
//           } catch (err) {
//             loginMessage.textContent = "❌ " + (err.message || "Невідома помилка входу");
//             console.error("Login error:", err);
//           }
          
//   });
//     }
// });
// */
 

// document.addEventListener("DOMContentLoaded", () => {
//     const loginModal = document.getElementById("login-modal");
//     const loginForm = document.getElementById("login-form");
//     const switchToRegisterBtn = document.getElementById("switchToRegister");
//     const loginMessage = document.getElementById("login-message");
//     const closeLoginBtn = document.getElementById("closeLogin");
  
//     // Модалка при потребі
//     if (sessionStorage.getItem("showModal") === "login") {
//       if (loginModal) loginModal.style.display = "flex";
//       if (loginMessage) loginMessage.textContent = "⛔ Для доступу увійдіть в акаунт.";
//       sessionStorage.removeItem("showModal");
//     }
  
//     if (sessionStorage.getItem("sessionExpired")) {
//       if (loginModal) loginModal.style.display = "flex";
//       if (loginMessage) loginMessage.textContent = "Сесію завершено. Увійдіть повторно.";
//       sessionStorage.removeItem("sessionExpired");
//     }
  
//     if (closeLoginBtn) {
//       closeLoginBtn.addEventListener("click", () => {
//         loginModal.style.display = "none";
//         if (loginMessage) loginMessage.textContent = "";
//       });
//     }
  
//     if (switchToRegisterBtn) {
//       switchToRegisterBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         loginModal.style.display = "none";
//         const regModal = document.getElementById("registration-modal");
//         if (regModal) regModal.style.display = "flex";
//       });
//     }
  
//     // 🟢 Обробка логіну
//     if (loginForm) {
//       loginForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
  
//         const email = loginForm.username?.value;
//         const password = loginForm.password?.value;
  
//         if (!email || !password) {
//           if (loginMessage) loginMessage.textContent = "Введіть email та пароль!";
//           return;
//         }
  
//         try {
//           const res = await fetch("http://localhost:8080/api/v1/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password })
//           });
  
//           if (!res.ok) {
//             const errText = await res.text();
//             throw new Error(errText);
//           }
  
//           const result = await res.json(); // ✅ Тут головна зміна
  
//           if (!result.accessToken || !result.refreshToken) {
//             throw new Error("Сервер не повернув токени");
//           }
  
//           // 🧠 Зберігаємо токени
//           localStorage.setItem("accessToken", result.accessToken);
//           localStorage.setItem("refreshToken", result.refreshToken);
  
//           // 👋 Закриваємо вікно і оновлюємо інтерфейс
//           if (loginModal) loginModal.style.display = "none";
//           loginForm.reset();
//           if (loginMessage) loginMessage.textContent = "";
  
//           const userDisplay = document.getElementById("user");
//           if (userDisplay) {
//             userDisplay.textContent = `Ви ввійшли як: ${result.username || email}`;
//           }
  
//           // ✅ Переходимо в кабінет
//           window.location.href = "./cabinet.html";
  
//         } catch (err) {
//           if (loginMessage) loginMessage.textContent = "❌ " + (err.message || "Невідома помилка входу");
//           console.error("Login error:", err);
//         }
//       });
//     }
//   });
  
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginModal = document.getElementById("login-modal");
    const loginMessage = document.getElementById("login-message");
    const userDisplay = document.getElementById("user");
  
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const formData = new FormData(loginForm);
        const loginData = {
          username: formData.get("username"),
          password: formData.get("password"),
        };
  
        try {
          const response = await fetch("https://your-backend-url.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
          });
  
          if (!response.ok) {
            const error = await response.json();
            loginMessage.textContent = error.message || "Невірні дані";
            return;
          }
  
          const data = await response.json();
          localStorage.setItem("accessToken", data.accessToken);
  
          // Показати користувача в хедері
          userDisplay.textContent = data.username || "Користувач";
  
          // Закрити модалку
          loginModal.style.display = "none";
        } catch (err) {
          loginMessage.textContent = "⚠️ Сервер не відповідає. Спробуйте пізніше.";
          console.error("Login error:", err);
        }
      });
    }
  });
  