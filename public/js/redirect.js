async function redirect(event) {
  event.preventDefault();

  const response = await fetch(`/dashboard/post`, { method: 'GET' });
  if(response) {
    console.log("click");
    document.location.replace('/dashboard/post');
  }
}

const createPost = document.querySelector('#create-post');
createPost.addEventListener("click", redirect);