const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID;
const shortid = require ('shortid');

var db

// MongoClient.connect('mongodb://zellwk:zellwk@ds047955.mongolab.com:47955/star-wars-quotes', (err, database) => {
MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
  if (err) return console.log(err)
  db = database
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('listening on ', port)
  })
})

// app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/drinks', (req, res) => {
  db.collection('drinks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
})

app.get('/all', (req, res) => {
  db.collection('drinks').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
})

app.post('/drinks', (req, res) => {
  console.log(req.body)
  db.collection('drinks').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    db.collection('drinks').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.send(result)
    })
  })
})

// app.put('/drinks', (req, res) => {
//   db.collection('drinks')
//   .findOneAndUpdate({name: 'Yoda'}, {
//     $set: {
//       type: req.body.type,
//       date: req.body.date
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })
//
// app.delete('/drinks', (req, res) => {
//   db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('A darth vadar quote got deleted')
//   })
// })

app.delete('/deleteAll', (req, res) => {
  db.collection('drinks').remove({}, (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'Success'})
  })
})

app.delete('/deleteOne', (req, res) => {
  var id = req.body.id.toString();
  db.collection('drinks').remove({"_id": ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'Success'})
  })
})
