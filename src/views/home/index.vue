<script lang="ts" setup>
import topCard from '@/views/home/topCard.vue'
import operatingTrendsChart from '@/views/home/operatingTrendsChart.vue'
</script>
<template>
  <topCard />
  <a-row justify="start" class="gap-2.5">
    <a-col :span="12">
      <operatingTrendsChart />
    </a-col>
  </a-row>
</template>
<style lang="scss" scoped></style>
