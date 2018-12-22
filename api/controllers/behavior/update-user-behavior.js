module.exports = {


  friendlyName: 'behavior',


  description: 'record user behavior to something~~',


  inputs: {
    targetId:{
      type:'number',
      required:true
    },
    targetType:{
      type:'number',
      required:true
    },
    actionType:{
      type:'string',
      required:true
    },
    type:{
      type:'number'
    },
    content:{
      type:'string'
    }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {
    let reply = {operation:false};
    console.log(inputs);
    if(inputs.actionType !='report'){
      reply = await SERVICE.common.execute(inputs.actionType,inputs.targetType,inputs.targetId,1);
    }else{
      reply = await SERVICE.common.execute(inputs.actionType,inputs.type,inputs.targetType,inputs.targetId,inputs.content,1);
    }

    let STATUS = 10000;
    if(!reply.operation){
      STATUS= 10009;
    }
    return exits.reply({status:STATUS,data:reply});

  }


};
