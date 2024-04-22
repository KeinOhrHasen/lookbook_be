const express = require('express')
require('./db/mongoose')
const path = require('path');


const Grid = require('./models/grid')
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public/static/')


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
app.use(express.json())


app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>')
})

app.get('/grids', (req, res) => {
    Grid.find({}).then((data) => {
        res.send(data)
    }).catch((e) => {
        res.status(400).send(e)
    })

    // res.send([
    //     {
    //         id: 1, columns: 3, created_at: '20.04.2024', name: 'Grid Mock'
    // }
    // ])
})

app.post('/grid', (req, res) => {
    const grid = new Grid(req.body)

    grid.save().then(() => {
        res.send(grid)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.delete('/grid/delete:id', (req, res) => {
    const _id  = req.params.id
    console.log(_id)
    const grid = Grid.deleteOne({_id})

    grid.then((result) => {
        if (!result) {
            res.status(404).send()
        }
        res.send(result)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {title: 'Lookbook App v1'})
})


app.listen(8000, () => {
    console.log('Server is on port 8000.')
})