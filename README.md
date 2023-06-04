# Connecting HTML-file with nodejs-file which is connected to mongoDB docker-container to build a dynamic webpage.
while watching [docker tutorial](https://youtu.be/3c-iBn73dDE?t=4004) trying to make project. It seems like I am unable to establish connection in between them.

  - [x] established the connection  with the help of ejs(template engine), mongoose(ODM), atlas, express.
  
  How ?<br>
  - [x] config ejs<br>
  - [x] connect to mongoDB-Atlas
  - [x] define schema & model
  - [x] start server
  - [x] get request
    
```
p.get ("/", async(req, res) => {
          try {  const name = await Name.findOne({});
                 if(name) { res.render("index", {name : name.name});}
                 else { res.render("index", {name : "defaut_name" });}
               }
          catch (err) { console.log(...);
                        res.render.("index", {name : "default_name});
                       }
                   });
```
   Explaination : 
  - [x] post request
