module.exports = {


  friendlyName: 'Get comments by moment id',


  description: '',


  inputs: {
    targetType: {
      type: 'number'
    },
    targetId: {
      type: 'number',
      required: true
    },
    page_index:{
      type:'number'
    },
    page_size:{
      type:'number'
    }
  },


  exits: {
    reply: {
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {

    // let result = await SERVICE.
    let {
      targetType = 1, targetId,page_index:pageIndex=1,page_size:pageSize=5
    } = inputs;
    let reply = await SERVICE.comment.commentList(targetType, targetId,pageIndex,pageSize);
    for (let v of reply) {
      v.isPraise = await SERVICE.common.execute('praise',2,v.id,1);
      v.userIcon = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541065719032&di=5253020e7a21b5642cb7bde8eeb8a321&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03853475704d43f6ac725794887476a.jpg';
      v.userName = 'name1';
    }
    return exits.reply({
      status: 10000,
      data: reply
    })
  }


};
