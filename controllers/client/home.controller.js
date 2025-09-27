module.exports.home = (req, res) => {
  console.log("here is home page");
  res.render("client/pages/home/index.pug",{
    pageTitle: "Home Page"
  });
}