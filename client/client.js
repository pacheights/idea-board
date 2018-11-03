const createButton = document.querySelector('.create-button');
const submitButton = document.querySelector('.idea-submit');
const ideaForm = document.querySelector('.idea-form');
const API_URL = 'http://localhost:3000/ideas';

const listIdeas = () => {
  clearIdeas();

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
  const parentContainer = document.createElement('div');
  const editButton = document.createElement('i');
  const submitEditButton = document.createElement('i');
  const ideaParagraphElement = document.createElement('p');
  const editIdeaTextArea = document.createElement('textarea');
  const cancelEditButton = document.createElement('i');  
  const deleteButton = document.createElement('i');

  parentContainer.classList = 'single-idea';
  editButton.classList = 'edit-button fas fa-edit';
  submitEditButton.classList = 'submit-edit-button fas fa-check';
  ideaParagraphElement.classList = 'idea-text';
  editIdeaTextArea.classList = 'edit-idea-textarea';
  cancelEditButton.classList = 'cancel-edit-button fas fa-times';
  deleteButton.classList = 'delete-button fas fa-trash-alt';
  
  ideaParagraphElement.textContent = idea.idea;

  editButton.addEventListener('click', (event) => {
    const ideaTextValue = ideaParagraphElement.innerText;

    editIdeaTextArea.value = ideaTextValue;
    editButton.style.fontSize = deleteButton.style.fontSize = '0px';
    submitEditButton.style.fontSize = cancelEditButton.style.fontSize = '20px';
    editIdeaTextArea.style.display = 'block';
    ideaParagraphElement.style.display = 'none';
  });

  deleteButton.addEventListener('click', (event) => {
    listIdeas();
  });

  submitEditButton.addEventListener('click', (event) => {
    listIdeas();
  });

  cancelEditButton.addEventListener('click', (event) => {
    editIdeaTextArea.value = '';
    editButton.style.fontSize = deleteButton.style.fontSize = '20px';
    submitEditButton.style.fontSize = cancelEditButton.style.fontSize = '0px';
    editIdeaTextArea.style.display = 'none';
    ideaParagraphElement.style.display = 'block';
  });

  parentContainer.appendChild(editButton);
  parentContainer.appendChild(submitEditButton);
  parentContainer.appendChild(ideaParagraphElement);
  parentContainer.appendChild(editIdeaTextArea);
  parentContainer.appendChild(cancelEditButton)
  parentContainer.appendChild(deleteButton);

  return parentContainer;
}

createButton.addEventListener('click', (event) => {
  createButton.style.display = 'none';
  ideaForm.style.display = 'inline-block';
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const formData = new FormData(ideaForm);
  const idea = formData.get('idea');
  const category = formData.get('category');
  
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