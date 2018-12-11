// 改变地图信息
export const SET_STATION_ALL = (state, data) => {
  state.stationall_data = data
}
// 改变维护配置所有人员数据
export const SET_PROTECTTION_ALL = (state, data) => {
  state.Protectionall_data = data
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

// 消息弹窗是否显示
export const SET_MESSAGE_SHOW = (state, data) => {
  state.messageShow = data
}

// 台站配置 添加多个邮箱
export const SET_EMAIL_STR = (state, data) => {
  state.emails = data
}
