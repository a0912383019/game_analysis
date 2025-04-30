<script setup lang="ts">
import playTable from '@/views/home/components/playTable.vue'
import { useI18n } from 'vue-i18n'
import type { TableColumnsType } from 'ant-design-vue'

const { t } = useI18n()

const combinationColumns = ref<TableColumnsType[]>([
  [
    {
      title: t('home.game_combination'),
      width: 380,
      dataIndex: 'content',
      key: 'content',
      align: 'center'
    },
    {
      title: t('data_name.people_proportion'),
      dataIndex: 'user_count_ratio',
      key: 'user_count_ratio',
      align: 'center',
      sorter: true
    },
    {
      title: t('unit.people_num'),
      dataIndex: 'user_count',
      key: 'user_count',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.bet_amount'),
      dataIndex: 'bet_amount',
      key: 'bet_amount',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: t('data_name.payoff'),
      dataIndex: 'payoff',
      key: 'payoff',
      align: 'center',
      sorter: true
    },
    {
      title: t('data_name.composite_rtp'),
      dataIndex: 'comprehensive_rtp',
      key: 'comprehensive_rtp',
      align: 'center',
      sorter: true
    }
  ]
])
</script>
<template>
  <playTable
    icon="playSet"
    title="game_combination"
    :columns="combinationColumns"
    analysisType="combination"
  />
</template>
<style lang="scss" scoped></style>
