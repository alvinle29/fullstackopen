const bcrypt = require('bcrypt')
const userRouter = require('express').Router()

const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password === undefined || password.length < 3) {
    return response
      .status(400)
      .send({ error: 'password is too short or missing' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (error) {
    response
      .status(400)
      .send({error: 'username is too short'})
  }
})

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs')
  response.json(users)
})

module.exports = userRouter