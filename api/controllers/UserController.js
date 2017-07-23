/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // This loads the sign-up page --> new.ejs
  'new': function (req, res) {
    // flash dernah fel policies
    res.view();
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
      // from ep1-6 // res.json(user);

      res.redirect('user/show/'+user.id);
    });
  },

  // render the profile view (e.g. /views/show.ejs)
  show: function (req, res, next) {
    User.findOne(req.param('id'), function foundUser (err, user) {
      if(err) return next(err);
      if(!user) return next();
      res.view({
        user:user
      });
    });
  }
};

