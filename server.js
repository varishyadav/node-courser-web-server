const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+ '/views/partials')
app.set('view engine','hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFileSync('server.log',log + '\n');
next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/',(req, res)=>{
    res.render('home.hbs',{
        homeTitle : 'Welcome',
        name: 'Varish Yadav',
    });
});
app.use(express.static(__dirname + '/public'));
app.get('/about',(req, res)=>{

    res.render('home.hbs',{
        homeTitle : 'About Page',
        name: 'Harish Yadav',
    });
});
app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});