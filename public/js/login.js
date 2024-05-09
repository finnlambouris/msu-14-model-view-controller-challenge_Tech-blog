async function login(event) {
  event.preventDefault();

  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();
  
  if (username && password) {
    const response = await fetch(`/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
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