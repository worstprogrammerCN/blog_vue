import { Router } from 'express'

const router = Router()

import { FirstMenu } from '../../MongooseModel'


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

router.delete('/firstMenu/:id', function (req, res, next) {
  let _id = req.params.id
  FirstMenu.remove({ _id }).then((r) => {
    if (r.result.n == 0) {
      console.log(r)
      res.json({ ok: false })
    }
    res.json({ ok: true })
  })
})

export default router
