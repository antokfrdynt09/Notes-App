class NoteList extends HTMLElement {
  set notes(notes) {
    console.log(notes);
    this._notes = notes;
    this.render();
  }

  render() {
    this.innerHTML = ''; // Clear previous notes

    // Tambahkan judul disini
    const title = `<h3>Catatan Aktif</h3>`;

    // Cek apakah ada catatan
    if (!this._notes || this._notes.length === 0) {
      this.innerHTML = `${title}<p>Tidak ada catatan.</p>`; // Menampilkan pesan jika tidak ada catatan
    } else {
      // Buat elemen container untuk grid
      const container = document.createElement('div');
      container.classList.add('notes-container');

      this.innerHTML = title; // Menampilkan judul

      this._notes.forEach((note) => {
        const noteItemElement = document.createElement('note-item'); // Ganti 'note-list' menjadi 'note-item'
        noteItemElement.note = note; // Set note untuk item individual
        container.appendChild(noteItemElement); // Tambahkan item ke dalam container
      });

      this.appendChild(container); // Tambahkan container ke elemen utama
    }
  }
}

customElements.define('note-list', NoteList);
