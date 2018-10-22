const createButton = document.querySelector('.create-button');
const submitButton = document.querySelector('.idea-submit');
const ideaForm = document.querySelector('.idea-form');
const API_URL = 'http://localhost:3000/idea';

createButton.addEventListener('click', (event) => {
  createButton.style.display = 'none';
  ideaForm.style.display = 'inline-block';
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const formData = new FormData(ideaForm);
  const category = formData.get('category');
  const idea = formData.get('idea');

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      idea,
      category
    }),
    headers: {
      'content-type': 'application/json'
    }
  });

  createButton.style.display = 'inline-block';
  ideaForm.style.display = 'none';

  clearForm();
});

function clearForm() {
  const text = document.querySelector('#idea-textarea');
  const categories = document.getElementsByClassName('category');
  
  for (category of categories) {
    category.checked = false;
  }
  text.value = "";
}
