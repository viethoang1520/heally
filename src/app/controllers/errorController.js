class ErrorController{
  index(req, res) {
    res.render('error');
  }
}
module.exports = new ErrorController();