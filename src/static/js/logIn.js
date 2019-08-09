/* eslint-disable */
/**
 * Created by pb on 2017/7/18.
 */
import {getSessionId,logInCallBack,loginICBCLONG,getUserLogin} from "./../../apis/app.api";
import {MessageBox,Indicator } from "mint-ui";
export function lonIn(callback) {
  console.log('进入loginIn方法')
  if (!callback) {
    console.log('callback为空')
    callback = function () {
    };
  }
  if (sessionStorage.test == "true") {
    let data = null;
    console.log(location.origin.indexOf("m.xuebank") == "-1")
    if (location.origin.indexOf("m.xuebank") == "-1") {
      //测试长登陆（娃娃）
      data = {
        "data": {
          "retmsg":"成功",
          "data":"3S4KEXqwofPt65Yw8Zlauey6l/7uYSVF5/EbqrwQ3UPOaYXCWTVjH9UGS2rkKfLqg exPowHkgN\\nTUwLwlYJbeQd3ouE3tHWM8/Qmaef1T7/897Y+UL4Lo1A9t69rJGkS1WX3A40KUXZoY/hkN2TE3ue\\nSEn9moxyVreUsOJVs6xmdoNTXcKX/QuozyZsXaDI/MYAXzi6i8wOkMyKw2poN3NRmgzkRjQEG73Z\\nXzjMWXholmoSgncgcDAfFyAdbTgrFot/2/e0v34h9WxrE5efmXguAHs/mVLi99egvjGJTMP12wvQ\\nbAoVRIsLw Gaseyy GRqyMnA1zSZnrjdMgoUhM8bwbehoUmajE4fa D Efye SOrQasJf/KiopJIfGS5m\\nTiJNOCQCXSRDVG/6kT5qvGbd5pww6PoNjunmKkJx4q6s9tJJVCBiwb5DOIJGvPOYRLmp33CspPBY\\nvE2mC4KXJ5kGh+EXYiBAfEh/6nCnbGVR8NQ",
          "retcode":"0",
          "key":"WOw4iaQ1OUiaoDewrcl7FPbgJkj1UjlqejosYPn9MjYBoVY5lyNqav4tCKwZehlLo2XrYAEV7Vdv\\nDKK3XM1CIC6pzfMCcM3CWMNtMW/ngk4io BbywH3SbLlpbjBuhuWS8JswqrcuVnW/tHvQpvg2HD9B\\nENSrnQAkV3NS1VJTR8s="},
        "error":"",
        "code": 0
      };
    } else {
      //生产长登陆（孙永伟）
      data = {
        "data": {
          "retmsg":"成功",
          "data":"3S4KEXqwofPt65Yw8Zlauey6l/7uYSVF5/EbqrwQ3UPOaYXCWTVjH9UGS2rkKfLqg exPowHkgN\\nTUwLwlYJbeQd3ouE3tHWM8/Qmaef1T7/897Y+UL4Lo1A9t69rJGkS1WX3A40KUXZoY/hkN2TE3ue\\nSEn9moxyVreUsOJVs6xmdoNTXcKX/QuozyZsXaDI/MYAXzi6i8wOkMyKw2poN3NRmgzkRjQEG73Z\\nXzjMWXholmoSgncgcDAfFyAdbTgrFot/2/e0v34h9WxrE5efmXguAHs/mVLi99egvjGJTMP12wvQ\\nbAoVRIsLw Gaseyy GRqyMnA1zSZnrjdMgoUhM8bwbehoUmajE4fa D Efye SOrQasJf/KiopJIfGS5m\\nTiJNOCQCXSRDVG/6kT5qvGbd5pww6PoNjunmKkJx4q6s9tJJVCBiwb5DOIJGvPOYRLmp33CspPBY\\nvE2mC4KXJ5kGh+EXYiBAfEh/6nCnbGVR8NQ",
          "retcode":"0",
          "key":"WOw4iaQ1OUiaoDewrcl7FPbgJkj1UjlqejosYPn9MjYBoVY5lyNqav4tCKwZehlLo2XrYAEV7Vdv\\nDKK3XM1CIC6pzfMCcM3CWMNtMW/ngk4io BbywH3SbLlpbjBuhuWS8JswqrcuVnW/tHvQpvg2HD9B\\nENSrnQAkV3NS1VJTR8s="},
        "error":"",
        "code": 0
      };
    }
    data = JSON.stringify(data);
    logIn(data);
  }
  console.log('调用长登陆')
  //调用长登陆
  //调用长登陆
  window.native.LoginStatus(function (data){
    logIn(data);
  });

  function logIn(data) {
    console.log('gggggggggggggggggg-----')
    data = JSON.parse(data);
    window.native.ObtainICBCEnvironment(function (state) {
      console.log('zzzzzzzzzzzzzzz')
      state = JSON.parse(state);
      if (state.code == "0") {
        console.log('rrrrrrrrrrrrrr')
        if (data.data == null) {
          return;
        }
        loginICBCLONG({
          ICBCUserInfoXML: data.data.data,
          ICBCKEY: data.data.key,
          contactType: state.data.contactType
        }).then(function (data) {
          console.log(data)
          if (data.data.code == "000001") {
            callback(data);
            console.log('eeeeeee')
          } else {
            shortLogIn("", callback);
            console.log('tttttttttttttt')
          }
        });
      }

    })

  };

  //测试用
  //console.log("%c 已进行用户权限校验","color:blue")
}

