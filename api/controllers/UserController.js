/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // This loads the sign-up page --> new.ejs
  'new': function (req, res) {
    // flash messages
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};
  },

  create: function (req, res, next) {

    // Create a User with the params sent form
    // the sign-up form --> new.ejs
    User.create(req.params.all(), function userCreated (err, user){

      // if there's an error
      // if(err) return next(err); on la changer
      if (err) {
        console.log(err);

        // flash messages
        req.session.flash = {
          err: err.ValidationError
        };

        // if error redirect back to sign-up page
        return res.redirect('/user/new');
      }

      //After successfuly creating the user
      //redirect to the show action
      res.json(user);
      req.session.flash = {};
    });
  }
};

