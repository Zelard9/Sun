document.addEventListener("DOMContentLoaded", () => {
  const registrationModal = document.getElementById("registration-modal");
  const registerForm = document.getElementById("register-form");
  const switchToLoginBtn = document.getElementById("switchToLogin");
  const closeRegisterBtn = document.getElementById("closeModal");

  if (registrationModal) registrationModal.style.display = "none";

  if (closeRegisterBtn) {
    closeRegisterBtn.addEventListener("click", () => {
      registrationModal.style.display = "none";
    });
  }

  if (switchToLoginBtn) {
    switchToLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      registrationModal.style.display = "none";
      document.getElementById("login-modal").style.display = "flex";
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        username: registerForm.username.value,
        password: registerForm.password.value,
        email: registerForm.email.value,
        phoneNumber: registerForm.phoneNumber.value,
        typeUser: registerForm.typeUser.value
      };

      if (!data.typeUser) {
        alert("Будь ласка, оберіть тип користувача!");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/v1/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error(await res.text());

        registrationModal.style.display = "none";
        registerForm.reset();

        const loginModal = document.getElementById("login-modal");
        if (loginModal) {
          loginModal.style.display = "flex";
          const loginForm = document.getElementById("login-form");
          if (loginForm?.username) loginForm.username.value = data.email;
          const loginMessage = document.getElementById("login-message");
          if (loginMessage) loginMessage.textContent = "✅ Тепер увійдіть зі своїм email!";
        }
      } catch (err) {
        alert("❌ Помилка реєстрації: " + err.message);
        console.error(err);
      }
    });
  }
});
