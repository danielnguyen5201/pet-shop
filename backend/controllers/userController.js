import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).json({ message: 'Fail to authenticate.' })
  }
})

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) res.status(404).json({ message: 'Fail to get profile.' })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } catch (e) {
    console.log('error:', e)
  }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
      const updatedUser = user.save()
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }

  } catch (e) {
    res.status(400).json({ message: 'Fail to update profile' })
  }
})

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) res.status(400).json({ message: 'User already exists.' })

  const user = await User.create({ name, email, password })

  if (user) res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  })
  else res.status(400).json({ message: 'Invalid user data.' })
})

