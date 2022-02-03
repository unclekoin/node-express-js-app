const notes = document.querySelectorAll('.list-group-item-text');
const hidden = 'visually-hidden';

document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id;

    remove(id).then(() => {
      e.target.closest('.list-group-item').remove();
    });
  }

  if (e.target.dataset.type === 'edit') {
    const id = e.target.dataset.id;
    const container = e.target.closest('.list-group-item');
    const noteContent = container.querySelector('.list-group-item-text');
    const cancelBtn = createElement('button', ['btn', 'btn-outline-danger'], 'cancel', 'Cancel');
    const saveBtn = createElement('button', ['btn', 'btn-outline-success', 'me-2'], 'save', 'Save');
    const input = createElement('input', ['form-control', 'me-2'], '', '', id);
    input.value = noteContent.textContent;
    const removeBtn = e.target.parentElement.querySelector('span');
    removeBtn.classList.add(hidden);
    e.target.parentElement.append(saveBtn);
    e.target.parentElement.append(cancelBtn);
    container.prepend(input);
    input.focus();
    noteContent.classList.add(hidden);
    e.target.classList.add(hidden);
  }

  if (e.target.dataset.type === 'cancel') {
    const [input, saveBtn, updateBtn, removeBtn, noteContent] = getElements(e.target, 'save');
    removeBtn.classList.remove(hidden);
    saveBtn.remove();
    updateBtn.classList.remove(hidden);
    noteContent.classList.remove(hidden);
    input.remove();
    e.target.remove();
  }

  if (e.target.dataset.type === 'save') {
    const [input, cancelBtn, updateBtn, removeBtn, noteContent] = getElements(e.target, 'cancel');
    const id = input.id;
    const title = input.value;

    update(id, title).then(() => {
      noteContent.classList.remove(hidden);
      noteContent.textContent = title;
      input.remove();
      cancelBtn.remove();
      updateBtn.classList.remove(hidden);
      removeBtn.classList.remove(hidden);
      e.target.remove();
    })
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

function getElements(root, type) {
  const container = root.closest('.list-group-item');
  const input = container.querySelector('input');
  const btn = container.querySelector(`button[data-type=${ type }]`);
  const updateBtn = container.querySelector('button[data-type=edit]');
  const removeBtn = container.querySelector('span[data-type=remove]');
  const noteContent = container.querySelector('.list-group-item-text');
  return [input, btn, updateBtn, removeBtn, noteContent];
}
