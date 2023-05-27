// 移动端设配设计 改变的是html根标签的font-size大小（媒体查询）
// 基准大小
const baseSize = 80
function setRem() {
  const scale = document.documentElement.clientWidth / 1920 // 屏幕宽度 / 设计稿宽度 就是划分的份数
  // html 根节点的字体大小为 基准大小 * (手机模拟大小)||最大为1      html 根节点的字体大小<=1
  document.documentElement.style.fontSize = baseSize * Math.min(scale,1) + 'px' // Math.min（） 函数返回作为输入参数的数字中最小的一个
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
export default baseSize