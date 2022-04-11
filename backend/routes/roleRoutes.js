
const router = require('express').Router();
let Role = require('../models/role_schema');

router.route('/').get((req, res) => {
    Role.find()
    .then(roles => res.json(roles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    const _roleId = req.params.id;
    Role.find({ _id: _roleId })
    .then(roles => res.json(roles))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/add').post((req, res) => {
//     newRoleData = ({
//         roleId : req.body.roleId,
//         roleName: req.body.roleName
//     });
//   //const Rolename = req.body.Rolename;

//   const newRole = new Role(newRoleData);

//   newRole.save()
//     .then(() => res.json('Role added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/update/:id').put((req, res) => {
    const id = req.params.id;
   
  Role.updateOne({_id:id},req.body)
    .then(() => res.json('Role updated!')).then(()=>{
        Role.find()
        .then(roles => res.json(roles))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    const _roleId = req.params.id;
    Role.deleteOne({ _id: _roleId })
    .then(() => res.json("Role deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;