<script lang="ts" setup>
import ViewPageContainer from '../components/container/index.vue'

const query = useQuery()
</script>

<template>
  <ViewPageContainer :page-id="query.pageId" />
</template>
