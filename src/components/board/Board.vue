<template>
  <div
    ref="boardRef"
    class="board"
    @click="handleBoardClick"
    @mousemove="onMouseMove"
    @mouseup="stopDragging"
  >
    <div class="notes-container">
      <NoteItem
        v-for="note in notes"
        :key="note.id"
        :note="note"
        :is-editing="editingNoteId === note.id"
        @update:text="text => updateNote(note.id, { text })"
        @move="startDragging(note, $event)"
        @pin="togglePin(note.id)"
        @delete="deleteNote(note.id)"
        @edit="startEditing(note.id)"
        @blur="stopEditing"
      />
    </div>

    <ColorPalette @select-color="createNewNote" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { NoteColor } from '@/types/note';
import { useNotes } from '@/composables/useNotes';
import { useDrag } from '@/composables/useDrag';
import NoteItem from './NoteItem.vue';
import ColorPalette from './ColorPalette.vue';

const props = defineProps<{
  boardId: string;
}>();

const boardRef = ref<HTMLElement | null>(null);

const {
  notes,
  editingNoteId,
  createNote,
  updateNote,
  deleteNote,
  togglePin,
  startEditing,
  stopEditing
} = useNotes(props.boardId);

const {
  startDragging,
  onMouseMove,
  stopDragging
} = useDrag();

const createNewNote = (color: NoteColor) => {
  const note = createNote(color);
  startEditing(note.id);
};

const handleBoardClick = (event: MouseEvent) => {
  if (event.target === boardRef.value) {
    stopEditing();
  }
};

onMounted(() => {
  // Если заметок нет, создаем первую
  if (notes.value.length === 0) {
    createNewNote('pink');
  }
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.board {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient($color-border 1px, transparent 1px);
  background-size: $grid-size $grid-size;
}

.notes-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
