import { Router } from 'express'

const router = Router()

import { SecondMenu, Article } from '../../MongooseModel'
import mongoose from 'mongoose'

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

// get article by id
router.get('/article', async function (req, res, next) {
  let _id = req.query._id
  let article = await Article.findById(_id)

  res.json({ ok:true, article })
})

// revise article
router.post('/article', async function(req, res, next) {
  let { _id, title, content } = req.body.article

  console.log(req.body)

  let article = await Article.findByIdAndUpdate(_id,
    {
      $set: { title, content }
    })
  
  res.json({ ok: true })
})

// add article
router.put('/article', async function (req, res, next) {
  let article = req.body.article
  let articleModel = await new Article(article).save()

  let r = await SecondMenu.update({ '_id': articleModel.secondMenuId },
    { '$push': { 'articles': articleModel._id } })
  
  res.json({ ok: true, _id: articleModel._id })
})


router.delete('/article/:id', async function (req, res, next) {
  let _id = req.params.id
  console.log(_id)
  let deletedArticle = await Article.findByIdAndRemove(_id)
  let result = await SecondMenu.update({ 'articles': _id },
    { '$pull': { 'articles': _id } })

  if (result.n > 0) {
    res.json({ ok: true })
  } else {
    res.json( {ok: false })
  }
  console.log(deletedArticle, result.n)

})

export default router
