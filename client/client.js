const createButton = document.querySelector('.create-button');
const submitButton = document.querySelector('.idea-submit');
const ideaForm = document.querySelector('.idea-form');
const API_URL = 'http://localhost:3000/ideas';

const listIdeas = () => {
  // clearIdeas();

  fetch(API_URL)
    .then(res => res.json())
    .then(ideas => {
      ideas.forEach(idea => {
        const category = idea.category;
        const parentElementId = `#idea-content-${category}`;
        const parentElement = document.querySelector(parentElementId);
        const ideaElement = createIdeaElement(idea);
        parentElement.appendChild(ideaElement);
      })
    });
}

const clearIdeas = () => {
  const containers = document.getElementsByClassName('idea-content');
  for (let container of containers) {
    container.innerHTML = '';
  }
}

const createIdeaElement = (idea) => {
  const container = document.createElement('div');
  const editButton = document.createElement('i');
  const submitEditButton = document.createElement('i');
  const paragraph = document.createElement('p');
  const editTextArea = document.createElement('textarea');
  const deleteButton = document.createElement('i');

  container.classList = 'single-idea';
  editButton.classList = 'edit-button fas fa-edit';
  submitEditButton.classList = 'submit-edit-button fas fa-check';
  paragraph.classList = 'idea-text';
  editTextArea.classList = 'edit-idea-textarea';
  deleteButton.classList = 'delete-button fas fa-trash-alt';
  
  paragraph.textContent = idea.idea;
  editButton.addEventListener('click', editButtonEventHandler)
  deleteButton.addEventListener('click', deleteButtonEventHandler)

  container.appendChild(editButton);
  container.appendChild(submitEditButton);
  container.appendChild(paragraph);
  container.appendChild(editTextArea);
  container.appendChild(deleteButton);

  return container;
}

const editButtonEventHandler = (event) => {
  // const password = prompt('Please enter the password to edit the idea');
  const editButton = event.target.parentElement.children[0];
  const submitEditButton = event.target.parentElement.children[1];
  const ideaTextElement = event.target.parentElement.children[2];
  const editTextArea = event.target.parentElement.children[3];
  const ideaText = ideaTextElement.innerText;
  const ideaTextNode = document.createTextNode(ideaText);
  
  editTextArea.appendChild(ideaTextNode);
  editButton.style.fontSize = '0px';
  editTextArea.style.display = 'block';
  ideaTextElement.style.display = 'none';  
  submitEditButton.style.fontSize = '20px';
}

const deleteButtonEventHandler = (event) => {
  const password = prompt('Please enter the password to delete the idea');
}

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

listIdeas();