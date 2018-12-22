module.exports = {
  friendlyName:'createAppletCode',
  description:`the applet tool to generate a TWO-DIMENSIONAL CODE~~`,
  inputs:{
    activityId:{
      type:'number',
      required:true
    }
  },
  exits:{
    reply:{
      responseType:'reply',
      description:'the reply which personal defined~~'
    }
  },
  fn:async function(inputs,exits){
    let args = {scene:inputs.activityId,page:inputs.pages}
    let reply = await SERVICE.wechat.generateAppletCode(args);
    if(reply.done){
      return exits.reply({status:10000,data:reply.data});
    }
    return exits.reply({status:reply.code,data:reply.data});
  }
}
