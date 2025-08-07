<template>
  <!-- <ul class="tag-list" v-if="tags?.length">
    <li
      v-for="(tag, idx) in tags"
      :key="idx"
      class="tag-list-item"
    >
      {{ tag }}
    </li>
  </ul> -->
  <div class="tags-container" v-if="tags?.length">
    <span
      v-for="(tag, idx) in tags"
      :key="idx"
      class="tag-item"
    >
    {{ tag }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()
const tags = computed(() => {
  const c = frontmatter.value.tags
  return Array.isArray(c) ? c : []
})
</script>

<style scoped>
.tag-item {
  display: inline-block;
  padding: 0.3em 0.7em;
  font-size: 0.9rem;
  color: #fff;
  background: linear-gradient(135deg, #2196f3, #42a5f5);
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(33, 150, 243, 0.3);
  transition: box-shadow 0.2s ease;
  white-space: nowrap;
}

.tag-item:hover {
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
}

/* 新增：标签容器布局 */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;         /* 水平 & 垂直间距 */
  margin: 1rem 0;      /* 容器上下间距 */
  align-items: center; /* 垂直居中对齐 */
}
/* .tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin-top: 1rem;
  list-style: none;
  padding: 0;
}

.tag-list-item {
  display: inline-block;
  padding: 0.3em 0.7em;
  font-size: 0.9rem;
  color: #fff;
  background: linear-gradient(135deg, #2196f3, #42a5f5);
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(33, 150, 243, 0.3);
  transition: box-shadow 0.2s ease;
}

.tag-list-item:hover {
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
} */
</style>
