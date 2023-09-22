const express = require('express');
const router = express.Router();

const { signup, login } = require('../controllers/Auth');
const { auth, admin, student } = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);

router.get("/test", auth, (req,res) => {
    res.json({
        success: true,
        message: "Test successful"
    })
})

router.get('/admin', auth, admin, (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to the Admin Route"
    })
});
router.get('/student', auth, student, (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to the Student Route"
    })
});

module.exports = router;