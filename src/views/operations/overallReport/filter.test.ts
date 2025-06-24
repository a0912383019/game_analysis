import { it, describe, expect, afterEach, vi, beforeEach } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import filter from '@/views/operations/overallReport/filter.vue'
import * as module from '@/utils/commonUtils'
import { useOperationsOverallReportStore } from '@/stores'
import dayjs from '@/utils/appDayjs'

vi.mock('@/utils/filterUtils', () => ({
  memberValueRule: vi.fn(),
  dateDurationRule: vi.fn(),
  loadData: vi.fn(),
  tidyMember: vi.fn().mockReturnValue('tom,lily,zack'),
  generateGamePlayParam: vi.fn()
}))

describe('filter', () => {
  let wrapper: VueWrapper<any>
  let operationsOverallReportStore: ReturnType<typeof useOperationsOverallReportStore>
  const mockDate: Dayjs = dayjs('2024-03-10T12:00:00')

  beforeEach(() => {
    vi.setSystemTime(mockDate.toDate())

    vi.spyOn(module, 'getSessionStorageEntity').mockImplementation(() => {
      return {
        platform_halls: [{ hall_id: 1, login_code: 'bmw', name: '寶馬-我是廳名' }],
        platform_lobbies: [
          { lobby: 5, lobby_name: 'max影音' },
          { lobby: 66, lobby_name: 'max AR/VR' }
        ],
        platform_devices: [
          {
            id: 0,
            name: 'PC',
            created_time: '2025-04-22T16:43:08+08:00'
          },
          {
            id: 1,
            name: '其他',
            created_time: '2025-04-22T16:43:08+08:00'
          },
          {
            id: 2,
            name: 'iOS手機',
            created_time: '2025-04-22T16:43:08+08:00'
          }
        ]
      }
    })

    wrapper = shallowMount(filter, {
      global: {
        plugins: [i18n, createTestingPinia({ createSpy: vi.fn })]
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    wrapper.unmount()
  })

  it('components', async () => {
    wrapper = shallowMount(filter, {
      global: {
        plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
        stubs: {
          AForm: {
            template: '<div><slot /></div>'
          },
          ARow: {
            template: '<div><slot /></div>'
          },
          ACol: {
            template: '<div><slot /></div>'
          },
          AFormItem: {
            template: '<div><slot /></div>'
          }
        }
      }
    })

    expect(wrapper.findComponent({ name: 'ant-select' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ant-input' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ant-cascader' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ant-date-range' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'cdp-button-icon' }).exists()).toBeTruthy()
  })

  it('formState init correctly', () => {
    expect(wrapper.vm.formState.memberValue).toBe('')
    expect(wrapper.vm.formState.dateDuration).toEqual([undefined, undefined])
  })

  it('rules', () => {
    expect(wrapper.vm.rules.dateDuration[0].validator).toBeInstanceOf(Function)
  })

  it('hall variables', () => {
    const hallOptions = [
      {
        label: '全部',
        value: 0
      },
      {
        label: '寶馬-我是廳名 [bmw]',
        value: 1
      }
    ]
    expect(wrapper.vm.hallValue).toStrictEqual(0)
    expect(wrapper.vm.hallOptions).toStrictEqual(hallOptions)
    expect(wrapper.vm.hallProps).toStrictEqual({
      allowClear: false,
      options: hallOptions,
      placeHolderText: '請選擇數位區',
      placeHolderValuableText: '數位區塊'
    })
  })

  it('member variables', () => {
    expect(wrapper.vm.accountOrId).toStrictEqual('account')
    expect(wrapper.vm.memberProps).toStrictEqual({
      originPlaceHolder: '多筆查詢請以半形逗號分隔',
      placeHolderText: '會員'
    })
  })

  it('gamePlay variables', () => {
    const gamePlayOptions = [
      {
        isLeaf: false,
        label: 'max影音',
        value: 5
      },
      {
        isLeaf: false,
        label: 'max AR/VR',
        value: 66
      }
    ]
    expect(wrapper.vm.gamePlayValue).toStrictEqual([])
    expect(wrapper.vm.gamePlayOptions).toStrictEqual(gamePlayOptions)
    expect(wrapper.vm.gamePlayProps).toStrictEqual({
      loadData: expect.any(Function),
      options: gamePlayOptions,
      placeHolderText: '請選擇媒體及內容',
      placeHolderValuableText: '媒體及內容'
    })
  })

  it('device variables', () => {
    const deviceOptions = [
      {
        label: 'PC',
        value: 0
      },
      {
        label: '其他',
        value: 1
      },
      {
        label: 'iOS手機',
        value: 2
      }
    ]
    expect(wrapper.vm.deviceTypeValue).toStrictEqual(undefined)
    expect(wrapper.vm.deviceTypeOptions).toStrictEqual(deviceOptions)
    expect(wrapper.vm.deviceTypeProps).toStrictEqual({
      allowClear: false,
      defaultAll: false,
      mode: 'multiple',
      options: deviceOptions,
      placeHolderText: '請選擇裝置',
      placeHolderValuableText: '裝置'
    })
  })

  it('dateDurationChange', () => {
    expect(wrapper.vm.formState.dateDuration).toStrictEqual([undefined, undefined])

    wrapper.vm.dateDurationChange([dayjs('2024-03-10'), dayjs('2024-03-10')])
    expect(wrapper.vm.formState.dateDuration).toStrictEqual([
      dayjs('2024-03-10'),
      dayjs('2024-03-10')
    ])
  })

  it('handleSearch', async () => {
    operationsOverallReportStore = useOperationsOverallReportStore()
    expect(operationsOverallReportStore.searchParams).toStrictEqual({
      dateDuration: [undefined, undefined],
      deviceTypeValue: undefined,
      gamePlayValue: [],
      hallValue: 0,
      memberType: '',
      memberValue: []
    })

    let validate = vi.fn().mockResolvedValue(true)
    wrapper.vm.$refs.formRef.validate = validate

    await wrapper.vm.handleSearch()
    expect(wrapper.vm.formState.memberValue).toStrictEqual('tom,lily,zack')
    expect(operationsOverallReportStore.searchParams).toStrictEqual({
      dateDuration: [undefined, undefined],
      deviceTypeValue: undefined,
      gamePlayValue: undefined,
      hallValue: 0,
      memberType: 'account',
      memberValue: ['tom', 'lily', 'zack']
    })
    expect(operationsOverallReportStore.isFiltered).toStrictEqual(1710043200000)
  })
})
