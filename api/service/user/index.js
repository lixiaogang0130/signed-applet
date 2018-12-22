const ModuleSql = {
  select:`SELECT u.nickname as nickName,u.faceimg as coverUrl,u.uid as userId,statics.sign_times as signTimes,statics.last_sign_time as lastSignTime FROM tp_reg_mp_sign_statics statics INNER JOIN tp_nbv_userinfo u ON u.uid = statics.user_id WHERE statics.activity_id = ? ORDER BY statics.last_sign_time DESC`
}
const ConditionEnum = {
  default: ''
}
const Methods = {
  //sign activity
  listBySignOrder: async function (options) {
    let select = await HELPER.maker({
      model: ModuleSql,
      type: 'select'
    });
    let reply = await HELPER.query(select,options.values);

      if(reply.done){
        return {done:true,data:reply.result};
      }
      return {done:false,code:10007,data:'access order list cause unknown error~~'}
  }

}


module.exports = {
  execute: async function (name, params) {
    let reply = await HELPER.apply(Methods, name, params);
    return reply;
  }
}
