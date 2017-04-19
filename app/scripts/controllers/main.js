'use strict';

/**
 * @ngdoc function
 * @name todoTranslateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoTranslateApp
 */
angular.module('todoTranslateApp')
  .controller('MainCtrl', function ($scope, $firebaseArray) {

    var ref = firebase.database().ref().child('todos');

    $scope.hide = false;
    $scope.todos = $firebaseArray(ref);
    $scope.options = ['pt','en','es','de','fr','it'];
    $scope.lang = 'pt';

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

  });
