import { Router } from 'express'

import firstMenu from './firstMenu'
import secondMenu from './secondMenu'
import article from './article'
import leveledMenu from './leveledMenu'

const router = Router()

// Add USERS Routes
router.use(firstMenu)
router.use(secondMenu)
router.use(article)
router.use(leveledMenu)

export default router
