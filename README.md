# Connecting EJS-file with Expessjs-file which is connected to mongoDB docker-container to build a dynamic webpage.
while watching [docker tutorial](https://youtu.be/3c-iBn73dDE?t=4004) trying to make project. It seems like I am unable to establish connection in between them.

  - [x] established the connection  with the help of ejs(template engine), mongoose(ODM), atlas, express, HTTP forms.
  
  How ?<br>
  - [ ] setup
  - [x] config ejs<br>
  ```
  app.set('view engine', 'ejs');                    // views dir. for ejs-files
app.use(express.urlencoded({ extended: true }));  // add middleware
app.use(express.static('public'));                // look public dir. for static files
```
  - [ ] connect to mongoDB-Atlas
  - [ ] define schema & model
  - [x] start server
  ```
  app.listen(...)
  ```
  - [x] get request
    
```
app.get ("/", async(req, res) => {
          try {  const name = await Name.findOne({});
                 if(name) { res.render("index", {name : name.name});}
                 else { res.render("index", {name : "defaut_name" });}
               }
          catch (err) { console.log(...);
                        res.render.("index", {name : "default_name});
                       }
                   });
```
<img width="323" alt="image" src="https://github.com/parth721/beginner/assets/112557191/36c2f946-0a04-4cba-99d8-2bb827ca344a">

   Explaination : <br> a get request is made.  which contains a callback function in which we try to find the first document which fulfill the  __query-criteria__  in this case there are no constraints. so it return the first document & assign it to name constant. <br>if name is ****truthy**** in the previous step, assign that value to name variable (__ejs__) from name (__constant__) connected to name field in the document (__names collection__). if name not found assign the "default_name" to name variable (__ejs__).
   
  - [x] post request to update data
  
  ```
  app.post('/', async (req, res) => {
  try {
    const newName = req.body.newName;

    await Name.findOneAndUpdate({}, { name: newName }, { upsert: true, new: true });

    res.redirect('/');
  } catch (err) {
    console.log('Error updating data:', err);
    res.redirect('/');
  }
});

  ```
  Explanation : <br> when the form submits a post request is triggered (see index.ejs).  which contains a callback function in which  we try to store the value form newName(ejs) to newName(const).  <br>The {} argument in findOneAndUpdate() finds the first document that matches any criteria, allowing us to update the existing name. The { upsert: true, new: true } options indicate that if no document is found, a new document should be created (upsert: true), and the updated document should be returned (new: true).
<br>After the update is complete, the client is redirected back to the root route '/', triggering a GET request to display the updated name on the webpage.
