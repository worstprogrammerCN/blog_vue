import { Router } from 'express'

import firstMenu from './firstMenu'
import secondMenu from './secondMenu'
import article from './article'
import leveledMenu from './leveledMenu'
import admin from './admin'

const router = Router()

// Add USERS Routes
router.use(firstMenu)
router.use(secondMenu)
router.use(article)
router.use(leveledMenu)
router.use(admin)

export default router
