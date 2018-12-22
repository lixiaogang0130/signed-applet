module.exports = {


  friendlyName: 'Get activity by id',


  description: '',


  inputs: {

    activityId: {
      type: 'number',
      required: true
    }
  },


  exits: {
    reply: {
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {
    console.log(this.req.decoded);
    let options = {
      values: [inputs.activityId]
    }
    let reply = await SERVICE.activity.execute('getActivityById', options);
    if (reply.done) {
      let isSigned = await SERVICE.common.execute('signed', this.req.decoded.uid, inputs.activityId);
      reply.data.isSigned = isSigned;
      return exits.reply({
        status: 10000,
        data: reply.data
      });
    }
    return exits.reply({
      status: reply.code,
      data: reply.data
    });
  }


};
