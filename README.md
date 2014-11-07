#Browser-stack api wrapper
##This package is wrapper of browserstack api.
###Install
------------------
npm install browserstack-wrapper
####API
------------------------
  - getallbrowser()
-----------------------
  Returns all listed browser. 
     Parameters:\n 
          flat or all (Optional).
  - newworker()
--------------------
   Creates new worker. <br>
        Parameters: <br>
                (Required) <br>
                os : Operating system name listed from above function,<br>
                os_version: Operating system version listed from above function,<br>
                url: Valid url to navigate the browser,<br>
                browser: Name of browser listed from above function ,<br>
                browser_version: Version of browser listed from above function. <br>
take_shot()
---------------------------------
Take screenshot of worker.<br>
Parameters: <br>
        id: worker id returns from above function, <br>
        format: png,json,xml\n<br>
get_status()
--------------------------
Fetch current status of worker.<br>
Parameters: <br>
    id: worker id.
get_status_all()------------------------
Fetch all workers status<br>
deleteworker()
----------------------
Delete the worker <br>
Parameters:<br> 
id : worker id.<br>
status()---------------------
Returns the current status of api.<br>
Example code: 
--------------------------
```javascript
    var browserstack=require('browserstack-wrapper');
    var api=new browserstack('Your user name','Your api key');
    //Get all browsers
    api.getallbrowser(function(err,data){
            if(err){
                console.log(err);
              }
            else{
                  console.log(data);
              }
    });
    //create new worker
    api.newworker('Windows','7','http://www.google.com','firefox','8.0',function(err,id){
        if (err) {
              console.log(err);
        }else{
          console.log('ID of worker : '+id);
        }
    });
    //Take screen shot
    api.take_shot('worker ID','json',function(err,url){
        if (err) {
          console.log('Error : '+err);
        }else{
              console.log('Please visit : '+url.url+'to view screen shot');
        }
    });
    //Delete worker
    api.deleteworker('worker ID',function(err,data){
      if(err){
        console.log(err);
      }else{
        console.log('time taken'+data.time);
      }
    });
    ```