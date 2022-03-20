const express = require('express')
const router = express.Router() //gets router from express
const Subscriber = require('../models/subscriber') //require subscriber model (has schema)

//route for getting all subscribers--Use REST client extension or postman to test
router.get('/', async (req, res) => {
  try {
    //try to get all subscribers using Subscriber model
    const subscribers = await Subscriber.find()
    //if successful, send it
    res.json(subscribers) //if successful send all subscribers to user
  } catch (err) {
    //if error,catch it and send json message to user (it's json api)
    //send a message --error.mes sage--and specify error w/ 500 status code (server error, means database had some error which caused transaction not to work. did not have to do w/ user or client using api
    res.status(500).json({ message: err.message })
  }
})

//route for getting a subscriber -- see getSubscriber middleware function below
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber) //sends back name of subscriber
})

//route for creating a subscriber
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name, //what user sends us in json
    subscribedToChannel: req.body.subscribedToChannel
  })
  try {
    const newSubscriber = await subscriber.save() //persists to database and if successful puts it in newSubscriber variable
    res.status(201).json(newSubscriber) //201 is 'successfully created an object
  } catch (err) {
    res.status(400).json({ message: err.message }) //if user gives bad data--client error - user input error
  }
})

//--------route for updating a subscriber--using patch b/c we only want to update based on what user passes in
//if you used put it would overwrite everything instead of just info user patches
router.patch('/:id', getSubscriber, async (req, res) => {
  //if user passes name to us, set the name to the body of user's request
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  //same for subscribedToChannel
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  //try catch to update our user
  try {
    //gives updated version of subscriber if they successfully saved
    updatedSubscriber = await res.subscriber.save()
    //send back updated subscriber
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

//route for deleting a subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove()
    res.json({ message: 'Subscriber has been deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//middleware for individual routes above w/ "/id"..next tells it to move to next section of code which is the callback above for :id router.
async function getSubscriber (req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id) //get user based on id passed in url
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' }) //user not found and leaves function
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }) //if something is wrong on our end w/server
  }
  res.subscriber = subscriber //now can call this subscriber response in routes above
  next() //if it's gotten to here, function successfully executed and it can move on to next piece of middleware or request itself
}

module.exports = router //exports router
