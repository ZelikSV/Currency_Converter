/* global myApp, angular, firebase */
(function() {
  myApp.controller('myFormlogin', ['$state', '$firebaseAuth', function($state, $firebaseAuth) {
    const firebaseAuthObject = $firebaseAuth();
    this.activeTab = true;
    this.userMail = '';
    this.userPassword = '';
    this.mailReg = null;
    this.passReg = null;
    this.passRegCheck = null;

    this.registration = function() {
      if (this.passReg === null || this.mailReg === null || this.passRegCheck === null) {
        alert('Please fill all fields of form');
      } else if (this.passReg !== this.passRegCheck) {
        alert('Passwords do not match');
      } else {
        register({ email: this.mailReg, password: this.passReg });
        $state.go('main.home');
      }
    };

    this.checker = function() {
      login({ email: this.userMail, password: this.userPassword })
        .then(() => $state.go('main.home'))
        .catch(error => alert(error));
    };

    function register(user) {
      return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
    }
    function login(user) {
      return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
    }
  }]);
}());