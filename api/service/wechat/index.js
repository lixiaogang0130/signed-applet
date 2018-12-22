//request moudle
const Request = require('request');
//file system
const Fs = require('fs');
//random string key
const UUID = require('uuid');
const Methods = {
  generateAppletCode:async function(args){
    let cache = new SERVICE.base.CacheModel().build(4);
    let accessToken = await cache.acquire(sails.config.custom.appletId+'_access_token');
    if(accessToken ===null){
      let tempResult = await HELPER.request({
        url:sails.config.custom.binToken,
        method:'get',
        query:{
          // appid:sails.config.custom.appletId,
          // secret:sails.config.custom.appletSecret,
          appid: `wx94fd0da4bda4dee0`,
          secret: `99c884e69439ef6ec4fd72ffa6da2a7a`,
          grant_type:'client_credential'
        }
      });
      if(tempResult.done){
        accessToken = tempResult.data.access_token;
      }else{
        throw new Error('request we chat api occur error~~,message:'+tempResult);
      }
      await cache.storeWithExpire({
        key:sails.config.custom.appletId+'_access_token',
        data:accessToken,
        expire:7200
      })
    }
    let fileName = './images/'+UUID.v1()+'.png';

    return new Promise((resolve,reject)=>{
      Request({
        method: 'POST',
        url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + accessToken,
        body: JSON.stringify(args)
      }).pipe(Fs.createWriteStream(fileName)).on('close',()=>{
        return HELPER.upload(0,fileName)
            .then(ret=>{
              Fs.unlinkSync(fileName);
              if(ret.done){
                resolve({done:true,data:ret.data});
              }else{
                resolve({done:false,code:10008,data:'upload file to qi niu occur error~~'})
              }
            }).catch(err=>{
              Fs.unlinkSync(fileName);
              resolve({done:false,code:13001,data:e.message})
            })
      }).on('error',(e)=>{
        Fs.unlinkSync(fileName);
        resolve({done:false,code:13002,data:e.message})
      });
    })

  },



}
module.exports = Methods;
