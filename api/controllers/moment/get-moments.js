module.exports = {


  friendlyName: 'Get moments',


  description: '',


  inputs: {
    page_index: {
      type: 'number'
    },
    page_size: {
      type: 'number'
    },
    last_moment_id: {
      type: 'string'
    }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },



  fn: async function (inputs, exits) {
    let {page_index:pageIndex = 1,page_size:pageSize=10} = inputs;
    let reply = await SERVICE.moments.indexList(pageIndex,pageSize);

    for(let v of reply){
      v.isPraise = await SERVICE.common.execute('praise',1,v.dynamicId,1);
      v.isReport = await SERVICE.common.execute('isReport',1,v.dynamicId,1);
      v.dynamicImages = JSON.parse(v.dynamicImages);
      v.dynamicImages = _.values(v.dynamicImages);
    }
    return exits.reply({status:10000,data:reply});
  }


};
