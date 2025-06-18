document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("login-modal");
    const loginForm = document.getElementById("login-form");
    const switchToRegisterBtn = document.getElementById("switchToRegister");
    const loginMessage = document.getElementById("login-message");
    const closeLoginBtn = document.getElementById("closeLogin");
  
    // Якщо немає токена — показати login
    if (!localStorage.getItem("accessToken") && loginModal) {
      loginModal.style.display = "flex";
      if (loginMessage) loginMessage.textContent = "Будь ласка, увійдіть у систему";
    }
  
    if (closeLoginBtn) {
      closeLoginBtn.addEventListener("click", () => {
        loginModal.style.display = "none";
        if (loginMessage) loginMessage.textContent = "";
      });
    }
  
    if (switchToRegisterBtn) {
      switchToRegisterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "none";
        document.getElementById("registration-modal").style.display = "flex";
      });
    }
  
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const email = loginForm.username?.value;
        const password = loginForm.password?.value;
  
        if (!email || !password) {
          if (loginMessage) loginMessage.textContent = "Введіть email та пароль!";
          return;
        }
  
        try {
          const res = await fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
  
          if (!res.ok) throw new Error(await res.text());
  
          const result = await res.json();
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);
  
          loginModal.style.display = "none";
          loginForm.reset();
          loginMessage.textContent = "";
          document.getElementById("user").textContent = `Ви ввійшли як: ${email}`;
        } catch (err) {
          loginMessage.textContent = "❌ " + err.message;
          console.error(err);
        }
      });
    }
  });
  