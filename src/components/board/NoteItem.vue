<template>
  <div
    ref="noteRef"
    class="note"
    :class="[note.color, { 'editing': isEditing, 'pinned': note.isPinned }]"
    :style="noteStyle"
    @click="onNoteClick"
  >
    <NoteActions
      v-if="isEditing"
      :is-pinned="note.isPinned"
      @move="$emit('move', $event)"
      @pin="$emit('pin')"
      @delete="$emit('delete')"
    />

    <textarea
      ref="textareaRef"
      v-model="noteText"
      :readonly="!isEditing"
      placeholder="Введите текст..."
      @input="onTextInput"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>

    <div class="note-footer">
      Ководство. § {{ note.id }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { Note } from '@/types/note';
import NoteActions from './NoteActions.vue';

const props = defineProps<{
  note: Note;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:text', value: string): void;
  (e: 'move', event: MouseEvent): void;
  (e: 'pin'): void;
  (e: 'delete'): void;
  (e: 'edit'): void;
  (e: 'blur'): void;
}>();

const noteRef = ref<HTMLElement | null>(null);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const noteText = computed({
  get: () => props.note.text,
  set: (value) => emit('update:text', value)
});

const noteStyle = computed(() => ({
  transform: `translate(${props.note.position.x}px, ${props.note.position.y}px)`
}));

const onNoteClick = () => {
  if (!props.isEditing) {
    emit('edit');
  }
};

const onTextInput = () => {
  if (textareaRef.value) {
    // Автоматическое изменение высоты textarea
    textareaRef.value.style.height = 'auto';
    textareaRef.value.style.height = `${textareaRef.value.scrollHeight}px`;
  }
};

const onFocus = () => {
  if (textareaRef.value && !props.isEditing) {
    textareaRef.value.blur();
  }
};

const onBlur = () => {
  emit('blur');
};

// Устанавливаем каретку в начале строки
watch(() => props.isEditing, (newValue) => {
  if (newValue && textareaRef.value) {
    textareaRef.value.focus();
    textareaRef.value.setSelectionRange(0, 0);
  }
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;

.note {
  position: absolute;
  width: $note-width;
  min-height: $note-min-height;
  border-radius: 0;
  transition: transform 0.1s ease;
  z-index: $z-note;

  &.editing {
    z-index: $z-note-active;
  }

  &.pinned::before {
    content: '';
    position: absolute;
    top: -8px;
    right: 8px;
    width: 8px;
    height: 8px;
    background: $color-text;
    border-radius: 50%;
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

  textarea {
    width: 100%;
    min-height: 100px;
    padding: 15px;
    border: none;
    resize: none;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    line-height: 1.5;
    color: $color-text;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: rgba($color-text, 0.5);
    }
  }

  .note-footer {
    padding: 8px 15px;
    font-size: 12px;
    color: rgba($color-text, 0.6);
  }
}
</style>
