import { Router } from 'express'

const router = Router()

import { FirstMenu, SecondMenu, Article } from '../../MongooseModel'

router.get('/secondMenu', async function (req, res, next) {
  let firstMenuId = req.query.firstMenuId
  let secondMenuList = 
    await SecondMenu.find({ firstMenuId })
      .populate('articles', '_id title')
  res.json({ ok: true, secondMenuList })
})

router.put('/secondMenu', async function (req, res, next) {
  let secondMenu = req.body.secondMenu
  let firstMenuId = secondMenu.firstMenuId
  secondMenu.articles = []

  // add secondMenu to collections
  let secondMenuModel = await new SecondMenu(secondMenu).save()
  console.log(secondMenuModel)

  // add secondMenu to firstMenu.secondMenuList
  let r = await FirstMenu.update({ _id: firstMenuId },
      { '$addToSet': { 'secondMenuList': secondMenuModel._id } })
  console.log(r)

  res.json({ ok: true, _id: secondMenuModel._id })
})

router.delete('/secondMenu/:id', async function (req, res, next) {
  let _id = req.params.id

  let r1 = await SecondMenu.remove({ _id })
  let r2 = await FirstMenu.update({ 'secondMenuList': _id }, { $pull: { 'secondMenuList': _id } })
  let r3 = await Article.remove({ firstMenuId: _id })

  res.json({ ok: true })
})

export default router
