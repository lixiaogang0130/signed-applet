module.exports = {


  friendlyName: 'Get user by id',


  description: '',


  inputs: {
    id: { type: 'string' }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {

    let result;
    if (inputs.id) {
      result = { '勋章': 3, '等级': '一级棋士', '姓名': '李志全', '俱乐部': '王艳霞club', '获赞': -99, '评论': 9999, '转发': 8 }
    } else {
      result = { '勋章': 3, '等级': '一级棋士', '姓名': '获取我自己的信息', '俱乐部': '王艳霞club', '获赞': -99, '评论': 9999, '转发': 8 }
    }
    return exits.reply({status:10000,data:result});

  }


};
