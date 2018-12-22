
//tcp
const Http = require('http');
//ssl tcp
const Https = require('https');
//uri resolver
const Url = require('url');

module.exports = {


  friendlyName: 'request',


  description: 'third platform request operation',


  inputs: {
    options:{
      type:'ref'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let receivedUrl = Url.parse(inputs.options.url);
    if (!receivedUrl.protocol) {
      receivedUrl.protocol = 'http:'
    }
    let receivedProtocol = receivedUrl.protocol;
    let receivedPath = receivedUrl.path;
    let params = {
      host: receivedUrl.host,
      hostname: receivedUrl.hostname,
      protocol: receivedProtocol,
      port: inputs.options.port ? inputs.options : receivedProtocol === 'http:' ? 80 : 443,
      method: inputs.options.method ? inputs.options.method : 'GET',
      headers: inputs.options.headers ? inputs.options.headers : {
        'content-type': 'application/json'
      }
    }
    if (inputs.options.query && !IsEmptyObj(inputs.options.query)) {
      receivedPath += '?';
      let tempArr = _.toPairs(inputs.options.query);
     tempArr =  tempArr.map(n=>n[0]+'='+n[1]);
      let tempStr = _.join(tempArr,'&')
      receivedPath += tempStr;
    }
    params.path = receivedPath;
    let protocol = receivedUrl.protocol == 'http:' ? Http : Https;
    let req = protocol.request(params, (res) => {
      if (res.statusCode === 500 || res.statusCode === 400 || res.statusCode===404) {
        return exits.success({done:false,message:'access third platform reply failed,received status is '+res.statusCode+'~~'});
      }
      let buff = '';
      res.on('data', (chunk) => {
        buff += chunk;
      });
      res.on('end', () => {
        let result;
        let tmp = buff.toString('utf8');
        try {
          result = JSON.parse(tmp);
          return exits.success({done:true,type:'json',data:result});
        } catch (err) {
          result = tmp;
          return exits.success({done:true,type:'string',data:result});
        }
      });
    });
    req.on('error', (err) => {
      return exits.success({done:false,message:'access third platform failed! can’t connect to the uri '+inputs.options.url});
    });
    if (inputs.options.data && inputs.options.method.toUpperCase() !== 'GET') req.write(JSON.stringify(inputs.options.data));
    req.end();
  }


};
