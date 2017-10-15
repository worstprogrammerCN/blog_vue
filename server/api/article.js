import { Router } from 'express'

const router = Router()

import { SecondMenu, Article } from '../../MongooseModel'

// get article by id
router.get('/article', async function (req, res, next) {
  let _id = req.query._id
  let article = await Article.findById(_id)

  res.json({ ok:true, article })
})

// 
router.put('/article', async function (req, res, next) {
  let article = req.body.article
  let articleModel = await new Article(article).save()

  let r = await SecondMenu.update({ '_id': articleModel.secondMenuId },
    { '$push': { 'articles': articleModel._id } })
  
  res.json({ ok: true })
})


router.delete('/article/:id', async function (req, res, next) {
  let _id = req.params.id
  let r1 = Article.remove({ _id })
  let r2 = SecondMenu.update({ 'articles': articleModel._id },
    { $pull: { 'articles': articleModel._id } })

  res.json({ ok: true })
})

export default router
