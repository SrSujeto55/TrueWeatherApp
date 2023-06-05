const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.set('PORT', 3000);
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('homePage');
})


app.listen(app.get('PORT'), () => {
    console.log(`Server listening in the port ${app.get('PORT')}`)
});