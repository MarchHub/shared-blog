// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ArticleMetadata from './components/ArticleMetadata.vue'
import './style.css'
import './styles/index.css'
import './styles/vars.css'
import Contributors from './components/Contributors.vue'

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'

export default {
  extends: DefaultTheme,
  setup() {
      const route = useRoute();
      const initZoom = () => {
        // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
        mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      };
      onMounted(() => {
        initZoom();
      });
      watch(
        () => route.path,
        () => nextTick(() => initZoom())
      );
    },

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-footer-before': () => h(Contributors)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('Contributors', Contributors)
    app.use(TwoslashFloatingVue)
  }
} satisfies Theme