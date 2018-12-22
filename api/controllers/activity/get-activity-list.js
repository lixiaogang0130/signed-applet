module.exports = {
  friendlyName:'activityList',
  description:'',
  inputs:{
    rs_type:{
      type:'string',
      required:true
    },
    page_index:{
      type:'number'
    },
    page_size:{
      type:'number'
    }
  },
  exits:{
    reply:{
      responseType:'reply',
      description:'personal response defined to client~~'
    }
  },
  fn:async function(inputs,exits){
    let {rs_type:actionType,page_index:pageIndex=1,page_size:pageSize = 10} = inputs;
    let options = {
      values:[(pageIndex-1)*pageSize,pageSize]
    }
    let reply = await SERVICE.activity.execute(actionType,options);
    if(reply.done){
      return exits.reply({status:10000,data:reply.data});
    }
    return exits.reply({status:reply.code,data:reply.data});
  }
}
