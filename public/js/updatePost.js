async function updatePost(event) {
  event.preventDefault();

  const blogpostId = document.querySelector('#post-id').innerHTML;
  const title = document.querySelector('#blogpost-title').value;
  const body = document.querySelector('#blogpost-body').value;
  
  if (title && body) {
    const response = await fetch(`/blogpost/${blogpostId}/update`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        body: body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Updating blogpost failed. Please try again.');
    }
  }
}

const blogpostForm = document.querySelector('#blogpost-form')
blogpostForm.addEventListener('submit', updatePost);