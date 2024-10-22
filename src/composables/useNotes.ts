import { ref, computed } from 'vue';
import type { Note, Position, NoteColor } from '@/types/note';
import { useLocalStorage } from './useLocalStorage';
import { generateId, getRandomPosition } from '@/utils/Helpers';

export function useNotes(boardId: string) {
  const notes = useLocalStorage<Note[]>(`board_${boardId}_notes`, []);
  const editingNoteId = ref<string | null>(null);

  const createNote = (color: NoteColor, position?: Position) => {
    const newNote: Note = {
      id: generateId(),
      text: '',
      position: position || getRandomPosition({
        width: window.innerWidth - 250,
        height: window.innerHeight - 150
      }),
      color,
      isPinned: false,
      boardId,
      createdAt: Date.now()
    };
    notes.value.push(newNote);
    return newNote;
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    const index = notes.value.findIndex(n => n.id === noteId);
    if (index !== -1) {
      notes.value[index] = { ...notes.value[index], ...updates };
    }
  };

  const deleteNote = (noteId: string) => {
    const index = notes.value.findIndex(n => n.id === noteId);
    if (index !== -1) {
      notes.value.splice(index, 1);
    }
  };

  const togglePin = (noteId: string) => {
    const note = notes.value.find(n => n.id === noteId);
    if (note) {
      note.isPinned = !note.isPinned;
    }
  };

  const startEditing = (noteId: string) => {
    editingNoteId.value = noteId;
  };

  const stopEditing = () => {
    editingNoteId.value = null;
  };

  const sortedNotes = computed(() => {
    return [...notes.value].sort((a, b) => {
      // Закрепленные заметки всегда сверху
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // Остальные сортируются по дате создания
      return b.createdAt - a.createdAt;
    });
  });

  return {
    notes: sortedNotes,
    editingNoteId,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    startEditing,
    stopEditing
  };
}
