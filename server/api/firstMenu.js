import { Router } from 'express'

const router = Router()

import { FirstMenu, SecondMenu, Article } from '../../MongooseModel'


router.get('/firstMenu', async function (req, res, next) {
  let firstMenuList = await FirstMenu.find({})
  res.json(firstMenuList)
})

router.put('/firstMenu', async function (req, res, next) {
  let firstMenu = req.body.firstMenu
  firstMenu.secondMenuList = []
  
  let menu = await new FirstMenu(firstMenu).save()
  res.json({ ok: true, _id: menu._id })
})

router.delete('/firstMenu/:id', async function (req, res, next) {
  let _id = req.params.id
  let r1 = await FirstMenu.remove({ _id })
  let r2 = await SecondMenu.remove({ firstMenuId: _id })
  let r3 = await Article.remove({ firstMenuId: _id })
  res.json({ ok: true })
})

export default router
