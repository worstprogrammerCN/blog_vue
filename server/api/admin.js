import { Router } from 'express'

const router = Router()

import mongoose from 'mongoose'

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

router.post('/admin', function(req, res, next) {
  let { username, password } = req.body.admin
  if (username === 'awisre' && password === 'jinqu31@#!') {
    res.json({ ok: true })
  } else {
    res.json({ ok: false })
  }
})


export default router
