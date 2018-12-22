module.exports = {


  friendlyName: 'Connect',


  description: 'Connect test.',


  inputs: {

  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }

  },


  fn: async function (inputs, exits) {

    return exits.reply();

  }


};
