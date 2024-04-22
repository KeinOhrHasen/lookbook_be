const express = require('express');
const path = require('path');
    
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public/static/')


// for dev mode only
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>')
})

app.get('/grids', (req, res) => {
    res.send([
        {
            id: 1, columns: 3, created_at: '20.04.2024', name: 'Grid Mock'
    }
    ])
})

app.post('grid', (req, res) => {
    res.send('Hello Express!')
})

app.get('*', (req, res) => {
    res.render('not-found', {title: 'Lookbook App v1'})
})


app.listen(8000, () => {
    console.log('Server is on port 8000.')
})