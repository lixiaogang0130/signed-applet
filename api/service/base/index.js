//json web token of third module
const Jwt = require('jsonwebtoken');
//redis config of third module
const Redis = require('ioredis');
//promise tool
const Q = require('q');
//params auth module
const Ajv = require('ajv');
/**
 * produce million times
 * @param str  string which you want to format
 *
 */
const formatTime = (str) => {
  let typeEnum = ['s', 'S', 'm', 'M', 'h', 'H', 'd', 'D'];
  let obj = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };
  let reg = /([1-9][0-9]*d|D){1}|([1-9][0-9]*h|H){1}|([1-9][0-9]*m|M){1}|([1-9][0-9]*s|S){1}/ig;
  let flag = reg.test(str);
  if (!flag) {
    return -1;
  }
  let num = str.match(/[1-9][0-9]*/ig);
  let types = str.match(/[s|S|m|M|h|H|d|D]/ig);
  let difference = _.difference(types, typeEnum);
  if (num.length != types.length || difference.length > 0) {
    return -1;
  }
  let time = 0;
  _.each(num, (i, n) => {
    time += i * obj[_.lowerCase(types[n])];
  })
  return time;
}
/**
 * cache class of redis
 * build produce
 * destroy destroy redis instance
 * storeWithExpire  cache data with expire time
 * acquire access data by key
 * hashStoreWithExpire cache data by hash mode with expire time
 * hashAcquire access data by hash mode which key and field you provide
 * remove delete the key you provide
 * exceed expire data
 * includes check the key is or not exists
 *
 */
class CacheModel {
  constructor(config) {
    this.config = config?config:sails.config.custom.redisConfig;
  }
  build(args = 0) {
    this.redis = new Redis(this.config);
    if (args) {
      this.redis.select(args);
    }
    return this;
  }
  destroy() {
    this.redis.disconnect();
  }
  /**
   *
   * store data with expire time
   * @param {*} options {data,expire,key}
   * @returns
   * @memberof CacheModel
   */
  storeWithExpire(options) {
    if (!options.data || !options.expire || !options.key) {
      throw new Error('cache data with expire time failed,params required (data,key,expire),received：' + typeof options == 'object' ? Object.keys(options) : options);
    }
    return this.redis.setex(options.key, options.expire, options.data)
  }
  /**
   * hash store data with expire time
   * @param {*} options {key field data}
   */
  hashStoreWithExpire(options) {
    return this.redis.hset(options.key, options.field, JSON.stringify(options.data))
      .then(result => {
        return this.redis.expire(options.key, options.expire ? formatTime(options.expire) / 1000 : formatTime('2h') / 1000);
      }).catch(e => {
        throw e
      })
  }
  acquire(key) {
    return this.redis.get(key);
  }
  hashAcquire(options) {
    return this.redis.hget(options.key, options.field)
  }
  remove(key) {
    return this.redis.del(key);
  }
  exceed(key, expire) {
    return this.redis.expire(key, expire);
  }
  includes(key) {
    return this.redis.exists(key);
  }
}

/*===================================================================================*/
// class  split line                                                                 //
/*===================================================================================*/

/**
 * credential class of web token
 * build generate credential
 * verify valid the credential
 * refresh refresh credential
 * decode decode the credential you want to check
 * store store credential with expire
 */
class CredentialModel {
  constructor(data, expire = '1m') {
    this.data = data;
    if (expire && typeof expire == 'string') {
      expire = formatTime(expire);
    }
    this.expire = expire;
    this.key = sails.config.custom.credentialKey;
  }
  //produce credential
  build() {
    if (typeof this.data != 'object') {
      throw new Error("create credential failed cause format error,required JSON object!")
    }
    return Jwt.sign(this.data, this.key, {
      expiresIn: this.expire ? this.expire : '1m'
    })
  }
  /**
   * verify credential
   * @param {*} token credential
   */
  verify(token) {
    let deffer = Q.defer();
    Jwt.verify(token, this.key, (err, decoded) => {
      if (err) return deffer.reject(err);
      if (decoded.exp > new Date().getTime() / 1000) {
        return deffer.resolve({
          status: true,
          data: decoded,
          token: token
        });
      } else {
        return deffer.resolve({
          status: false,
          token: token
        });
      }
    })
    return deffer.promise;
  }
  /**
   *
   * refresh credential
   * @param {*} token credential
   * @returns
   * @memberof CredentialModel
   */
  refresh(token) {
    let decoded = Jwt.decode(token);
    delete decoded.iat;
    delete decoded.exp;
    let newValue = Jwt.sign(decoded, this.key, {
      expiresIn: this.expire ? this.expire : '1h'
    })
    return newValue;
  }
  /**
   *
   *  decode credential
   * @param {*} token credential
   * @returns credential data
   * @memberof CredentialModel
   */
  decode(token) {
    let decoded = Jwt.decode(token);
    delete decoded.iat;
    delete decoded.exp;
    return decoded;
  }
  /**
   * store credential
   * @param {*} key redis credential key
   * @param {*} token credential
   */
  store(key, token) {
    let cache = new Cache(sails.config.redisConfig).build();
    return cache.storeWithExpire({
      key: key,
      data: token,
      expire: this.expire ? this.expire : '1h'
    });
  }
}

/*===================================================================================*/
// class  split line                                                                 //
/*===================================================================================*/
/**
 * paramAuth class
 * valid valid the param received
 * setSchema set valid rule
 */
class ParamAuthModel {
  constructor(schema) {
    if (typeof schema != 'object') {
      throw new Error('format error,schema should be a JSON object!');
    }
    this.schema = schema;
  }
  /**
   * valid params
   * @param {*} data params which need to valid
   */
  valid(data) {
    let ajv = new Ajv();
    return ajv.validate(this.schema, data)
  }
  /**
   * set rule
   * @param {*} data set valid rule
   */
  setSchema(data) {
    this.schema = data;
  }
}


//platform frequently-used tool
const Methods = {
  CacheModel,
  CredentialModel,
  ParamAuthModel,
  //number to  binary array
  numToArray: (num) => {
    if (!num || num == null) {
      num = 0;
    }
    let str = (num).toString(2);
    let arr = str.split('');
    let c = [0];
    for (let [i, v] of arr.entries()) {
      if (v == 1) {
        c.push(Math.pow(2, arr.length - i - 1));
      }
    }
    return c;
  }
}
module.exports = Methods;
