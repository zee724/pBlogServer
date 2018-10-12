const post = require('./routes/post');
const user = require('./routes/user');
const auth = require('./routes/auth');

const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + '-' + file.originalname )
    }
})

const upload = multer({ storage: storage })

const app = express();

mongoose.connect('mongodb://localhost/postnote',{ useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb ...'))
    .catch((err)=> console.error('Counld not connect to MongoDb ..'));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json());
    
app.use(express.static('public'));

//Serves all the request which includes /upload int the url from Upload folder
app.use('/uploads',express.static('uploads'));

const UploadPrefix = 'http://localhost:3000/uploads/';
app.post('/api/upload',upload.single('avatar'),(req,res)=>{
    res.send({success:'ok', fileUrl: UploadPrefix + req.file.filename });
});

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use('/api/posts',post);
app.use('/api/users',user);
app.use('/api/auth',auth);

app.listen(3000,()=>console.log('Listenning on port 3000...'));

