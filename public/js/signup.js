async function signup(event) {
    event.preventDefault();
  
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;
  
    const response = await fetch(`/api/users`, {
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
      alert('Account creation failed. Please try again.');
    }
  }

const signupForm = document.querySelector('#signup')
signupForm.addEventListener('submit', signup);