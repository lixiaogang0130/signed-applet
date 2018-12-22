module.exports = {


  friendlyName: 'recentlySignedActivity',


  description: 'recently signed activity~~',


  inputs: {
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {

    let options = {
      values:[this.req.decoded.uid]
    }
    let reply = await SERVICE.activity.execute('getRecentlySignedActivity',options);
    if(reply.done){
      return exits.reply({status:10000,data:reply.data});
    }
    return exits.reply({status:reply.code,data:reply.data});
  }


};
