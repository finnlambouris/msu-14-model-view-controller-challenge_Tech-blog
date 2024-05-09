async function comment(event) {
  event.preventDefault();

  const comment = document.querySelector('#comment').value;
  const blogpostId = document.querySelector('#post-id').innerHTML;
  
  if (comment) {
    const response = await fetch(`/blogpost/${blogpostId}`, {
      method: 'POST',
      body: JSON.stringify({
        comment: comment,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert("worked");
      // document.location.replace('/dashboard');
    } else {
      alert('Posting comment failed. Please try again.');
    }
  }
}

const commentForm = document.querySelector('#comment-form')
commentForm.addEventListener('submit', comment);