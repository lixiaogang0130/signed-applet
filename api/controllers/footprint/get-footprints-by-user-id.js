module.exports = {


  friendlyName: 'Get footprints by user id',


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
      result = [{
        image: 'https://tse2.mm.bing.net/th?id=OIP.w9g6n8cczBixoj45IaprZwHaJQ&o=5&pid=1.7&w=1080&h=1349&rs=1&p=0',
        title: 'title1', start_time: new Date(1542356140000), end_time: new Date(1542366140000),
        status: '这是活动的状态???是否免费???',
        signedin: true
      }, {
        image: 'https://tse2.mm.bing.net/th?id=OIP.w9g6n8cczBixoj45IaprZwHaJQ&o=5&pid=1.7&w=1080&h=1349&rs=1&p=0',
        title: 'title1', start_time: new Date(1542356140000), end_time: new Date(1542366140000),
        status: '这是活动的状态???是否免费???',
        signedin: true
      }]
    } else {
      result = [{
        image: 'https://tse2.mm.bing.net/th?id=OIP.w9g6n8cczBixoj45IaprZwHaJQ&o=5&pid=1.7&w=1080&h=1349&rs=1&p=0',
        title: 'title  me2', start_time: new Date(1542356140000), end_time: new Date(1542366140000),
        status: '这是我的活动的状态???是否免费???',
        signedin: true
      }, {
        image: 'https://tse2.mm.bing.net/th?id=OIP.w9g6n8cczBixoj45IaprZwHaJQ&o=5&pid=1.7&w=1080&h=1349&rs=1&p=0',
        title: 'title me', start_time: new Date(1542356140000), end_time: new Date(1542366140000),
        status: '这是我的活动的状态???是否免费???',
        signedin: true
      }]
    }
    return exits.reply({status:10000,data:result});

  }


};
