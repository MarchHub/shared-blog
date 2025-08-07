<!-- <template>
  <section class="column-hero">
    <h1 class="column-title">{{ title }}</h1>
    <p class="column-desc">{{ description }}</p>
  </section>

  <section class="column-list">
    <article
      v-for="item in sortedPages"
      :key="item.link"
      class="column-card"
    >
      <a :href="item.link" class="card-cover" v-if="item.cover">
        <img :src="item.cover" :alt="item.title" />
      </a>
      <div class="card-body">
        <h2 class="card-title">
          <a :href="item.link">{{ item.title }}</a>
        </h2>
        <time class="card-date">{{ item.date }}</time>
        <p class="card-excerpt">{{ item.excerpt }}</p>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { defineProps } from 'vue'

/**
 * Props: category 对应 posts/<category> 目录
 *        title、description 用于 Hero 区展示
 */
const props = defineProps<{
  category: string
  title: string
  description: string
}>()

// 批量加载该专栏下所有 Markdown
const modules = import.meta.globEager(`../posts/${props.category}/**/*.md`)

// 解析并排序
const sortedPages = computed(() => {
  const pages = Object.entries(modules).map(([path, mod]: any) => {
    const fm = mod.frontmatter || {}
    const link = path
      .replace('../', '/')
      .replace(/\.md$/, '')
    return {
      title: fm.title || 'Untitled',
      date: fm.date || '',
      excerpt: fm.excerpt || '',
      cover: fm.cover || '',
      link
    }
  })

  // 按日期降序
  return pages.sort((a, b) => (b.date || '').localeCompare(a.date))
})
</script> -->
