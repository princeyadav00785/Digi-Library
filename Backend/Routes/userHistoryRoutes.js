const express = require('express');
const router = express.Router();
const userController=require('../Controllers/userController');
const { protect,authorize } = require('../Middlewares/authMiddleware');



router.get('/:id',protect,authorize('admin', 'librarian'),userController.getUserHistory );

module.exports= router;