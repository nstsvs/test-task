import { ref, watch } from 'vue';

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const data = ref<T>(defaultValue);
  const saved = localStorage.getItem(key);

  if (saved) {
    data.value = JSON.parse(saved);
  }

  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  return data;
}
