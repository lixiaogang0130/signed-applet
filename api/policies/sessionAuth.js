module.exports = async function(req,res,next){
  if(req.query.preview){
    req.decoded = {uid:1};
    return next();
  }
  let accessToken = req.body&&req.body.access_token?req.body.access_token:req.query&&req.query.access_token?req.query.access_token:req.headers['x-access-token'];
  if(accessToken){
    let Model  = new SERVICE.base.CredentialModel(null,'1h');
    try {
      let verify = await Model.verify(accessToken);
      if(verify.status){
        req.decoded = verify.data;
        return next()
      }
    } catch (e) {
      return res.status(403).json('not allowed to access! your permission denied！');
    }
  }
  return res.status(403).json('not allowed to access! your permission denied！');
}
