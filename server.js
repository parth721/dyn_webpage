const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const app = express();
const port = 3000; // Choose your desired port

// Configure EJS as the template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Create a "public" folder to serve static files (e.g., CSS, JavaScript)

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ghoshparth630:test1234@cluster0.sa0slqr.mongodb.net/usernames?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.log('Error connecting to MongoDB Atlas:', error);
});

// Define a schema and model for your data
const nameSchema = new mongoose.Schema({
  name: String,
});

const Name = mongoose.model('Name', nameSchema);


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get('/', async (req, res) => {
    try {
      const name = await Name.findOne({});
  
      if (name) {
        res.render('index', { name: name.name });
      } else {
        res.render('index', { name: 'Default Name' });
      }
    } catch (err) {
      console.log('Error searching for data:', err);
      res.render('index', { name: 'Default Name' });
    }
  });
  
  app.post('/', async (req, res) => {
    try {
      const newName = req.body.newName;
  
      const name = await Name.findOneAndUpdate({}, { name: newName }, { upsert: true, new: true });
  
      res.redirect('/');
    } catch (err) {
      console.log('Error updating data:', err);
      res.redirect('/');
    }
  });
  