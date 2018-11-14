import request from '../util/request'
// 获取所有台站信息
export const getStationAll = async () => {
  const StationAllData = await request('/station/selectAll', {
    method: 'get',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
  }, false)
  return StationAllData.result
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
