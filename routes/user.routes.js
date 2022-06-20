const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
const multer = require("multer");
const upload = multer();


//auth
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.logout);

//user display
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);

//update = put
router.put('/:id', userController.updateUser);

//delete
router.delete('/:id', userController.deleteUser);

//mettre a jour le tableau d'un utilisateur
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

//upload any or single
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports=router;