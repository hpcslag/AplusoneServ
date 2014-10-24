Aplusone Server
===================================
Author: [MacTaylor](https://github.com/hpcslag "MacTaylor") ,Date: 2014/10/14
Language: Node.js

##How To Use:
    git clone https://github.com/hpcslag/AplusoneServ.git
    cd AplusoneServ-master
    npm install
    node app.js

    ./www save assets or everything!
##How to Set Up Configure.json
    {
      "baseDir": "./www",
      "dirindex":["index.html","default.html"],

      "host":{
      	"ip":"localhost", //if you use localhost, 127.0.0.1 cannot use
      	"port":80
      },
      "https":"disable", //if you want open https, please set options "enable"
      "view": "/view" //setup view engine path
      "cluster":1 //setup cluster length
    }
    *setup your port,ip here!
##How to add route
  open index file and coding after .map() using .get()