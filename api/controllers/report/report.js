module.exports = {


  friendlyName: 'Report',


  description: 'Report moment.',


  inputs: {
    type: { type: 'number' },
    target_type: { type: 'number', required: true },
    target_id: { type: 'number', required: true },
    content: { type: 'string' }
  },


  exits: {
    reply:{
      description: 'reply data to client~~',
      responseType: 'reply'
    }
  },


  fn: async function (inputs, exits) {

    let open_id = sails.session.open_id;
    if (!open_id) { return exits.success(await sails.helpers.reply(null, 13042)) }
    let pre_sql = `INSERT INTO tb_reg_mp_report ( open_id, type, target_type, target_id, content ) VALUES
      ( '${open_id}', '${inputs.type}', '${inputs.target_type}', '${inputs.target_id}', '${inputs.content}' )
      ON DUPLICATE KEY UPDATE content = '${inputs.content}'`;
    await sails.helpers.query(pre_sql);
    return exits.reply();

  }


};
