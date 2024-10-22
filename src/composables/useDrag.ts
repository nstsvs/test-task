import { ref, onMounted, onUnmounted } from 'vue';
import type { Note, Position } from '@/types/note';

export function useDrag() {
  const draggedNote = ref<Note | null>(null);
  const dragOffset = ref<Position>({ x: 0, y: 0 });
  const isDragging = ref(false);

  const startDragging = (note: Note, event: MouseEvent) => {
    if (note.isPinned) return;

    draggedNote.value = note;
    isDragging.value = true;

    const noteElement = (event.target as HTMLElement).closest('.note');
    if (noteElement) {
      const rect = noteElement.getBoundingClientRect();
      dragOffset.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!draggedNote.value || !isDragging.value) return;

    const newX = event.clientX - dragOffset.value.x;
    const newY = event.clientY - dragOffset.value.y;

    // Ограничиваем перемещение границами окна
    draggedNote.value.position = {
      x: Math.max(0, Math.min(newX, window.innerWidth - 250)),
      y: Math.max(0, Math.min(newY, window.innerHeight - 150))
    };
  };

  const stopDragging = () => {
    draggedNote.value = null;
    isDragging.value = false;
  };

  // Обработка случая, когда мышь покидает окно во время перетаскивания
  const onMouseLeave = () => {
    if (isDragging.value) {
      stopDragging();
    }
  };

  onMounted(() => {
    document.addEventListener('mouseleave', onMouseLeave);
  });

  onUnmounted(() => {
    document.removeEventListener('mouseleave', onMouseLeave);
  });

  return {
    draggedNote,
    isDragging,
    startDragging,
    onMouseMove,
    stopDragging
  };
}
