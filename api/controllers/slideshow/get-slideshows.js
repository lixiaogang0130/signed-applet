module.exports = {


  friendlyName: 'Get slideshows',


  description: '',


  inputs: {

  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {

    let result = [{
      id: "1",
      url: 'https://mp.weixin.qq.com/s/t9ytaDYsx7qD6L1hihzr6g',
      img: 'http://video.chessivy.org/tuangouhaibao.png'
    },
    {
      id: '2',
      url: 'https://manage.kaisaile.org/index.php/WxViews/actindex?id=280',
      img: 'http://webcdn.kaisaile.org/banners/xiaochengxubanner.jpg'
    }];
    return exits.reply({ status: 10000, data: result });

  }


};
