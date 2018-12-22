module.exports = {


  friendlyName: 'Delete moment by id',


  description: '',


  inputs: {
    dynamicId: { type: 'number', required: true }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {
    let reply = await SERVICE.moments.deleteByDynamicId(inputs.dynamicId);
    if(reply.operation){
      return exits.reply({status:10000,data:reply});
    }else{
      return exits.reply({status:10008,data:reply});
    }
  }


};
