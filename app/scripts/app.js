'use strict';

/**
 * @ngdoc overview
 * @name todoTranslateApp
 * @description
 * # todoTranslateApp
 *
 * Main module of the application.
 */
angular
  .module('todoTranslateApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
