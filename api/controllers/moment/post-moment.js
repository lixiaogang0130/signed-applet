module.exports = {


  friendlyName: 'Post moment',


  description: '',


  inputs: {

    activity_id: { type: 'number', required: true },
    images: { type: 'ref', required: true },
    content: { type: 'string' }

  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {

    let {activity_id:activityId,images:dynamicImages,content} = inputs;
    let obj = {}
    for(let [n,i] of dynamicImages.entries()){
      obj[n] = i;
    }
    dynamicImages = JSON.stringify(obj);
    let options = {
      activityId:activityId,
      dynamicImages:dynamicImages,
      content:content,
      userId:this.req.decoded.uid
    }
    let reply = await SERVICE.moments.addDynamic(options);
    if(reply.operation){
      return exits.reply({status:10000,data:reply})
    }else{
      return exits.reply({status:10006,data:reply})
    }
  }


};
