// 改变地图信息
export const SET_STATION_ALL = (state, data) => {
  state.stationall_data = data
}
// 改变维护配置所有人员数据
export const SET_LOG_ALL = (state, data) => {
  state.logall_data = data
}

// 改变提示窗的状态
export const SET_ALERT_STATUS = (state, data) => {
  state.IsshowTip = data
}

// 删除提示框状态
export const SET_WARN_STATUS = (state, data) => {
  state.isWarn = data
}

// 是否删除
export const SET_IS_DELETE = (state, data) => {
  state.isDelete = data
}
