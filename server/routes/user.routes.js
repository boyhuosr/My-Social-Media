//This file will use express.Router() to define route paths with the relevant HTTP methods and 
//assign the corresponding controller function that should be called when these requests are received by the server.

import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
//it handles the userId parameter in a requested route by executing the userByID controller function.
router.param('userId', userCtrl.userByID)

export default router