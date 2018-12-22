module.exports = {
  friendlyName:'singleMoment',
  description:'access single moment',
  inputs:{
    dynamicId:{
      type:'number'
    }

  },
  exits:{
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }
  },
  fn:async function(inputs,exits) {

    let reply = await SERVICE.moments.accessSingleByID(inputs.dynamicId);
    if(!IsEmptyObj(reply)){
      reply.isPraise = await SERVICE.common.execute('praise',3,2,1)
      reply.isReport = await SERVICE.common.execute('isReport',1,reply.dynamicId,1);
      reply.dynamicImages = JSON.parse(reply.dynamicImages);
      reply.dynamicImages = _.values(reply.dynamicImages);
    }
    return exits.reply({status:10000,data:reply})

  }



}
