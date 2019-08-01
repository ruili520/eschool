/**
 * Created by pb on 2018/1/2.
 */
//公共方法

//判断是不是App
export function isApp (){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/icbc/i)=="icbc") {
    return true;
  } else {
    return false;
  }
}
//判断是不是微信
export function isWx (){
  return false;

  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
    return true;
  } else {
    return false;
  }
}
