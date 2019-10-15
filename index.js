const express = require('express')

const server = express()

server.use(express.json())

server.use((req, res, next) => {
  console.time('Request')
  console.log(`Método: ${req.method}; URL: ${req.url};`)

  next()

  console.timeEnd('Request')

})

function checkUserExist (req, res, next) {

  if(!req.body.name) {
    return res.status(400).send({ error: 'Name is required' })
  }

  return next()

}

function checkUserInArray (req, res, next) {

  const user = users[req.params.index]

  if (!user){
    return res.status(400).send({ error: 'User does not exist' })
  }

  req.user = user

  return next()

}

const users = ['Katielly', 'Aline', 'Diana']

server.get('/users', (req, res) => {

  return res.json(users)

})

server.get('/users/:index', checkUserInArray, (req, res) => {

  //const { index } = req.params
  //return res.json(users[index])

  return res.json(req.user)
  
})

server.post('/users', (req, res) => {

  const { name } = req.body

  users.push(name)

  return res.send(users)

})

server.put('/users/:index', checkUserInArray, checkUserExist,  (req, res) => {

  const { index } = req.params
  const { name } = req.body

  users[index] = name

  return res.send(users)

})

server.delete('/users/:index', checkUserInArray, (req, res) => {
  
  const { index } = req.params

  users.splice(index, 1)

  return res.send(users)

})

server.listen(3050)