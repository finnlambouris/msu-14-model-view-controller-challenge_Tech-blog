async function signup(event) {
    event.preventDefault();
  
    const username = document.querySelector('#signup-username').value;
    const password = document.querySelector('#signup-password').value;
  
    const response = await fetch(`/signup`, {
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
      alert('Account creation failed. Please try again.');
    }
  }

const signupForm = document.querySelector('#signup')
signupForm.addEventListener('submit', signup);