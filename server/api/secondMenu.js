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

  let secondMenuModel = await new SecondMenu(secondMenu).save()
  console.log(secondMenuModel)
  let r = 
    await FirstMenu.update({ _id: firstMenuId },
      { '$addToSet': { 'secondMenuList': secondMenuModel._id } }  
    ).catch(err => err)

  console.log(r)
  res.json({ ok: true })
})

router.delete('/secondMenu/:id', function (req, res, next) {
  let _id = req.params.id

  SecondMenu.remove({ _id }).then(r => {
    if (r.result.n == 0) {
      res.json({ ok: false })
    }
    res.json({ ok: true })
  })
})

export default router
