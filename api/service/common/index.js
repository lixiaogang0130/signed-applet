//common sql statement
const ModuleSql = {
  praise:`SELECT 1 FROM tp_reg_mp_dis_or_like praise WHERE praise.target_type = ? AND praise.dis_or_like = 1 AND praise.target_id =? AND praise.user_id =? limit 1`,
  isDis:`SELECT 1 FROM tp_reg_mp_dis_or_like praise WHERE praise.target_type = ? AND praise.dis_or_like = 3 AND praise.target_id =? AND praise.user_id =? limit 1`,
  isReport: `SELECT 1 FROM tp_reg_mp_report re WHERE re.target_type=? AND re.target_id=? AND re.user_id = ? limit 1`,
  comment:``,
  share:``,
  thumpUp:'insert into tp_reg_mp_dis_or_like (target_type,target_id,dis_or_like,user_id) values(?,?,1,?) ON DUPLICATE KEY UPDATE dis_or_like=1',
  dis:'insert into tp_reg_mp_dis_or_like (target_type,target_id,dis_or_like,user_id) values(?,?,3,?) ON DUPLICATE KEY UPDATE dis_or_like=3',
  report:`insert into tp_reg_mp_report (type,target_type,target_id,content,user_id) values(?,?,?,?,?)`,
  isSigned:`SELECT 1 FROM tp_reg_mp_sign_statics statics WHERE statics.user_id = ? AND statics.activity_id = ? AND statics.flag = 0 ;`
}
//common method defined
const Methods = {
  //common check account had or had not thump up the resource
  praise:async function(args){
    let statement = ModuleSql.praise;
    let values = args;
    let reply = await HELPER.query(statement,values);
    if(reply.done){
      return reply.result.length>0;
    }else{
      throw new Error('common praise method statement is error!~')
    }
  },
  //common check account had or had not dis the resource
  isDis:async function(args){
    let statement = ModuleSql.isDis;
    let values = args;
    let reply = await HELPER.query(statement,values);
    if(reply.done){
      return reply.result.length>0;
    }else{
      throw new Error('common praise method statement is error!~')
    }
  },
  isReport:async function(args){
    let statement = ModuleSql.isReport;
    let values = args;
    let reply = await HELPER.query(statement,values);
    if(reply.done){
      return reply.result.length>0;
    }else{
      throw new Error('common praise method statement is error!~')
    }
  },
  //common check account had or had not comment the resource
  comment:async function(type,resId,userId){

  },
  share:async function(type,resId,userId){

  },
  //common praise something you can thump up
  thumpUp:async function(args){
    let statement = ModuleSql.thumpUp;
    let values = args;
    let reply = await HELPER.query(statement,values);
    if(reply.done){
      return {operation:reply.result.affectedRows>0};
    }
    return {operation:false};
  },
  //common dis something you want to dis
  dis:async function(args){
    let statement = ModuleSql.dis;
    let values = args;
    let reply = await HELPER.query(statement,values);
    if(reply.done){
      return {operation:reply.result.affectedRows>0};
    }
    return {operation:false};
  },
  //common report something you feel not well
  report:async function(args){
    let statement = ModuleSql.report;
    let values = args;
    let reply = await HELPER.query(statement,values);
    if(reply.done){
      return {operation:reply.result.affectedRows>0};
    }
    return {operation:false};
  },
   //common check account had or had not signed  the resource
   signed:async function(args){
    let statement = ModuleSql.isSigned;
    let values = args;
    let reply = await HELPER.query(statement,values);
    if(reply.done){
      return reply.result.length>0;
    }else{
      throw new Error('common isSigned method statement is error!~')
    }
  },
}
//call method which you want to execute~~
const callMethod = async function(methodName,...args){
  if(!_.keys(Methods).includes(methodName)){
    throw new Error('the method you want to execute is not found~~');
  }
  return await Methods[methodName](...args);
}
module.exports =  {
  execute:async function(inputs,...exits) {
    let reply = await callMethod(inputs,exits);
    return reply;
  }


}
