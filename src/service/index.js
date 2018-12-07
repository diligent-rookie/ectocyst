import request from '../util/request'
// 关闭报警状态
export const fixWranStatus = async () => {
  const fixWranData = await request('/station/closeVoice', {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }, false)
  return fixWranData
}

// 获取报警状态
export const getWranStatus = async () => {
  const getWranData = await request('/station/getAlarmVoice', {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8'
  }, false)
  return getWranData.result
}

// 获取所有台站信息
export const getStationAll = async () => {
  const StationAllData = await request('/station/selectAll', {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }, false)
  return StationAllData
}
// 根据ID查询台站信息
export const getStationID = async (stationid) => {
  const StationIdData = await request('station/select', {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {
      id: stationid
    }
  }, false)
  return StationIdData.result
}

// 修改单个台站信息
export const fixStationMessage = async (stationmessage) => {
  const fixStationData = await request('station/update', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: stationmessage
  }, true)
  return fixStationData.result
}

// 删除单个台站信息
export const deleteStationMessage = async (stationid) => {
  const deleteStationData = await request('station/removeone', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {
      id: stationid
    }
  }, false)
  return deleteStationData.result
}

// 添加站台
export const addStationMessage = async (stationmessage) => {
  const addStationData = await request('station/insert', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: stationmessage
  }, true)
  return addStationData.result
}

// 请求电脑情况折线图数据
export const getLineData = async (secondTime, dataSize) => {
  const linedata = await request('/system/info', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {
      second: secondTime,
      pageSize: dataSize
    }

  }, false)
  return linedata.result
}

// 查询系统配置信息
export const getSystemID = async () => {
  const SystemIdData = await request('config/select', {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }, false)
  return SystemIdData.result
}

// 修改系统配置信息
export const fixSystemMessage = async (systemmessage) => {
  const fixSystemData = await request('config/update', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: systemmessage
  }, true)
  return fixSystemData.result
}

// 获取所有维修人员
export const getProtectionAll = async () => {
  const ProtectionAllData = await request('accendant/selectAll', {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }, false)
  return ProtectionAllData
}

// 获取某一个维修人员
export const getProtectionID = async (Protectionid) => {
  const ProtectionIdData = await request('accendant/selectOne', {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {
      id: Protectionid
    }
  }, false)
  return ProtectionIdData.result
}

// 修改某一个维修人员
export const fixProtectionSingle = async (ProtectionsingleMessage) => {
  const ProtectionSingleData = await request('accendant/updateOne', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: ProtectionsingleMessage
  }, true)
  return ProtectionSingleData.result
}

// 删除某一个维修人员
export const removeProtectionSingle = async (Protectionid) => {
  const removeSingleData = await request('accendant/removeOne', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {
      id: Protectionid
    }
  }, false)
  return removeSingleData.result
}

// 向维修人员发送报警信息
export const sendProtectionSingle = async (Protectionid) => {
  const sendSingleData = await request('accendant/sendMessage', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: {
      id: Protectionid
    }
  }, false)
  return sendSingleData.code
}

// 添加维修人员
export const addProtectionSingle = async (Protectionmessage) => {
  const addSingleData = await request('accendant/insert', {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    data: Protectionmessage
  }, true)
  return addSingleData.result
}
