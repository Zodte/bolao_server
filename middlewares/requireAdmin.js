module.exports = (req, res, next) => {
  const user = req.user
  if(!req.user.admin){
    return res.status(401).send({ error: 'You must be admin to complete this action' })
  }
  next();
}
