const QiNiu = require("qiniu");
const UUID = require('uuid');
const Config = new QiNiu.conf.Config();
const Util = require('util');

Config.zone = QiNiu.zone.Zone_z1;

//The key and secret of qi niu platform
QiNiu.conf.ACCESS_KEY = '';
QiNiu.conf.SECRET_KEY = '';

//namespace which you want to upload file
const Bucket = '';

const Mac = new QiNiu.auth.digest.Mac(QiNiu.conf.ACCESS_KEY, QiNiu.conf.SECRET_KEY);
//config.useHttpsDomain = true;
const BucketManager = new QiNiu.rs.BucketManager(Mac, Config);
function createUploadToken(options){
    var putPolicy = new QiNiu.rs.PutPolicy(options);
    return putPolicy.uploadToken();
}

module.exports = {
  friendlyName: 'uploadFile',
  description: 'upload file to qi niu platform~~',
  inputs: {
    uploadType: {
      type: 'number',
      required: true
    },
    filePath: {
      type: 'string',
      required: true
    }
  },
  exits: {

  },
  fn: async function (inputs, exits) {
    let currentDate = new Date();
    let timeStr = Moment(currentDate).format('YYYYMMDD');
    let uploadName = UUID.v1();
    let key = null;
    if (inputs.uploadType === 0) {
      key = 'tst-xzs/' + timeStr + '/' + uploadName + '.png';
    } else if (inputs.uploadType === 1) {
      key = 'tst-xzs/drafts/' + timeStr + '/' + uploadName + '.mp3';
    } else {
      key = 'tst-xzs/' + timeStr + '/' + uploadName + '.mp3';
    }
    let options = {
      scope: Bucket + ":" + key,
      callbackBodyType: 'application/json'
    };
    //generate token to upload
    let uploadToken = createUploadToken(options);
    let formUpLoader = new QiNiu.form_up.FormUploader(Config);
    let putExtra = new QiNiu.form_up.PutExtra();
    return new Promise((resolve,reject)=>{
      formUpLoader.putFile(uploadToken,key,inputs.filePath,putExtra,(err,ret)=>{
        if(err) reject(err);
        resolve(ret);
      })
    }).then(ret=>{
      return exits.success({done:true,data:{key:'https://scdn.yourbay.net/'+ret.key}});
    }).catch(e=>{
      return exits.success({done:false,data:e.message});
    })

  }
}
