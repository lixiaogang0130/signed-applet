module.exports = {


  friendlyName: 'recentlySignedActivity',


  description: 'recently signed activity~~',


  inputs: {
    activityId:{type:'number',required:true},
    page_index:{type:'number'},
    page_size:{type:'number'}
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {
    let reply = await SERVICE.moments.getListByActivityId(inputs.activityId,inputs.page_index,inputs.page_size);
    if(typeof reply==='object' && Array.isArray(reply)){
      for(let v of reply){
        v.isPraise = await SERVICE.common.execute('praise',1,v.dynamicId,1);
        v.isReport = await SERVICE.common.execute('isReport',1,v.dynamicId,1);
        v.dynamicImages = JSON.parse(v.dynamicImages);
        v.dynamicImages = _.values(v.dynamicImages);
      }
    }else{
      if(!IsEmptyObj(reply)){
        reply.isPraise = await SERVICE.common.execute('praise',1,reply.dynamicId,1);
        reply.isReport = await SERVICE.common.execute('isReport',1,reply.dynamicId,1);
        reply.dynamicImages = JSON.parse(reply.dynamicImages);
        reply.dynamicImages = _.values(reply.dynamicImages);
      }
    }
    return exits.reply({status:10000,data:reply});

  }


};
