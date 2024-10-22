import type { Position } from '@/types/note';

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getRandomPosition(bounds: { width: number; height: number }): Position {
  return {
    x: Math.random() * (bounds.width - 250),  // 250 - ширина заметки
    y: Math.random() * (bounds.height - 150)   // 150 - высота заметки
  };
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
