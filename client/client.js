const createButton = document.querySelector('.create-button');
const submitButton = document.querySelector('.idea-submit');
const ideaForm = document.querySelector('.idea-form');
const API_URL = 'http://localhost:3000/ideas';

listIdeas();

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
  })
  .then(res => {
    const containers = document.getElementsByClassName('idea-content');
    for (let container of containers) {
      container.innerHTML = '';
    }
    listIdeas();
  });

  createButton.style.display = 'inline-block';
  ideaForm.style.display = 'none';

  ideaForm.reset();
});

function listIdeas() {
  fetch(API_URL)
    .then(res => res.json())
    .then(ideas => {
      ideas.forEach(idea => {
        const category = idea.category;
        const elementId = `#idea-content-${category}`;
        const container = document.querySelector(elementId);
        const paragraph = document.createElement('p');

        paragraph.textContent = idea.idea;
        container.appendChild(paragraph);
      })
    });
}