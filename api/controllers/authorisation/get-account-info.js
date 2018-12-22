module.exports = {


  friendlyName: 'getAccountInfo',


  description: '',


  inputs: {
    loginToken: { type: 'string', required: true }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {
    let reply = await SERVICE.authorisation.execute('getAccountInfo',inputs.loginToken);
    if(reply.done){
      return exits.reply({status:10000,data:reply.data});
    }else{
      return exits.reply({status:10007,data:reply.data})
    }
  }

};
