const ModuleSql = {
  checkExists: `SELECT statics.id,
            statics.user_id as userId,
            statics.sign_times as signTimes,
            statics.series_days as seriesDays,
            statics.last_sign_time as lastSignTime,
            statics.sign_days as signDays,
            record.mobile as lastSignMobile
            FROM tp_reg_mp_sign_statics statics INNER JOIN
            tp_reg_mp_sign_record record ON record.sign_id = statics.id AND record.sign_time = statics.last_sign_time
          WHERE statics.user_id = ? AND statics.activity_id = ? `,
  insertStatics: 'insert into tp_reg_mp_sign_statics(user_id,activity_id,last_sign_time) values(?,?,?);',
  updateStatics: 'update tp_reg_mp_sign_statics set sign_times = ?,series_days=?,sign_days =?,last_sign_time = ?  where id = ?',
  insertRecord: 'INSERT INTO tp_reg_mp_sign_record (sign_id,sign_time,mobile) VALUES(?,?,?)'
}
const ConditionEnum = {
  default: ''
}

function checkDays(t1, t2) {
  let dt = new Date(t1);
  let dt1 = new Date(t2);
  dt.setHours(0);
  dt.setMinutes(0);
  dt.setSeconds(0);
  dt.setMilliseconds(0);
  dt1.setHours(0);
  dt1.setMinutes(0);
  dt1.setSeconds(0);
  dt1.setMilliseconds(0);
  if(dt.getTime() == dt1.getTime()){
    return 0;
  }
  dt.setDate(dt.getDate() + 4);
  dt1.setDate(dt.getDate() +3);
  if(dt.getTime() == dt1.getTime()){
    return 1;
  }
  return 2;
}

const Methods = {
  //sign activity
  signActivity: async function (options) {
    let select = await HELPER.maker({
      model: ModuleSql,
      type: 'checkExists'
    });
    let values = [options.userId, options.activityId];
    let isExists = await HELPER.query(select, values);
    if (isExists.done) {
      let  transaction = '';
      if (isExists.result.length > 0) {
        isExists.result[0].lastSignTime = Moment(isExists.result[0].lastSignTime).format('YYYY-MM-DD HH:mm:ss');
        options.signTimes = isExists.result[0].signTimes+1;
        options.seriesDays = 1;
        options.signDays =  isExists.result[0].signDays+1;
        let checkDay = checkDays(isExists.result[0].lastSignTime,options.signTime);
        if (checkDay===0) {
          options.seriesDays = isExists.result[0].seriesDays;
          options.signDays =  isExists.result[0].signDays
        }
        else if (checkDay===1) {
          options.seriesDays = isExists.result[0].seriesDays+1;
        }
        transaction = {
          0:{
            sql:ModuleSql.updateStatics,
            values:[options.signTimes,options.seriesDays,options.signDays,options.signTime,isExists.result[0].id]
          },
          1:{
            sql:ModuleSql.insertRecord,
            values:[isExists.result[0].id,options.signTime,options.mobile]
          }
        }
      }else{
        transaction = {
          extra:'insertId',
          0:{
            sql:ModuleSql.insertStatics,
            values:[options.userId,options.activityId,options.signTime]
          },
          1:{
            sql:ModuleSql.insertRecord,
            values:[options.signTime,options.mobile]
          }
        }
      }
      let reply = await HELPER.transaction(transaction);
      if(reply.done){
        return {done:true,data:{operation:true}}
      }
      return {done:false,code:10005,data:'activity sign failed cause un caught error~~'}

    }
    return {
      done: false,
      code: 12001,
      data: 'statement of database occur error~~'
    }
  }

}


module.exports = {
  execute: async function (name, params) {
    let reply = await HELPER.apply(Methods, name, params);
    return reply;
  }
}
