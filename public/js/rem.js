(function (doc, win) {
  var _root = doc.documentElement
  var resizeEvent =
  'orientationchange' in window ? 'orientationchange' : 'resize'
  function resizeFont () {
    var clientWidth = _root.clientWidth
    // 根据设计稿的横向分辨率/100得来的
    _root.style.fontSize = (clientWidth / 19.2) + 'px'
    // console.log('w:' + clientWidth );
  }
  win.addEventListener(resizeEvent, resizeFont, false)
  doc.addEventListener('DOMContentLoaded', resizeFont, false)
})(document, window)
