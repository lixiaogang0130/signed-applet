module.exports = {
  friendlyName:'signActivity',
  description:'sign activity of platform',
  inputs:{
    mobile:{
      type:'string',
      required:true
    },
    activityId:{
      type:'string',
      required:true
    }

  },
  exits:{
    reply:{
      responseType:`reply`,
      description:'personal defined response to client~~'
    }

  },
  fn:async function(inputs,exits){
    let {user_id:userId = this.req.decoded.uid,mobile,activityId}= inputs;
    let options = {
      userId:userId,
      mobile:mobile,
      activityId:activityId,
      signTime: Moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
    let reply = await SERVICE.sign.execute('signActivity',options);
    if(reply.done){
      return exits.reply({status:10000,data:reply.data});
    }
    return exits.reply({status:reply.code,data:reply.data});
  }
}
