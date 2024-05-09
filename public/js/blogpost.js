async function post(event) {
  event.preventDefault();

  const title = document.querySelector('#blogpost-title').value;
  const body = document.querySelector('#blogpost-body').value;
  
  if (title && body) {
    const response = await fetch(`/`, {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Posting blogpost failed. Please try again.');
    }
  }
}

const blogpostForm = document.querySelector('#blogpost-form')
blogpostForm.addEventListener('submit', post);