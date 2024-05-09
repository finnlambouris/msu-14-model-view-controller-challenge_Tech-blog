async function deletePost(event) {
  event.preventDefault();

  const blogpostId = document.querySelector('#post-id').innerHTML;
  
  if (blogpostId) {
    const response = await fetch(`/blogpost/${blogpostId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Deleting comment failed. Please try again.');
    }
  }
}

const deleteButton = document.querySelector('#delete-post');
deleteButton.addEventListener('click', deletePost);