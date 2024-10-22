export type NoteColor = 'pink' | 'blue' | 'yellow';

export interface Position {
  x: number;
  y: number;
}

export interface Note {
  id: string;
  text: string;
  position: Position;
  color: NoteColor;
  isPinned: boolean;
  boardId: string;
  createdAt: number;
}

export interface BoardType {
  id: string;
  name: string;
  createdAt: number;
}
