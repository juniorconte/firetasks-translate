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

    $scope.todos = $firebaseArray(ref);
    $scope.options = ['pt','en','es','de','fr','it'];
    $scope.lang = $cookies.get('lang') || 'pt';
    $scope.hide = $cookies.get('hide') === 'true' || false;
    $scope.currentUser = null;

    $scope.addTodo = function(title, lang, user) {
      if (!!title) {
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

    $scope.progress = function() {
      return $scope.todos.filter(function(todo) {
        return todo.done;
      }).length / $scope.todos.length * 100;
    };

    $scope.clean = function() {
      $scope.todos.forEach(function(todo) {
        if (todo.done) {
          $scope.todos.$remove(todo);
        }
      });
    };

    $scope.saveLang = function() {
      $cookies.put('lang', $scope.lang);
      tmhDynamicLocale.set($scope.lang);
      $translate.use($scope.lang);
    };

    $scope.saveHide = function() {
      $cookies.put('hide', $scope.hide);
    };

    $scope.login = function() {
      $firebaseAuth().$signInWithPopup('google').then(function(firebaseUser) {
        console.info(firebaseUser);
      }).catch(function(error) {
        console.log(error);
      });
    };

    $scope.logout = function() {
      $firebaseAuth().$signOut();
    };

    $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser) {
        $scope.currentUser = {
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL,
          displayName: firebaseUser.displayName
        };
      } else {
        $scope.currentUser = null;
      }
    });

  });
