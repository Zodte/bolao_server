if (process.env.NODE_ENV === 'production'){
  //Production
  module.exports = require('./prod');
}else{
  //development
  module.exports = require('./dev');
}
