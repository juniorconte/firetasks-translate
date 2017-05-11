'use strict';

/**
 * @ngdoc function
 * @name todoTranslateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoTranslateApp
 */
angular.module('todoTranslateApp')
  .controller('MainCtrl', function ($scope, $window, $firebaseArray, $firebaseAuth, $cookies, $locale, $translate, tmhDynamicLocale) {

    var ref = firebase.database().ref().child('todos');

    $scope.options = ['pt','en','es','de','fr','it'];
    $scope.todos = $firebaseArray(ref);
    $scope.lang = $cookies.get('lang') || 'pt';
    $scope.hide = $cookies.get('hide') === 'true' || false;
    $scope.user = null;

    $scope.addTodo = function(title, lang, user) {
      if (title) {
        $scope.todos.$add({
          done: false,
          title: title,
          lang: lang,
          user: user,
          createdAt: {
            '.sv': 'timestamp'
          }
        });
      }
    };

    $scope.clean = function() {
      $scope.todos.forEach(function(todo) {
        if (todo.done) {
          $scope.todos.$remove(todo);
        }
      });
    };

    $scope.progress = function() {
      return $scope.todos.filter(function(todo) {
        return todo.done;
      }).length / $scope.todos.length * 100;
    };

    $scope.saveLang = function(lang) {
      $cookies.put('lang', lang);
      tmhDynamicLocale.set(lang);
      $translate.use(lang);
    };

    $scope.saveHide = function(hide) {
      $cookies.put('hide', hide);
    };

    $scope.login = function(provider) {
      $firebaseAuth().$signInWithPopup(provider).then(function(firebaseUser) {
        console.info('success', firebaseUser);
      }).catch(function(error) {
        console.warn('error', error);

        if (error.code === 'auth/account-exists-with-different-credential') {
          $window.alert('O email ' + error.email + ' já está associado a outro provedor de acesso, utilize-o para continuar.');
        }
      });
    };

    $scope.logout = function() {
      $firebaseAuth().$signOut();
    };

    $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser) {
        $scope.user = {
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL,
          displayName: firebaseUser.displayName
        };
      } else {
        $scope.user = null;
      }
    });

  });
