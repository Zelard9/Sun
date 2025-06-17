document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const data = {
      username: form.username.value,
      password: form.password.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      typeUser: form.typeUser.value
    };
  
    try {
      const res = await fetch("https://sun-backend.up.railway.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (!res.ok) throw new Error("Реєстрація не вдалася");
  
      alert("Успішно зареєстровано!");
      document.getElementById("registration-modal").style.display = "none";
    } catch (err) {
      alert("Помилка реєстрації 😥");
      console.error(err);
    }
  });
  