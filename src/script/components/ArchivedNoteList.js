class ArchivedNoteList extends HTMLElement {
  set archivedNotes(archivedNotes) {
    console.log(archivedNotes);
    this._notes = archivedNotes;
    this.render();
  }

  render() {
    this.innerHTML = ''; // Clear previous notes

    // Tambahkan judul disini
    const title = `<h3>Catatan Arsip</h3>`;

    // Cek apakah ada catatan arsip
    if (!this._notes || this._notes.length === 0) {
      this.innerHTML = `${title}<p>Tidak ada catatan arsip.</p>`; // Message if no archived notes
    } else {
      const container = document.createElement('div');
      container.classList.add('archived-notes-container');

      this.innerHTML = title; // Menampilkan judul
      
      this._notes.forEach((note) => {
        console.log(note);

        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note;
        container.appendChild(noteItemElement);
      });

      this.appendChild(container); // Add container to the main element
    }
  }
}

customElements.define('archived-note-list', ArchivedNoteList);
