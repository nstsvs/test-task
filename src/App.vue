<template>
  <div class="app">
    <header class="header">
      <h1>Доска заметок</h1>
      <button
        v-if="boards.length > 0"
        class="create-board-btn"
        @click="createNewBoard"
      >
        Создать доску
      </button>
    </header>

    <div v-if="boards.length > 0" class="boards-list">
      <button
        v-for="board in boards"
        :key="board.id"
        class="board-btn"
        :class="{ active: activeBoard?.id === board.id }"
        @click="setActiveBoard(board)"
      >
        {{ board.name }}
        <button
          v-if="boards.length > 1"
          class="delete-board-btn"
          @click.stop="deleteBoard(board.id)"
        >
          ✕
        </button>
      </button>
    </div>

    <main class="main">
      <div v-if="boards.length === 0" class="empty-state">
        <p>У вас пока нет досок с заметками</p>
        <button class="create-board-btn" @click="createNewBoard">
          Создать первую доску
        </button>
      </div>

      <Board
        v-else-if="activeBoard"
        :board-id="activeBoard.id"
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { BoardType } from '@/types/note';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { generateId } from '@/utils/Helpers';
import Board from './components/board/Board.vue';

const boards = useLocalStorage<BoardType[]>('boards', []);
const activeBoard = ref<BoardType | null>(null);

const createNewBoard = () => {
  const name = prompt('Введите название доски:');
  if (!name) return;

  const newBoard: BoardType = {
    id: generateId(),
    name,
    createdAt: Date.now()
  };

  boards.value.push(newBoard);
  setActiveBoard(newBoard);
};

const setActiveBoard = (board: BoardType) => {
  activeBoard.value = board;
};

const deleteBoard = (boardId: string) => {
  if (!confirm('Вы уверены, что хотите удалить эту доску?')) return;

  const index = boards.value.findIndex(b => b.id === boardId);
  if (index !== -1) {
    boards.value.splice(index, 1);
    if (activeBoard.value?.id === boardId) {
      activeBoard.value = boards.value[0] || null;
    }
  }
};

onMounted(() => {
  if (boards.value.length > 0) {
    activeBoard.value = boards.value[0];
  }
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as *;
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $color-border;

  h1 {
    font-size: 24px;
    font-weight: 500;
  }
}

.boards-list {
  padding: 8px;
  display: flex;
  gap: 8px;
  background: #f5f5f5;
  border-bottom: 1px solid $color-border;
  overflow-x: auto;
}

.board-btn {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid $color-border;
  border-radius: 4px;
  white-space: nowrap;

  &.active {
    background: #e3f2fd;
    border-color: #90caf9;
  }
}

.delete-board-btn {
  padding: 2px 6px;
  color: $color-danger;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
}

.create-board-btn {
  padding: 8px 16px;
  background: $color-primary;
  color: white;
  border-radius: 4px;
  transition: background-color $transition-duration ease;

  &:hover {
    background: darken($color-primary, 5%);
  }
}

.main {
  flex: 1;
  position: relative;
}

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
  color: rgba($color-text, 0.6);
}
</style>
