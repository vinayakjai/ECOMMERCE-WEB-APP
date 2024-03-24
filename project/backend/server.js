//initializes
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser=require('body-parser')
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');

const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

//app
const app = express();
app.use(bodyParser.urlencoded({ 
	extended: true 
}));
app.use(bodyParser.json());

//port
const port = process.env.PORT || 6400;

//routes
const productRoute = require('./routes/product');
const homeRoute = require('./routes/home');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

//middleware

const corsOptions={
	origin:'http://localhost:5173',
	credentials:true
}
app.use(cors(corsOptions));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.disable('view cache');

app.use('/', homeRoute);
app.use('/products', productRoute);
app.use('/carts', cartRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

app.get('/accesstoken',(req,res)=>{
	try{
		
	
	if(!req.cookies.token){
		return res.status(401).json({
			err:'unable to access token '
		})
		
	}
      return res.json({

      token:req.cookies.token
	  })
	}catch(err){
		return res.status(402).json({
			err:'err while accessing user token '
		})
	}
	
})

app.get('/logout',(req,res)=>{
	
	res.clearCookie('token');
	return res.status(200).json({
		msg:'logout done',
	})
})

//mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
	.then(() => {
		app.listen(port, () => {
			console.log('connect');
		});
	})
	.catch((err) => {
	     process.exit(1);
	});

module.exports = app;
