import { Router } from 'express'

const router = Router()

import { FirstMenu, SecondMenu } from '../../MongooseModel'


router.get('/leveledMenu', async function (req, res, next) {
  let firstMenuList = await FirstMenu.find({}).populate('secondMenuList', '_id name')

  res.json(firstMenuList)
})

export default router
