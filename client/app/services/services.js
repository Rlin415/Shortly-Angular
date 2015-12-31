angular.module('shortly.services', [])

.factory('Links', function ($http) {
  var data = {};
  var link = {};
  //getLinks method for the scope
  var getLinks = function() {
    // http get request here
    console.log('RUNNING GET LINKS');
    $http({
      method: 'GET',
      url: '/api/links',
    }).then(function(resp) {
      // console.log('THIS IS THE URL', data.url);
      console.log('RESPONSE FROM GET REQUEST', resp);
      data.links = resp.data;
      return;
    });
  };

  // addlink method
  var addLink = function(link){
    console.log('link from addlink', link);
    $http({
      method: 'POST',
      url: '/api/links',
      data: link
      });
  };

  return {
    data: data,
    link: link,
    getLinks: getLinks,
    addLink: addLink
  };
})

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
