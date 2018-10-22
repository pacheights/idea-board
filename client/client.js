const createButton = document.querySelector('.create-button');
const submitButton = document.querySelector('.idea-submit');
const ideaForm = document.querySelector('.idea-form');

createButton.addEventListener('click', (event) => {
    createButton.style.display = 'none';
    ideaForm.style.display = 'inline-block';
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    createButton.style.display = 'inline-block';
    ideaForm.style.display = 'none';
});
