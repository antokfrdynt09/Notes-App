import NotesApi from '../api/notesApi';

class NoteItem extends HTMLElement {
  set note(note) {
    console.log(note);
    this._note = note;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note-item">
        <h3>${this._note.title}</h3>
        <p>${this._note.body}</p>
        <p>Created At: ${new Date(this._note.createdAt).toLocaleString()}</p>
        <button class="delete-button" data-id="${this._note.id}">Hapus</button>
        <button class="archive-button">${
          this._note.archived ? 'Kembalikan' : 'Arsipkan'
        }</button>
      </div>
      
    `;

    // Event listener untuk tombol hapus
    this.querySelector('.delete-button').addEventListener('click', () => {
      const event = new CustomEvent('delete-note', {
        detail: this._note.id, // Menggunakan ID atau identifier yang sesuai
        bubbles: true,
      });
      this.dispatchEvent(event);
    });

    // Event listener untuk tombol arsipkan
    this.querySelector('.archive-button').addEventListener(
      'click',
      async () => {
        const result = this._note.archived
          ? await NotesApi.unarchiveNote(this._note.id)
          : await NotesApi.archiveNote(this._note.id);

        if (result) {
          // Update status arsip setelah berhasil
          this._note.archived = !this._note.archived;
          this.render();

          const event = new CustomEvent(
            this._note.archived ? 'archive-note' : 'unarchive-note',
            {
              detail: this._note.id,
              bubbles: true,
            }
          );
          this.dispatchEvent(event);
        }
      }
    );
  }
}

customElements.define('note-item', NoteItem);
