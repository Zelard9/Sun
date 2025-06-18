/*fetch('http://localhost:8080/api/v1/auth/register', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('username').textContent = data.username || '-';
      document.getElementById('email').textContent = data.email || '-';
      document.getElementById('phone').textContent = data.phoneNumber || '-';
      document.getElementById('typeUser').textContent = data.typeUser || '-';
      document.getElementById('role').textContent = data.role || '-';
      document.getElementById('isVerified').textContent = data.verified ? 'Так' : 'Ні';
      if (data.verified) {
        document.getElementById('isVerified').classList.add('verified');
      }
  
      // Динамічний аватар
      const avatar = document.getElementById('profileAvatar');
      const userType = data.typeUser;
  
      if (userType === 'CUSTOMER') {
        avatar.src = 'resources/customer-avatar.png';
      } else if (userType === 'OWNER') {
        avatar.src = 'resources/owner-avatar.png';
      } else if (userType === 'AGENT') {
        avatar.src = 'resources/agent-avatar.png';
      } else {
        avatar.src = 'resources/default-avatar.png'; // якщо тип не розпізнано
      }
    })
    .catch(err => {
      console.error('Помилка при отриманні даних користувача:', err);
    });
  */