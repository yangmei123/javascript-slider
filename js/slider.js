/**
 * 
 * @authors lml (you@example.org)
 * @date    2018-04-25 14:58:23
 * @version $Id$
 */

var silde =  function(wrapId, option) {
  this.timer = null;
  var time = option.time || 10000;
  var timer = this.timer;
  var slideBoxWidth = '100%';
  var betweenMargin = option.betweenMargin || 0;
  var prevBtnShow = option.prevBtnShow !== undefined ? option.prevBtnShow : true;
  var navigatShow = option.navigatShow !== undefined ? option.navigatShow : true;
  var prevText = option.prevText || '上一张';
  var nextText = option.nextText || '下一张';
  // 显示几张图片
  var showLen = option.showImgLen || 1;
  // 外层div
  var wrapBox = document.getElementById(wrapId);
  if (!wrapBox) return false;
  // 导航条圆点
  var navigat = wrapBox.getElementsByClassName('navigat')[0];
  var navigatSpan = navigat.children;
  // 滑动区域div
  var slideBox = wrapBox.getElementsByClassName('slide-box')[0];
  // 按钮区域
  var btnArea = wrapBox.getElementsByClassName('btn-area')[0];
  // 上一张
  var prevBtn = wrapBox.getElementsByClassName('prev-btn')[0];
  // 下一张
  var nextBtn = wrapBox.getElementsByClassName('next-btn')[0];
  // 有几张图片
  var realImglen = slideBox.children.length;
  // 复制一份轮播图
  slideBox.innerHTML = slideBox.innerHTML + slideBox.innerHTML;
  // 只有一张图就不显示上一页下一页按钮
  prevBtnShow = realImglen === 1 ? false : prevBtnShow;
  // 只有一张图不显示导航条
  navigatShow = realImglen === 1 ? false : navigatShow;
  // 有几张图片
  var imgLength = slideBox.children.length;
  wrapBox.style.width = slideBoxWidth;
  for (var i = slideBox.children.length - 1; i >= 0; i--) {
      var wrapBoxWidth = wrapBox.offsetWidth;
      slideBox.children[i].style.marginLeft = betweenMargin + 'px';
      slideBox.children[i].style.marginRight = betweenMargin + 'px';
      slideBox.children[i].style.marginTop = betweenMargin + 'px';
      slideBox.children[i].style.width = (wrapBoxWidth - showLen*betweenMargin*2 - 2) / showLen + 'px';
  }
  // 轮播图片的高度
  var imgHeight = slideBox.children[0].offsetHeight;
  var imgWidth = slideBox.children[0].offsetWidth;
  // 边距
  var offLeft = slideBox.children[0].offsetLeft;
  var margin = offLeft * 2;
  wrapBox.style.height = imgHeight + 'px';
  // 轮播区域显示的宽度
  var showWidth = (imgWidth + margin) * showLen;
  // 轮播图片的宽
  var scrollWdth = (imgWidth + margin) * realImglen;
  // 轮播图总宽度
  slideBox.style.width = (imgWidth + margin + 1) * imgLength + 'px';

  // 是否显示上一页下一页按钮
  btnArea.style.display = prevBtnShow ? 'block' : 'none';
  prevBtn.innerHTML = prevText;
  nextBtn.innerHTML = nextText;
  // 设置导航条
  function setNavigat() {
    var navigatInnerHtml = '';
    for (var i = 0; i < realImglen; i++) {
      navigatInnerHtml += '<span></span>';
    }
    navigat.innerHTML = navigatInnerHtml;
    navigat.style.marginLeft = -navigat.offsetWidth/2 + 'px';
    navigat.style.display = navigatShow ? 'block' : 'none';
  }
  // 上一张
  function prev() {
      if ( Math.abs(slideBox.offsetLeft) === 0) {
          slideBox.style.left = -scrollWdth + 'px';
      }
      setNavigatActive(Math.abs(slideBox.offsetLeft / (imgWidth + margin)) - 1);
      slideBox.style.left = (slideBox.offsetLeft + imgWidth + margin) + 'px';

  }
  // 下一张
  function next() {
      setNavigatActive(Math.abs(slideBox.offsetLeft / (imgWidth + margin)) + 1);
      slideBox.style.left = (slideBox.offsetLeft - imgWidth - margin ) + 'px';
      if (Math.abs(slideBox.offsetLeft) === scrollWdth) {
        slideBox.style.left = 0;
        setNavigatActive(0);
      }
  }
  // 轮播图开始
  function start() {
      timer = setInterval(function() {
          next();
      }, time);
  }
  //设置导航选中
  function setNavigatActive(index) {
    for (var i = 0; i < navigatSpan.length; i++) {
      navigatSpan[i].className = i === index ? 'active' : ''; 
    }
  }

  if (navigatShow) {
    setNavigat();
    setNavigatActive(0);
  }
  start();
  // 点击上一张
  prevBtn.onclick = function () {
      clearInterval(timer);
      prev();
  }
  // 点击下一张
  nextBtn.onclick = function (event) {
      clearInterval(timer);
      next();
  }
  // 离开按钮区域
  btnArea.onmouseout = function() {
      clearInterval(timer);
      start();
  }
}

