module.exports = {


  friendlyName: 'Get user login history',


  description: '',


  inputs: {
    page_index: {
      type: 'number'
    },
    page_size: {
      type: 'number'
    },
    last_user_id: {
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

    let result = {
      page_index: 1,
      page_size: 10,
      total_page: 1,
      total_record: 2,
      users: [{
        id: 'asdfasdfa3',
        icon: 'http://c.hiphotos.baidu.com/image/pic/item/77c6a7efce1b9d16efbcc03afedeb48f8c546475.jpg',
        name: '张三',
        sign_in_time: new Date(1542337461000)
      },
      {
        id: 'asdfasdfa3',
        icon: 'http://c.hiphotos.baidu.com/image/pic/item/77c6a7efce1b9d16efbcc03afedeb48f8c546475.jpg',
        name: '张三',
        sign_in_time: new Date(1542337861000)
      }]
    };
    return exits.reply({ status: 10000, data: result });

  }


};
