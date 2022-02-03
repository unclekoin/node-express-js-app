const notes = document.querySelectorAll('.list-group-item-text');

document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id;

    remove(id).then(() => {
      e.target.closest('.list-group-item').remove();
    });
  }

  if (e.target.dataset.type === 'edit') {
    // const id = e.target.dataset.id;
    const container = e.target.closest('.list-group-item');
    const noteContent = container.querySelector('.list-group-item-text');
    const cancelBtn = createElement('button', ['btn', 'btn-outline-danger'], 'cancel', 'Cancel');
    const saveBtn = createElement('button', ['btn', 'btn-outline-success',  'me-2'], 'save', 'Save');
    const input = createElement('input', ['form-control', 'me-2'], '');
    input.value = noteContent.textContent;
    const removeBtn = e.target.parentElement.querySelector('span');
    removeBtn.classList.add('visually-hidden');
    e.target.parentElement.append(saveBtn);
    e.target.parentElement.append(cancelBtn);
    container.prepend(input);
    noteContent.classList.add('visually-hidden');
    e.target.classList.add('visually-hidden');
  }

  if (e.target.dataset.type === 'cancel') {
    const container = e.target.closest('.list-group-item');
    const saveBtn = container.querySelector('button[data-type=save]')
    const updateBtn = container.querySelector('button[data-type=edit]')
    const removeBtn = e.target.parentElement.querySelector('span');
    const noteContent = container.querySelector('.list-group-item-text');
    const input = container.querySelector('input');
    removeBtn.classList.remove('visually-hidden');
    saveBtn.remove();
    updateBtn.classList.remove('visually-hidden')
    noteContent.classList.remove('visually-hidden');
    input.remove();
    e.target.remove();
  }

  if (e.target.dataset.type === 'save') {
    const id = 123
    console.log('save', id);
  }
});

async function remove(id) {
  await fetch(`/${ id }`, { method: 'DELETE' });
}

async function update(id, title) {
  await fetch(`/${ id }`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title })
  });
}

function createElement(tag = 'div', classes = [], type = '', content = '', id = '',) {
  const element = document.createElement(tag);
  if (classes.length) element.classList.add(...classes);
  if (type) element.setAttribute('data-type', type);
  if (id) element.id = id;
  if (content) element.textContent = content;

  return element;
}
