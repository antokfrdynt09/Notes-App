const BASE_URL = 'https://notes-api.dicoding.dev/v2';

const NotesApi = {
  async getNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      return []; // Mengembalikan array kosong jika ada error
    }
  },

  async createNote(title, body) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error('Error creating note:', error);
      return null; // Mengembalikan null jika ada error
    }
  },

  async deleteNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error deleting note:', error);
      return null; // Mengembalikan null jika ada error
    }
  },

  async getArchivedNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson.data;
    } catch (error) {
      console.error('Error fetching archived notes:', error);
      return []; // Return empty array if there;s an error
    }
  },

  async archiveNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
        method: 'POST',
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error archiving note:', error);
      return null; // Return null if there's an error
    }
  },

  async unarchiveNote(noteId) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error unarchiving note:', error);
      return null; // Return null if there's an error
    }
  },
};

export default NotesApi;
