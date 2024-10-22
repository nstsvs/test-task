<template>
  <div class="color-palette">
    <button
      v-for="color in colors"
      :key="color"
      class="color-button"
      :class="color"
      :title="`Создать ${colorNames[color]} заметку`"
      @click="$emit('select-color', color)"
    >
      <span class="visually-hidden">
        Создать {{ colorNames[color] }} заметку
      </span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { NoteColor } from '@/types/note';

const colors: NoteColor[] = ['pink', 'blue', 'yellow'];

const colorNames: Record<NoteColor, string> = {
  pink: 'розовую',
  blue: 'синюю',
  yellow: 'жёлтую'
};

defineEmits<{
  (e: 'select-color', color: NoteColor): void;
}>();
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.color-palette {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-button {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.pink {
    background: $color-note-pink;
  }

  &.blue {
    background: $color-note-blue;
  }

  &.yellow {
    background: $color-note-yellow;
  }
}
</style>
