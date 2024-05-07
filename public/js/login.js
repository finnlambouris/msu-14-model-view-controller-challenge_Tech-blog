async function login(event) {
  event.preventDefault();

  const email = document.querySelector('#login-email').value.trim();
  const password = document.querySelector('#login-password').value.trim();
  
  if (email && password) {
    const response = await fetch(`/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Login failed. Please try again.');
    }
  }
}

const loginForm = document.querySelector('#login')
loginForm.addEventListener('submit', login);