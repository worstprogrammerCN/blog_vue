import { Router } from 'express'

const router = Router()

import { FirstMenu, SecondMenu } from '../../MongooseModel'


router.get('/leveledMenu', async function (req, res, next) {
  let firstMenuList = await FirstMenu.find({}).populate('secondMenuList')
})

export default router
