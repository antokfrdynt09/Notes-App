class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        form {
          background-color: #8B322C;
          padding: 15px;
          border: 2px solid #FFC470;
          border-radius: 8px;
          display: grid;
          grid-template-column: 1fr;
          gap: 15px;
          width: auto;
          max-width: 100%;
          color: white;
        }

        label {
          font-weight: bold;
          color: white;
        }

        input,
        textarea {
          padding: 1px;
          border-radius: 4px;
          border: 1px solid #FFAF00;
          font-size: 1em;
          background-color: white;
          color: black;
        }

        small {
          color: red;
          display: none;
        }

        button {
          background-color: #FFC470;
          color: black;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          align-self: end;
        }

        button:hover {
          background-color: #bd8f4e;
        }
      </style>
      <form novalidate>
        <label for="note-title">Judul</label>
        <input id="note-title" type="text" placeholder="Judul" required minlength="3" />
        <small id="title-error">Judul minimal 3 karakter</small>
        <label for="note-body">Isi catatan</label>
        <textarea id="note-body" placeholder="Isi catatan" required minlength="5"></textarea>
        <small id="body-error">Isi catatan minimal 5 karakter</small>
        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    const titleInput = this.shadowRoot.querySelector('#note-title');
    const bodyInput = this.shadowRoot.querySelector('#note-body');
    const titleError = this.shadowRoot.querySelector('#title-error');
    const bodyError = this.shadowRoot.querySelector('#body-error');

    titleInput.addEventListener('input', () => {
      titleError.style.display = titleInput.value.length < 3 ? 'block' : 'none';
    });

    bodyInput.addEventListener('input', () => {
      bodyError.style.display = bodyInput.value.length < 5 ? 'block' : 'none';
    });

    this.shadowRoot
      .querySelector('form')
      .addEventListener('submit', (event) => {
        event.preventDefault();
        if (titleInput.value.length >= 3 && bodyInput.value.length >= 5) {
          this.dispatchEvent(
            new CustomEvent('add-note', {
              detail: { title: titleInput.value, body: bodyInput.value },
              bubbles: true,
              composed: true,
            })
          );
          titleInput.value = '';
          bodyInput.value = '';
        }
      });
  }
}

customElements.define('note-form', NoteForm);
