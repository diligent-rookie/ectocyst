import {getStationAll, getLogAll} from '../service/index'
// 获取所有站台信息
export const GET_STATION_DATA = async ({commit, state, dispatch}) => {
  const data = await getStationAll()
  if (data.code === 200) {
    commit('SET_STATION_ALL', data.result)
  }
}
// 获取所有维修人员
export const GET_LOGALL_DATA = async ({commit, state, dispatch}) => {
  const data = await getLogAll()
  if (data.code === 200) {
    commit('SET_LOG_ALL', data.result)
  }
}
