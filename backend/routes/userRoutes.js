
const router = require('express').Router();
const jwt = require('jsonwebtoken');
let User = require('../models/user_schema');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
  const username = req.params.username;
  User.findOne({ username: username })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/GetByRoleId/:id').get((req, res) => {
  const _roleId = req.params.id;
  User.find({ roleId: _roleId })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/validateLogin/:username/:password').get((req, res) => {
  const _username = req.params.username;
  const _password = req.params.password;

  User.find({ username: _username, password: _password })
    .then(users => res.json( JSON.parse(users)))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/validateCurrentUser/:username').get((req, res) => {
  const _username = req.params.username;

  User.findOne({ username: _username })
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({ username: userData.username }, (error, user) => {
    if (error) {
      console.log(error);
    }
    else {
      if (!user) {
        res.status(401).send('Invalid Email');
      } else if (user.password !== userData.password) {
        res.status(401).send('Invalid Password');
      }
      else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload,'tpConnect')
        res.status(200).send({payload});
      }
    }
  });
});

function verifyToken(req,res,next){
  if(!req.header.authorization){
    return res.status(401).send('unauthorized request')
  }
  let token  = req.header.authorization.split(' ')[1]
  
  if(token === 'null'){
    return res.status(401).send('unauthorized request')
  }
  try {
    let payload = jwt.verify(token,'tpConnect')
    if(!payload){
      return res.status(401).send(token)
  }
    req.userId = payload.subject
    next()
  }
  catch(err){
    return res.status(401).send('unauthorized request')
  }
}

router.route('/add').post((req, res) => {
  const _username = req.body.username;
  const _password = req.body.password;
  const _name = req.body.name;
  const _roleId = req.body.roleId;
  var _user = new User({ username: _username, password: _password, name: _name, token: null, roleId: _roleId });

  _user.save((error,registeredUser)=>{
    if (error) {
      console.log(error);
    }
    else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload,'b2Connect')
        res.status(200).send({token});
    }
  });
});

router.route('/delete/:id').delete((req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id, })
    .then(() => res.json("User deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;