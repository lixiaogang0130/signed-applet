module.exports = function defineCustomHook(sails){
  // system initial load
 return {
  initialize:async function(){
    const MySql = require('mysql');
    const Moment = require('moment');
    const Fs = require('fs');
    const Path = require('path');
    const _ = require('lodash');
    global._ = _;
    global.IsEmptyObj = function(obj){
      if(typeof obj !='object'){
        return true;
      }
      if(Array.isArray(obj)){
        return true;
      }
      if(_.keys(obj).length===0){
        return true
      }
      return false;
    }
    let servicePath = './api/service';
    let valid = Fs.existsSync(servicePath);
    if(valid){
      let servicesPath = Fs.readdirSync(servicePath);
      servicePath = '../../service';
      let services = {};
      for(let p of servicesPath){
        services[p] = require(Path.join(servicePath,'/',p));
      }
      global.SERVICE = services;
    }else{
      global.SERVICE = {};
    }
    global.Moment = Moment;
    global.HELPER = sails.helpers;
    let temp = false;
    try {
      temp = MySql.createPool(sails.config.custom.databaseMysql);
    } catch (e) {
      temp = false;
    }
    if(!temp){
      console.error(`database config has error! please check your config and try again!~~`);
      process.exit();
    }
    global.CONNECT_POOL = temp;
    //valid database is connected or not connected
    CONNECT_POOL.getConnection((err, client) => {
      if (err) {
        console.error('-------------failed to connect database-----------------');
        console.error('ERROR:'+err.message);
        console.error('-------------------------end!---------------------------');
      } else {
        console.log('----------------initial database pool success!------------------');

        console.log(`=================================================================`)

        console.log('----------------welcome to use this platform!------------------');
        client.release();
      }
    })
  },
  routes:{
    before:{
      '/*':{
        // skipAssets:true,
        fn:async function(req,res,next){
          req.startTime = new Date().getTime();
          return next();
        }
      }
    },
    after:{
      '/*':{
        // skipAssets:true,
        fn:async function(req,res,next){
          let endTime = new Date().getTime();
          let elapsedTime = endTime - req.startTime;
          console.log('[UNHANDLED ROUTER LOG::]'+Moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '->Requested :: ', req.method, req.url, 404, elapsedTime + ' ms');
          return res.status(404).json('The uri you try to access is not found,please check your request~~'+'::your request uri is '+req.method+' '+ req.url);
        }
      }
    }
  }
 }
}
