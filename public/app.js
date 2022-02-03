const modal = document.getElementById('modal');
const editInput = document.getElementById('edit');
const notes = document.querySelectorAll('.list-group-item-text');
const alertMessage = document.querySelector('.alert-message');
let noteId;

document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id;

    remove(id).then(() => {
      e.target.closest('.list-group-item').remove();
    });
  }


});

async function remove(id) {
  await fetch(`/${ id }`, { method: 'DELETE' });
}

async function update(id, title) {
  await fetch(`/${ id }`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
}
