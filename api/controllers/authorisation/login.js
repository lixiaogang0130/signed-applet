module.exports = {


  friendlyName: 'Login',


  description: 'Login authorisation.',


  inputs: {
    account: { type: 'string', required: true },
    password: { type: 'string', required: true }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }
  },


  fn: async function (inputs, exits) {

    console.log(sails.session.open_id);

    sails.session.user_id = 'user_id';

    return exits.reply();

  }


};
