//This file contains definitions of the controller methods that were used in the preceding user route
// declarations as callbacks to be executed when a route request is received by the server.
//This controller will make use of the errorHandler helper to respond to route
//requests with meaningful messages when a Mongoose error occurs. It will also use a
//module called 'lodash' when updating an existing user with changed values.

import User from '../models/user.model'
//lodash is a JavaScript library that provides utility functions for
//common programming tasks, including the manipulation of arrays and objects.
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

//The function returns a Promise.
const create = async (req, res) => {
    const user = new User(req.body)
    try {
        //to save the new user in the database after Mongoose has performed a validation check on the data.
        //await causes async function to wait until the returned Promise resolves
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next() //is used to propagate control to the next relevant controller function
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default { create, userByID, read, list, remove, update }