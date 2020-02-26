exports.get404 = (req, res, next) => {
  if (req.session.username)
  {
    res.redirect('/user/profile')
  }
  else
    res.redirect('/login')
  };
  