module.exports = {


  friendlyName: 'Get open id by code',


  description: '',


  inputs: {
    code: { type: 'string', required: true }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {
    let reply = await SERVICE.authorisation.execute('getAppletOpenId',inputs.code);
    if(reply.done){
      sails.session.openId = reply.data.openid;
      return exits.reply({status:10000,data:{openId:reply.data.openid}});
    }else{
      return exits.reply({status:10007,data:reply.data})
    }
  }

};
