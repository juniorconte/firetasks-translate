'use strict';

/**
 * @ngdoc function
 * @name todoTranslateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoTranslateApp
 */
angular.module('todoTranslateApp')
  .controller('MainCtrl', function ($scope, $firebaseArray, $cookies) {

    var ref = firebase.database().ref().child('todos');

    $scope.todos = $firebaseArray(ref);
    $scope.options = ['pt','en','es','de','fr','it'];
    $scope.lang = $cookies.get('lang') || 'pt';
    $scope.hide = $cookies.get('hide') || false;

    $scope.addTodo = function(title, lang) {
      $scope.todos.$add({
        done: false,
        title: title,
        lang: lang
      });
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
    };

    $scope.saveHide = function() {
      $cookies.put('hide', $scope.hide);
    };

  });
