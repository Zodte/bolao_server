module.exports = (req, res, next) => {
  const user = req.user
  console.log(user, user.firstName, user.admin, user.email)
  if(!req.user.admin){
    return res.status(401).send({ error: 'You must be admin to complete this action' })
  }
  next();
}
