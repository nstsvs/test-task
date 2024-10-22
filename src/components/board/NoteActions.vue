<template>
  <div class="note-actions">
    <button
      class="action-btn move-btn"
      title="Переместить"
      @mousedown.stop="$emit('move', $event)"
    >
      <icon-move />
    </button>
    <button
      class="action-btn pin-btn"
      title="Закрепить"
      @click.stop="$emit('pin')"
    >
      <icon-pin :pinned="isPinned" />
    </button>
    <button
      class="action-btn delete-btn"
      title="Удалить"
      @click.stop="$emit('delete')"
    >
      <icon-delete />
    </button>
  </div>
</template>

<script lang="ts" setup>
import IconMove from '@/components/icons/IconMove.vue';
import IconPin from '@/components/icons/IconPin.vue';
import IconDelete from '@/components/icons/IconDelete.vue';

defineProps<{
  isPinned: boolean;
}>();

defineEmits<{
  (e: 'move', event: MouseEvent): void;
  (e: 'pin'): void;
  (e: 'delete'): void;
}>();
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.note-actions {
  position: absolute;
  top: -36px;
  right: 0;
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgba(44, 44, 44, 0.9);
  border-radius: 4px;
  transition: opacity $transition-duration ease;
}

.action-btn {
  padding: 4px;
  color: white;
  border-radius: 4px;
  transition: background-color $transition-duration ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
