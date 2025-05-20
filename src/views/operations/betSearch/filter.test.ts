import { it, describe, expect, afterEach, vi, beforeEach } from 'vitest'
import { VueWrapper, shallowMount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { i18n } from '@/global/i18n'
import filter from '@/views/operations/betSearch/filter.vue'
import * as module from '@/utils/commonUtils'
import { useOperationsBetSearchStore, useGlobalStore } from '@/stores'
import dayjs from '@/utils/appDayjs'

vi.mock('@/../public/js/system_config', () => ({
  platformDefaultHall: {
    bbin: {
      hall_id: 1
    },
    bbgp: {
      hall_id: 3820605
    },
    xctw: {
      hall_id: 19
    },
    xcmy: {
      hall_id: 29
    }
  }
}))

vi.mock('@/utils/commonApi', () => ({
  queryLobbyGames: vi.fn().mockResolvedValue([
    {
      game_code: '5001',
      game_name: '水果拉霸',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5002',
      game_name: '撲克拉霸',
      enable: 0,
      serial_info: []
    }
  ])
}))

vi.mock('@/utils/filterUtils', () => ({
  memberValueRule: vi.fn(),
  dateDurationRule: vi.fn(),
  timeDurationRule: vi.fn(),
  tidyMember: vi.fn().mockReturnValue('tom,lily,zack')
}))

describe('filter', () => {
  let wrapper: VueWrapper<any>
  let globalStore: ReturnType<typeof useGlobalStore>
  let operationsBetSearchStore: ReturnType<typeof useOperationsBetSearchStore>
  const mockDate: Dayjs = dayjs('2024-03-10T12:00:00')

  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
    globalStore = useGlobalStore()
    globalStore.currentPlatform = 'bbin'

    vi.setSystemTime(mockDate.toDate())

    vi.spyOn(module, 'getSessionStorageEntity').mockImplementation(() => {
      return {
        platform_halls: [{ hall_id: 1, login_code: 'bmw', name: '寶馬-我是廳名' }],
        platform_lobbies: [
          { lobby: 5, lobby_name: 'BB電子' },
          { lobby: 66, lobby_name: 'BB棋牌' }
        ]
      }
    })

    vi.spyOn(module, 'getDefaultLobbyByTarget').mockImplementation(() => {
      return 19
    })

    wrapper = shallowMount(filter, {
      global: {
        plugins: [i18n],
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
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
    wrapper.unmount()
  })

  it('components', async () => {
    expect(wrapper.findComponent({ name: 'ant-select' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ant-input' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ant-date-range' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ant-time-range' }).exists()).toBeFalsy()
    expect(wrapper.findComponent({ name: 'cdp-button-icon' }).exists()).toBeTruthy()

    wrapper.vm.searchTypeValue = 'bet'
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent({ name: 'ant-date-range' }).exists()).toBeFalsy()
    expect(wrapper.findComponent({ name: 'ant-time-range' }).exists()).toBeTruthy()
  })

  it('formState init correctly', () => {
    expect(wrapper.vm.formState.hallValue).toBe(1)
    expect(wrapper.vm.formState.memberValue).toBe('')
    expect(wrapper.vm.formState.timeDuration).toEqual([undefined, undefined])
    expect(wrapper.vm.formState.dateDuration).toEqual([undefined, undefined])
  })

  it('rules', () => {
    expect(wrapper.vm.rules.hallValue).toStrictEqual([
      {
        message: '請至少選擇一個廳',
        required: true
      }
    ])
    expect(wrapper.vm.rules.memberValue[0].validator).toBeInstanceOf(Function)
    expect(wrapper.vm.rules.timeDuration[0].validator).toBeInstanceOf(Function)
    expect(wrapper.vm.rules.dateDuration[0].validator).toBeInstanceOf(Function)
  })

  it('hall variables', () => {
    expect(wrapper.vm.hallOptions).toStrictEqual([{ label: '寶馬-我是廳名 [bmw]', value: 1 }])
    expect(wrapper.vm.hallProps).toStrictEqual({
      allowClear: false,
      options: [
        {
          label: '寶馬-我是廳名 [bmw]',
          value: 1
        }
      ],
      placeHolderText: '請選擇廳',
      placeHolderValuableText: '廳'
    })
  })

  it('member variables', () => {
    expect(wrapper.vm.accountOrId).toStrictEqual('account')
    expect(wrapper.vm.memberProps).toStrictEqual({
      originPlaceHolder: '多筆查詢請以半形逗號分隔',
      placeHolderText: '會員'
    })
  })

  it('lobby variables', () => {
    expect(wrapper.vm.lobbyValue).toStrictEqual(19)
    expect(wrapper.vm.lobbyOptions).toStrictEqual([
      {
        label: 'BB電子',
        value: 5
      },
      {
        label: 'BB棋牌',
        value: 66
      }
    ])
    expect(wrapper.vm.lobbyProps).toStrictEqual({
      allowClear: false,
      options: [
        {
          label: 'BB電子',
          value: 5
        },
        {
          label: 'BB棋牌',
          value: 66
        }
      ],
      placeHolderText: '請選擇遊戲大廳',
      placeHolderValuableText: '遊戲大廳'
    })
  })

  it('generateLobbyGamesOptions & game type variables', async () => {
    // generateLobbyGamesOptions 由 watch 觸發
    await flushPromises()
    expect(wrapper.vm.gameValue).toStrictEqual([])
    expect(wrapper.vm.gameOptions).toStrictEqual([
      {
        label: '水果拉霸',
        value: '5001'
      },
      {
        label: '撲克拉霸',
        value: '5002'
      }
    ])
    expect(wrapper.vm.gameLoading).toBe(false)
    expect(wrapper.vm.gameProps).toStrictEqual({
      allowClear: false,
      defaultAll: false,
      isLoading: false,
      mode: 'multiple',
      options: [
        {
          label: '水果拉霸',
          value: '5001'
        },
        {
          label: '撲克拉霸',
          value: '5002'
        }
      ],
      placeHolderText: '請選擇遊戲',
      placeHolderValuableText: '遊戲'
    })
  })

  it('search type variables', () => {
    expect(wrapper.vm.searchTypeValue).toStrictEqual('settlement_date')
    expect(wrapper.vm.searchTypeOptions).toStrictEqual([
      {
        label: '結算日期',
        value: 'settlement_date'
      },
      {
        label: '注單',
        value: 'bet'
      }
    ])
    expect(wrapper.vm.searchTypeProps).toStrictEqual({
      allowClear: false,
      options: [
        {
          label: '結算日期',
          value: 'settlement_date'
        },
        {
          label: '注單',
          value: 'bet'
        }
      ],
      placeHolderValuableText: '搜尋方式'
    })
  })

  it('timeDurationChange & datePickerChangeHandler', () => {
    expect(wrapper.vm.formState.timeDuration).toStrictEqual([undefined, undefined])
    expect(wrapper.vm.formState.dateDuration).toStrictEqual([undefined, undefined])

    wrapper.vm.timeDurationChange([mockDate, mockDate.add(1, 'hour')])
    expect(wrapper.vm.formState.timeDuration[0].format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2024-03-10 12:00:00'
    )
    expect(wrapper.vm.formState.timeDuration[1].format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2024-03-10 13:00:00'
    )

    wrapper.vm.datePickerChangeHandler([mockDate, mockDate.add(1, 'day')])
    expect(wrapper.vm.formState.dateDuration[0].format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2024-03-10 12:00:00'
    )
    expect(wrapper.vm.formState.dateDuration[1].format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2024-03-11 12:00:00'
    )
  })

  it('handleSearch', async () => {
    operationsBetSearchStore = useOperationsBetSearchStore()
    expect(operationsBetSearchStore.searchParams).toStrictEqual({
      dateDuration: [undefined, undefined],
      gameValue: [],
      hallValue: undefined,
      lobbyValue: undefined,
      memberType: '',
      memberValue: [],
      searchTypeValue: '',
      timeDuration: [undefined, undefined]
    })

    let validate = vi.fn().mockResolvedValue(true)
    wrapper.vm.$refs.formRef.validate = validate

    await wrapper.vm.handleSearch()
    expect(wrapper.vm.formState.memberValue).toStrictEqual('tom,lily,zack')
    expect(operationsBetSearchStore.searchParams).toStrictEqual({
      dateDuration: [undefined, undefined],
      gameValue: [],
      hallValue: 1,
      lobbyValue: 19,
      memberType: 'account',
      memberValue: ['tom', 'lily', 'zack'],
      searchTypeValue: 'settlement_date',
      timeDuration: [undefined, undefined]
    })
    expect(operationsBetSearchStore.isFiltered).toStrictEqual(1710043200000)
  })
})
