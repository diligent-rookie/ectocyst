// 验证IP地址
export const IpTest = (str) => {
  let Ipv4 = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
  let Ipv6 = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/
  return Ipv4.test(str) || Ipv6.test(str)
}
// 数字验证
export const NumberTest = (str) => {
  return !isNaN(+str)
}
// 整数验证
export const IntNum = (str) => {
  return parseInt(str) === +str
}
// 邮箱验证
export const EmailTest = (str) => {
  let reg = /^[\w.-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
  return reg.test(str)
}

// 手机验证
export const TelTest = (str) => {
  let reg = /^1[3|4|5|8]\d{9}$/
  return reg.test(str)
}
