const createButton = document.querySelector('.create-button');
const submitButton = document.querySelector('.idea-submit');
const ideaForm = document.querySelector('.idea-form');
const editButtons = document.getElementsByClassName('edit-button');
const deleteButtons = document.getElementsByClassName('delete-button');
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
    listIdeas();
  });

  createButton.style.display = 'inline-block';
  ideaForm.style.display = 'none';

  ideaForm.reset();
});

function listIdeas() {
  // const containers = document.getElementsByClassName('idea-content');
  // for (let container of containers) {
  //   container.innerHTML = '';
  // }

  fetch(API_URL)
    .then(res => res.json())
    .then(ideas => {
      ideas.forEach(idea => {
        const category = idea.category;
        const parentElementId = `#idea-content-${category}`;
        const parentElement = document.querySelector(parentElementId);
        const container = document.createElement('div');
        const editButton = document.createElement('i');
        const paragraph = document.createElement('p');
        const deleteButton = document.createElement('i');

        container.classList = 'single-idea';
        editButton.classList = 'edit-button fas fa-edit';
        deleteButton.classList = 'delete-button fas fa-trash-alt';
        paragraph.classList = 'idea-text';

        paragraph.textContent = idea.idea;

        container.appendChild(editButton);
        container.appendChild(paragraph);
        container.appendChild(deleteButton);
        parentElement.appendChild(container);

        editButtonEventAdder(editButtons);
        deleteButtonEventAdder(deleteButtons);
      })
    });
}

function editButtonEventAdder(elements) {
  for (let element of elements) {
    element.addEventListener('click', (event) => {
      const password = prompt('Please enter the password to edit the idea');
    });
  }
}

function deleteButtonEventAdder(elements) {
  for (let element of elements) {
    element.addEventListener('click', (event) => {
      const password = prompt('Please enter the password to delete the idea');
    });
  }
}