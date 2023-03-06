<script lang="ts" setup>
defineProps<{
  buttonLink: string,
  buttonText: string
}>()

const { data: articles } = await useBlogLastArticles()

const absoluteArticles = articles.value?.map((article) => {
  article._path = `https://le-classement.fr${article._path}`
  article.cover.src = `https://le-classement.fr${article.cover.src}`
  return article
}) ?? []
</script>

<template>
  <ol v-if="articles" class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 md:gap-4 xl:gap-16">
    <li v-for="article in absoluteArticles" :key="article._path">
      <BlogCard :article="article" rel="noopener" />
    </li>
  </ol>
  <div
    class="mt-10 flex flex-row justify-center"
  >
    <ClassementLink part="classement" :button-link="buttonLink" :button-text="buttonText" rel="noopener" target="_blank" />
  </div>
</template>
