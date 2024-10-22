<template>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      :d="pinned ? pinnedPath : unpinnedPath"
      fill="currentColor"
    />
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  pinned: boolean;
}>();

const pinnedPath = "M9.5 1C9.5 0.447715 9.05228 0 8.5 0H7.5C6.94772 0 6.5 0.447715 6.5 1V2H4.5C3.94772 2 3.5 2.44772 3.5 3V4C3.5 4.55228 3.94772 5 4.5 5H11.5C12.0523 5 12.5 4.55228 12.5 4V3C12.5 2.44772 12.0523 2 11.5 2H9.5V1ZM11 6H5L6 15C6 15.5523 6.44772 16 7 16H9C9.55228 16 10 15.5523 10 15L11 6Z";

const unpinnedPath = "M13.5 4.5L11.5 2.5L12.5 1.5C13.0523 1.5 13.5 1.94772 13.5 2.5V4.5ZM10.5 3.5L8.5 1.5H7.5C6.94772 1.5 6.5 1.94772 6.5 2.5V3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V5.5C3.5 6.05228 3.94772 6.5 4.5 6.5H11.5C12.0523 6.5 12.5 6.05228 12.5 5.5V4.5L10.5 3.5ZM11 7.5H5L6 14.5C6 15.0523 6.44772 15.5 7 15.5H9C9.55228 15.5 10 15.0523 10 14.5L11 7.5Z";
</script>
