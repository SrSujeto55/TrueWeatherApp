const express = require('express');
const app = new express();
const path = require('path');
const bodyParser = require('body-parser');
const mainRoutes = require('../routers/mainRouter');

app.set('PORT', 3000);

/**
 * Middleware to print in console the method requested by the user
 */
app.use((req, res, next) => {
	console.log(`${req.url} - ${req.method}`);
	next();
});
/**
 * Middlewares used to transform data send by the client to the server in a JSON format
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../views'));
app.use('/public', express.static('public'));
app.use(mainRoutes);


app.listen(app.get('PORT'), () => {
    console.log(`Server listening in the port ${app.get('PORT')}`)
});