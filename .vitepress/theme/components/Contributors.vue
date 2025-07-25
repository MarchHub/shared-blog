<template>
  <div v-if="list.length" class="contributors-wrapper">
    <h4 class="contributors-title">{{ title }}</h4>
    <ul class="contributors-list">
      <li
        v-for="(item, idx) in list"
        :key="idx"
        class="contributors-item"
      >
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          :title="item.name"
        >
          <img
            class="contributors-avatar"
            :src="item.avatar"
            :alt="item.name"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const title = '本文贡献者'

// 从 frontmatter 里取出 contributors 数组，若不存在则空数组
const list = computed(() => {
  const c = frontmatter.value.contributors
  return Array.isArray(c) ? c : []
})
</script>

<style scoped>
.contributors-wrapper {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.contributors-title {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: var(--vp-c-text);
}

.contributors-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.contributors-item {
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}

.contributors-avatar {
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--vp-c-divider);
}
</style>
