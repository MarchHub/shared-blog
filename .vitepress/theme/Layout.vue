<template>
    <Layout>
        <template #aside-ads-before>
            <TagList />
        </template>
        <template #doc-footer-before>
            <Contributors />
        </template>
    </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme-without-fonts";
import { nextTick, provide } from "vue";
import { useData, useRouter } from "vitepress";

import Contributors from "./components/Contributors.vue";
import TagList from "./components/TagList.vue";

const { Layout } = DefaultTheme;


</script>

<style></style>