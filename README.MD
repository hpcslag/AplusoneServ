Aplusone Server
===================================
Author: [MacTaylor](https://github.com/hpcslag "MacTaylor") ,Date: 2014/10/14
Language: Node.js

##How To Use:
    git clone https://github.com/hpcslag/AplusoneServ.git
    cd AplusoneServ-master
    mkdir www
    npm install
    node app.js

    ./www save assets or everything!
##How to Set Up Configure.json
    {
      "baseDir": "./www",
      "dirindex":["index.html","default.html"],
    
      "host":{
      	"ip":"127.0.0.1",
      	"port":80
      }
    }
    *setup your port,ip here!