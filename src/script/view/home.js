import NotesApi from '../api/notesApi';
import '../components/NoteForm';
import '../components/NoteItem';
import '../components/NoteList';
import '../components/LoadingIndicator';
import '../components/ArchivedNoteList';
import anime from 'animejs/lib/anime.es.js';

// Fungsi untuk memuat catatan dan mengupdate elemen note-list
const loadNotes = async (
  noteListElement,
  archivedNoteListElement,
  loadingIndicator
) => {
  const appElement = document.querySelector('#app');
  appElement.appendChild(loadingIndicator); // Tambahkan indikator loading

  try {
    const notes = await NotesApi.getNotes();
    noteListElement.notes = notes.filter((note) => !note.isArchived); // Update daftar catatan

    const archivedNotes = await NotesApi.getArchivedNotes();
    archivedNoteListElement.archivedNotes = archivedNotes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    appElement.innerHTML += `<p>Terjadi kesalahan saat memuat data catatan.</p>`;
  } finally {
    loadingIndicator.remove(); // Hapus indikator loading setelah selesai
  }

  // Animasi munculnya elemen note-list
  anime({
    targets: noteListElement.querySelectorAll('.note-item'),
    opacity: [0, 1],
    translateY: [-20, 0],
    easing: 'easeOutExpo',
    duration: 800,
    delay: anime.stagger(100),
  });
};

// Inisialisasi halaman home sekali saja
const initializeHomePage = () => {
  const appElement = document.querySelector('#app');
  appElement.innerHTML = ''; // Bersihkan konten sebelumnya

  // Buat elemen indikator loading
  const loadingIndicator = document.createElement('loading-indicator');

  // Buat elemen form dan tambahkan ke halaman
  const noteFormElement = document.createElement('note-form');
  appElement.appendChild(noteFormElement);

  // Buat elemen daftar catatan dan tambahkan ke halaman
  const noteListElement = document.createElement('note-list');
  appElement.appendChild(noteListElement);

  // Buat elemen daftar arsip catatan dan tambahkan ke halaman
  const archivedNoteListElement = document.createElement('archived-note-list');
  appElement.appendChild(archivedNoteListElement);

  // Load daftar catatan awal
  loadNotes(noteListElement, archivedNoteListElement, loadingIndicator);

  // Event listener untuk menambahkan catatan baru
  noteFormElement.addEventListener('add-note', async (event) => {
    const { title, body } = event.detail;
    appElement.appendChild(loadingIndicator); // Tampilkan loading saat menambah catatan

    try {
      const newNote = await NotesApi.createNote(title, body);
      if (newNote) {
        await loadNotes(
          noteListElement,
          archivedNoteListElement,
          loadingIndicator
        ); // Update daftar catatan setelah menambah

        // Animasi penambahan catatan baru
        anime({
          targets: noteListElement.querySelectorAll('.note-item'),
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 500,
          easing: 'easeOutExpo',
        });
      }
    } catch (error) {
      console.error('Error adding new note:', error);
      appElement.innerHTML += `<p>Terjadi kesalahan saat menambah catatan baru.</p>`;
    } finally {
      loadingIndicator.remove();
    }
  });

  // Event listener untuk menghapus catatan
  appElement.addEventListener('delete-note', async (event) => {
    appElement.appendChild(loadingIndicator); // Tampilkan loading saat menghapus catatan

    try {
      await NotesApi.deleteNote(event.detail);
      loadNotes(noteListElement, archivedNoteListElement, loadingIndicator); // Update daftar catatan setelah menghapus
    } catch (error) {
      console.error('Error deleting note:', error);
      appElement.innerHTML += `<p>Gagal menghapus catatan. Silakan coba lagi.</p>`;
    } finally {
      loadingIndicator.remove();
    }
  });

  // Event listerner untuk arsip catatan
  appElement.addEventListener('archive-note', async (event) => {
    appElement.appendChild(loadingIndicator);

    try {
      await NotesApi.archiveNote(event.detail);
      loadNotes(noteListElement, archivedNoteListElement, loadingIndicator);

      // Animasi pengarsipan catatan
      anime({
        targets: archivedNoteListElement.querySelectorAll('.note-item'),
        opacity: [0, 1],
        translateX: [20, 0],
        duration: 600,
        easing: 'easeOutExpo',
      });
    } catch (error) {
      console.error('Error archiving note:', error);
      appElement.innerHTML += `<p>Gagal mengarsipkan catatan. Silakan coba lagi.</p>`;
    } finally {
      loadingIndicator.remove();
    }
  });

  // Event listener untuk meng-unarchive catatan
  appElement.addEventListener('unarchive-note', async (event) => {
    appElement.appendChild(loadingIndicator);

    try {
      await NotesApi.unarchiveNote(event.detail);
      loadNotes(noteListElement, archivedNoteListElement, loadingIndicator); // Reload notes

      // Animasi pengembalian catatan dari arsip
      anime({
        targets: noteListElement.querySelectorAll('.note-item'),
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        easing: 'easeOutExpo',
      });
    } catch (error) {
      console.error('Error unarchiving note:', error);
      appElement.innerHTML += `<p>Gagal mengembalikan catatan. Silakan coba lagi.</p>`;
    } finally {
      loadingIndicator.remove();
    }
  });
};

// Ekspor initializeHomePage untuk memulai aplikasi
export { initializeHomePage };
