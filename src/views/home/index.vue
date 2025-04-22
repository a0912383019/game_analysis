<script lang="ts" setup>
import topCard from '@/views/home/topCard.vue'
import operatingTrendsChart from '@/views/home/operatingTrendsChart.vue'
import playCombination from '@/views/home/playCombination.vue'
</script>
<template>
  <topCard />
  <a-row justify="center">
    <a-col :span="12">
      <!-- <operatingTrendsChart class="!ml-[15px] !mr-[5px]" /> -->
    </a-col>
    <a-col :span="12">
      <!-- <operatingTrendsChart /> -->
    </a-col>
    <a-col :span="24">
      <playCombination class="!mx-[15px]" />
    </a-col>
  </a-row>
</template>
<style lang="scss" scoped></style>
