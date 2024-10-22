<template>
  <div class="boards-container">
    <div class="boards-header">
      <h2>Список открытых досок</h2>
      <button @click="createBoard" class="create-board-btn">
        Создать новую доску
      </button>
    </div>

    <div class="boards-list">
      <div
        v-for="board in boards"
        :key="board.id"
        class="board-item"
        :class="{ 'active': activeBoard?.id === board.id }"
        @click="selectBoard(board)"
      >
        {{ board.name }}
        <button @click.stop="deleteBoard(board)" class="delete-board-btn">✖</button>
      </div>
    </div>

    <Board
      v-if="activeBoard"
      :boardId="activeBoard.id"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Board from './board/Board.vue'

interface BoardType {
  id: string;
  name: string;
}

export default defineComponent({
  name: 'BoardsList',
  components: {
    Board
  },
  setup() {
    const boards = ref<BoardType[]>([])
    const activeBoard = ref<BoardType | null>(null)

    const createBoard = () => {
      const name = prompt('Введите название доски:')
      if (!name) return

      const newBoard: BoardType = {
        id: Date.now().toString(),
        name
      }

      boards.value.push(newBoard)
      saveBoards()
      selectBoard(newBoard)
    }

    const selectBoard = (board: BoardType) => {
      activeBoard.value = board
    }

    const deleteBoard = (board: BoardType) => {
      const index = boards.value.findIndex(b => b.id === board.id)
      if (index !== -1) {
        boards.value.splice(index, 1)
        if (activeBoard.value?.id === board.id) {
          activeBoard.value = boards.value[0] || null
        }
        saveBoards()
      }
    }

    const saveBoards = () => {
      localStorage.setItem('boards', JSON.stringify(boards.value))
    }

    const loadBoards = () => {
      const savedBoards = localStorage.getItem('boards')
      if (savedBoards) {
        boards.value = JSON.parse(savedBoards)
        if (boards.value.length > 0) {
          activeBoard.value = boards.value[0]
        }
      }
    }

    loadBoards()

    return {
      boards,
      activeBoard,
      createBoard,
      selectBoard,
      deleteBoard
    }
  }
})
</script>

<style scoped>
.boards-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.boards-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.create-board-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.boards-list {
  display: flex;
  padding: 10px;
  background: #f0f0f0;
  overflow-x: auto;
}

.board-item {
  padding: 10px 20px;
  margin-right: 10px;
  background: white;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.board-item.active {
  background: #e3f2fd;
}

.delete-board-btn {
  margin-left: 10px;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
