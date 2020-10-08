const express = require('express')
const router = express.Router();
const { User } = require('../models/User')
const { auth } = require('../middleware/auth') 

//=================================
//             User
//=================================


//로그인을 한 유저의 정보를 통해 유저의 권한을 파악한다.
router.get('/auth', auth, (req, res) => {
    //여기까지 미들웨어auth.js를 통과해왔다는 것은 권한이 있다는 것 0은 관리자
    //서버에서 아래와 같은 응답을 준다
    res.status(200)
       .json({
          _id: req.user._id,
          isAdmin:req.user.role === 0? false : true,
          isAuth: true,
          email: req.user.email,
          lastname: req.user.lastname,
          role: req.user.role,
          image: req.user.image
    })
  })

//회원가입
router.post('/signup', (req, res) => {
    //회원가입시 필요한 정보를 클라이언트에서 받아오면 req.body
    const user = new User(req.body)
    //console.log(user)
    //데이터베이스에 넣어준다.
    //근데 넣어주기 전에 User.js에서 비밀번호를 암호화해야한다. gogo
    user.save((err, user) => {
        if(err) return res.json({ signupSuccess: false, err })
        return res.status(200).json({ signupSuccess: true })
    })
})

router.post('/signin', (req, res) => {
    //요청된 이메일이 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err,user) => {
        if(!user){
            return res.json({
                signinSuccess: false,
                message: "No user under this email"
            })
        }
         //이메일이 데이터베이스에 있으면 비밀번호가 일치하는지 확인한다 -> User schema(generateToken)
         user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch){
                return res.json({signinSuccess:false, message: 'Wrong Password' })
            }
            //두개다 일치히면 토큰을 생성한다 -> User schema(generateToken)
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err)
                //토큰 생성에 성공하면 토큰을 okenInCookie 쿠키에 저장한다.
                res.cookie('tokenInCookie', user.token)
                   .status(200)
                   .json({ signinSuccess: true, userId: user._id })
            })
        })
    })  
})

router.get('/signout', auth, (req,res) => {
    User.findOneAndUpdate({ _id: req.user._id},
        { token: "" },
        (err, user) => {
            if(err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
    })
})

module.exports = router