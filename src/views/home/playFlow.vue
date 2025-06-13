<script setup lang="ts">
import playTable from '@/views/home/components/playTable.vue'
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'

const { t } = useI18n()

const flowColumns = ref<TableColumnsType[]>([
  [
    {
      title: t('home.game_flow'),
      width: 520,
      dataIndex: 'content',
      key: 'content',
      align: 'left'
    },
    {
      title: t('unit.people_num'),
      width: 120,
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      width: 120,
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      width: 120,
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.composite_rtp'),
      width: 120,
      dataIndex: 'comprehensive_rtp',
      key: 'comprehensive_rtp',
      align: 'center',
      sorter: true
    }
  ]
])
</script>
<template>
  <playTable icon="playFlow" title="game_flow" :columns="flowColumns" analysisType="flow" />
</template>
<style lang="scss" scoped></style>
