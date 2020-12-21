module.exports = (req, res, next) => {
    console.log("in check session");
    console.log(req.session);
    if (req.session === undefined || req.session.userID === undefined)
   //     res.redirect('/signin');
   res.json(["client"]);
    else
        next();
};
