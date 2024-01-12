import EncryptedStorage from 'react-native-encrypted-storage';

// Function to get all notes from EncryptedStorage and sort them by createdAt
export const getAllNotes = async () => {
  try {
    const notesJson = await EncryptedStorage.getItem('notes');
    if (notesJson) {
      const notes = JSON.parse(notesJson);

      // Sort the notes by createdAt in descending order (most recent first)
      notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return notes;
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
};

// Function to add a new note to the array
export const addNote = async note => {
  try {
    // Get the existing notes from EncryptedStorage
    const existingNotes = await getAllNotes();

    // Generate a random ID
    const id = generateRandomId(8);

    // Set the createdAt timestamp
    note.id = id;
    note.createdAt = new Date().toISOString();

    // Add the note to the array
    existingNotes.push(note);

    // Store the updated array back in EncryptedStorage
    await EncryptedStorage.setItem('notes', JSON.stringify(existingNotes));

    return 'OK';
  } catch (e) {
    return 'FAIL';
  }
};

// Function to edit a note in the array by ID
export const editNote = async (id, updatedNote) => {
  try {
    // Get the existing notes from EncryptedStorage
    const existingNotes = await getAllNotes();

    // Find the note to edit
    const noteToEdit = existingNotes.find(note => note.id === id);
    if (noteToEdit) {
      // Update the note
      Object.assign(noteToEdit, updatedNote);

      // Store the updated array back in EncryptedStorage
      await EncryptedStorage.setItem('notes', JSON.stringify(existingNotes));

      return 'OK';
    } else {
      return 'Note not found';
    }
  } catch (e) {
    return 'FAIL';
  }
};

// Function to delete a note from the array by ID
export const deleteNote = async id => {
  try {
    // Get the existing notes from EncryptedStorage
    const existingNotes = await getAllNotes();

    // Find the index of the note to delete
    const index = existingNotes.findIndex(note => note.id === id);

    if (index !== -1) {
      // Remove the note from the array
      existingNotes.splice(index, 1);

      // Store the updated array back in EncryptedStorage
      await EncryptedStorage.setItem('notes', JSON.stringify(existingNotes));

      return 'OK';
    } else {
      return 'Note not found';
    }
  } catch (e) {
    return 'FAIL';
  }
};

export function generateRandomId(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export const isObjectEmpty = value => {
  return (
    Object.prototype.toString.call(value) === '[object Object]' &&
    JSON.stringify(value) === '{}'
  );
};