export function shortLogIn(data, callback) {
  if (!callback) {
    callback = function () {
    };
  };
  var url = data ? data : location.href;
  console.log("登录成功跳转url", url);
  Indicator.open({spinnerType: 'fading-circle'});
  getSessionId().then(function (data) {
    if (data.body.code == "000001") {
      Indicator.close()
      // let sessionId = data.body.result.sessionId;
      let sessionId = "8413ad7e-9981-4563-92d1-f46663ad8044";
      let origin = location.origin;
      if (origin.indexOf("sckdg.xuebank.com") > -1) {
        origin = "https://m.xuebank.com";
      } else {
        origin = "https://test.xuebank.com";
      }
      let callBackURL = origin + "/eduboot/callBack";
      console.log("编码前的url数据", url);
      let urlData = encodeURIComponent(url);
      console.log("编码过的url数据", urlData);
      //let urlDecode = decodeURIComponent(urlData);
      //console.log("解码过的url数据",urlDecode);

      let callBackParams = "sessionId=" + sessionId + "&url=" + urlData;

      console.log("登录时给后台的数据", callBackParams);
      //工行短登录
      //window.ICBCUtil.merLogin({
      //  'callBackURL': callBackURL,
      //  'callBackParams':callBackParams
      //})

      //短登录
      window.native.LoginVerification({
        'callBackURL': callBackURL,
        'callBackParams': callBackParams
      }, function (data) {
        console.log("短登录返回信息", data);
        callback(JSON.parse(data));
      });

      //测试用
      if (window.sessionStorage.test != undefined) {
        let val = "?ICBCUserInfoXML=EFD3F89B3333F709831F06CD07561902BEE5291B4BE0DC4283AF29EDB3EEF757265B198EFCD35B437C9B6CDB5E7B8C2433663C15D0207DB479C551AB86BD63B18925B07BA66AE8C4100D147D78029026EE09C445D0D3F4D566C8AC380FD0DB4FB93160B9557F8850CD53D120BE0B63A0C8F27410B3E2086EA1D743146036B1CCDAB465F5F514DD6AE667C369B53BBA7F4EFD42146F6B3C552BE29F320AC85FC34E9289DB4EC0B3A9A11618EA1940581C03E0C02B3ED6F228E978E0446663329014490A7F77F3ECCC661070ADD5F250658CAAD35EDA060A881F98F14F99488D9867A85D2760625B2E9BAB4012BD797C2D91DBD601DF8A551F9660BE725BD18596F095E9449CFABD23F992579B5044C578199113D4FB7FCC4FDC0A5F3BE7F8CD4D4E5A14BC04E80FE42766FCB7525BE0A2A3F12E6771D2C66501D85800091699164B799F9A4B4DE15D79677F5D59827EF9B06514E0FB7D61C8661070ADD5F25065EF5D0EB27C4B74FB3BF066E6E0E1048CB4D8677C098B506ED6602A8F64037AD6C5CBE5D679A06AA136798CAD66652679BD00E9AA18100C8A0463F358D615E4FA5610AB4C6FD5936D94CA11A1DD8B7A55140D0C3003C48F9ABD946C9C5F1FEBFCC2B97A86E7F6506835A936B804AE82E60D18CF9F6193FAC5D5007D38611C21F207A34B23D0B8F288C7323377B53101FAF36BE42C47566C847D79C4B15B2CAA83C11200EEC0E9C557661070ADD5F250653B8A372714E64765154F6782D2912A790541BB71302661850921891BF95600AA9CCA3DFA22A6437D510352EC28D9FEC7BAFADB5FD949706EB1E2CB18918C2C37FE92BAA43371A790038803519AE6161E&ICBCKEY=V7gmiGg3k3hYUuZJ2nQkZV6FP 5aXumJlOSTX1sVrRoSfuELWoDiZR1Bq2Pgtj kol2 C1bW67WjhnOsHp114AG5tMqNZocNlDpE6 Z6WEqzERv7aBF549SfNphKSf03evatJ5X516y8HwfRHcXvN7Fyop0lMz 7/aDjqhbcnhM=&" + callBackParams;
        //if(true){
        console.log("%c 手动调用登录接口", "color:red")
        logInCallBack(val).then(function (data) {
          Indicator.close()
          callback({code: 0});
          MessageBox({title: "已登录"});

        }, () => {
          Indicator.close()
          MessageBox({title: "数据请求失败"});
        })
      }

    } else {
      Indicator.close()
      MessageBox({title: data.body.message});
    }

  }, () => {
    Indicator.close()
    MessageBox({title: "数据请求失败"});
  })
}

