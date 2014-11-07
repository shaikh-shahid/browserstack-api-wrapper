var request = require('request');
var fs=require("fs");

function browserstack(username,pass)
{
      this.username=username;
      this.pass=pass;
}

browserstack.prototype.getallbrowser=function(callback,param)
{
      var url="http://api.browserstack.com:80/3/browsers";
      if(!!param)
          {
            if(param==="flat"){
              url="http://api.browserstack.com:80/3/browsers?flat=true";
            }else if(param==="all"){
              url="http://api.browserstack.com:80/3/browsers?all=true";
            }
          }        
        request.get(url, {
        'auth': {
            'user': this.username,
            'pass': this.pass,
            'sendImmediately': false
        }
        },function(err,res,body){
            body=JSON.parse(body);
            callback(err,body);
        });
}


browserstack.prototype.newworker=function(os,os_version,url,browser,browser_version,callback)
{
  var options = {
          method: 'POST',
          uri: 'http://api.browserstack.com:80/3/worker',
          form: {
            os:os,os_version:os_version,url:url,browser:browser,browser_version:browser_version
            },
          headers: {
            'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.pass).toString('base64')
            }
        };

        request(options, function(error, response, body) {
            body=JSON.parse(body);
            callback(error,body.id);
        });
}

browserstack.prototype.take_shot=function(id,format,callback)
{
      request.get('http://api.browserstack.com:80/3/worker/'+id+'/screenshot.'+format+'', {
      'auth': {
          'user': this.username,
          'pass': this.pass,
          'sendImmediately': false
      }
      },function(err,res,body){
            body=JSON.parse(body);
            callback(err,body);
      });
}
browserstack.prototype.get_status=function(id,callback)
{
      request.get('http://api.browserstack.com:80/3/worker/'+id, {
      'auth': {
          'user': this.username,
          'pass': this.pass,
          'sendImmediately': false
      }
      },function(err,res,body){
        body=JSON.parse(body);
        callback(err,body);
      });
}
browserstack.prototype.get_status_all=function(callback)
{
    request.get('http://api.browserstack.com:80/3/workers', {
    'auth': {
        'user': this.username,
        'pass': this.pass,
        'sendImmediately': false
    }
    },function(err,res,body){
      if(body){
            body=JSON.parse(body);
            callback(err,body);
      }else
        {
          callback(err,body);
        }

    });
}
browserstack.prototype.deleteworker=function(id,callback){
      request.del('http://api.browserstack.com:80/3/worker/'+id, {
      'auth': {
          'user': this.username,
          'pass': this.pass,
          'sendImmediately': false
      }
      },function(err,res,body){
        if(body){
          body=JSON.parse(body);
          callback(err,body);
        }
      });
}
browserstack.prototype.status=function(callback)
{

  request.get('http://api.browserstack.com/3/status', {
  'auth': {
      'user': this.username,
      'pass': this.pass,
      'sendImmediately': false
  }
  },function(err,res,body){
    if(body){
      body=JSON.parse(body);
      callback(err,body);
    }
  });
}


module.exports=browserstack;
