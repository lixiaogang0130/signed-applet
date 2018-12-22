const Methods = {
  //access openId by code
  getAppletOpenId:async function(code) {
    let options = {
      url:sails.config.custom.weChatGetAppletOpenIdUri,
      // url:'http://www.baidu.com',
      method:'get',
      query:{
        fromType:6,
        code:code
      }
    };
    let reply = await HELPER.request(options);
    if(reply.done&&!reply.data.statusCode){
      return {done:true,data:reply.data.data};
    }else{
      return {done:false,code:10009,data:reply.data.message ||'un_caught_error~~'};
    }
  },
  //access user information by loginToken
  getAccountInfo:async function(loginToken){
    let options = {
      url:sails.config.custom.platformAccountInfoUri,
      method:'get',
      query:{
        loginToken:loginToken
      }
    };
    let tempResult = await HELPER.request(options);
    if(tempResult.done&&!tempResult.data.statusCode){
      let accessToken = new SERVICE.base.CredentialModel(
        tempResult.data.data, '2h').build();
      tempResult.data.data.accessToken = accessToken;
      return {done:true,data:tempResult.data.data}
    }else{
      return {done:false,code:10010,data:tempResult.data.message ||'un_caught_error~~'};
    }
  },
  //refresh account credential
  refreshAccessToken:async function(accessToken){
    try {
      let Model  = new SERVICE.base.CredentialModel(null,'1h');
      let credential = Model.refresh(accessToken);
      return {done:true,data:credential};
    } catch (e) {
      return {done:false,code:10011,data:'your credential is wrong~~'}
    }
  }
}

module.exports = {
  execute: async function (name, params) {
    let reply = await HELPER.apply(Methods, name, params);
    return reply;
  }
}

