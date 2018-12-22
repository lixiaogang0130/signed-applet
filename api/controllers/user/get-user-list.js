module.exports = {


  friendlyName: 'Get user by id',


  description: '',


  inputs: {
    activityId: { type: 'number', required:true },

  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {
    let options = {
      values:[inputs.activityId]
    }
    let reply = await SERVICE.user.execute('listBySignOrder',options);
    if(reply.done){
      return exits.reply({status:10000,data:reply.data});
    }
    return exits.reply({status:reply.code,data:reply.data});
  }


};
