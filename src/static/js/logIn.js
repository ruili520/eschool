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
          "data":"YQq75+helEEIr8FeyS7Dj9EJhC8RzEdSqwl23E1jgeABm1u+sOCLQpsiORMDDPW+yJyZcrrNlJeoJ7PGEYsCoIQDKFYc415S1Y3UasQXFXl5QIcf0Lbd+BSKO4r8tLBhvZqmx0qNQhZx8kDSAqSvvB/zfCufaAEqhO5YsKWAMeBc2wE5aVRGQ1gmXjIImE9wnutliCww690HGPd+RAmTBSljxpipNNwjBN66vFBVXJKtThktGwJOsvNhO1j+d0af0AyrnYIMMxKahq/eUzljmWZp4Zl+9OmKU4ck5ntEwAZECwwzENAZ3MAi9IlU9xLOnAbIos5B/1+Wfo8EOggRrGHBiopqsq8D8/gIe165i+Q2vV4CTjJEV0089GlHXP6M+eB2geFBbg6hi7pEscJ7LA==",
          "retcode":"0",
          "key":"RuBII3v+lRwbXrFZKTmNKdsR+L7IbFF4UVNePTy5Ouc1EGaaLfzgiW6KWGEOwCTfkhDUA7v64Nu8wG2uOQtMRwxPrjsz58RWXiVR0yVMR+1JrS4y2tI4HxaH2ka/aAfc6Ms3U/BW68+UIJ+Ua+NJ92FFcozscmlKZMTLggkA/1w="},
        "error":"",
        "code": 0
      };
    } else {
      //生产长登陆（孙永伟）
      data = {
        "data": {
          "retmsg": "成功",
          "data": "JuszQi1iJFqRbEHb4N91iTFJxx4rN8mwYh1PcFgjSHvl9wWW6g9pFfTEDrwMHZYHCJGVanaa1Po0+iaUtKq9d8UjI1kM7613CkgJYc4Rbf5LsrTxSjXK8+/USofgOiH1u0As09EGINyRT9EKmSlv0BmdlkqNq6Tsmk8gZM7skP1b/qeeie9m6Rzyy7HhPr723FpgySFiFl45XHlrfFf9nh747EhgTdqI9IExr959zUVVQ0H0/as++Lls6dyFWlEwLycXdUftbqnMBWbw8LvBLVFXWaPI3OPi/BlT7uTxYFLQN8soBW+HmHwUNHGzqk71EJbY0/XfVrtoUw23P3UAHKLJwSHaRuaA3pjN/9WfFghgDNjJHnWXe8UlwiFLH7pIqQ5MAGj3ZloI2ouRrzv3EAwdwWXG1GW3AjXpeWDHfumyXPmAAS6ctmTJHJ8jg4qxjQIkEbimcT5PZpdHrLpHyFYRAS3ejC0396/tNz34NJjlxC6WeYSh3mhFXLMv9cixLQjGiZfad0k1dRkfmnnD7w==",
          "retcode": "0",
          "key": "GhMk/149Blh7nBieX1xLrvQ9b/x3bDuR8TsLIc+93JoPAt+QAkTqsT8njDc8ppu5KyCQ+/rfDEyNDXqMiF+v9RwQu/2VOwkCIDZ7dO3+bU0kSXQhxr0wkLORVyABlR2uX8hlLCtsE+DJlYqz26xM7KnmE71Eh4v/b3p3C50fAP8="
        },
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
  }
  ;
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

