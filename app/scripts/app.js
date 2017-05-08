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
    'ngSanitize',
    'firebase',
    'tmh.dynamicLocale',
    'pascalprecht.translate'
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
  })
  .config(function ($translateProvider, tmhDynamicLocaleProvider) {
    function getCookie(cname) {
      var name = cname + '=';
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');

      for (var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
    }

    var translations = {
      pt: {
        HIDE_TASKS_BUTTON: 'Esconder concluídas',
        SHOW_TASKS_BUTTON: 'Exibir concluídas',
        REMOVE_TASKS_BUTTON: 'Remover concluídas',
        NEW_TASK_INPUT: 'Nova tarefa'
      },
      en: {
        HIDE_TASKS_BUTTON: 'Hide completed',
        SHOW_TASKS_BUTTON: 'Display completed',
        REMOVE_TASKS_BUTTON: 'Remove completed',
        NEW_TASK_INPUT: 'New task'
      },
      es: {
        HIDE_TASKS_BUTTON: 'Ocultar completada',
        SHOW_TASKS_BUTTON: 'Pantalla completado',
        REMOVE_TASKS_BUTTON: 'Eliminar completado',
        NEW_TASK_INPUT: 'Nueva tarea'
      },
      de: {
        HIDE_TASKS_BUTTON: 'Ausblenden abgeschlossen',
        SHOW_TASKS_BUTTON: 'Anzeige abgeschlossen',
        REMOVE_TASKS_BUTTON: 'Entfernen abgeschlossen',
        NEW_TASK_INPUT: 'Neue Aufgabe'
      },
      fr: {
        HIDE_TASKS_BUTTON: 'Masquer dûment rempli',
        SHOW_TASKS_BUTTON: 'Affichage terminé',
        REMOVE_TASKS_BUTTON: 'Remove terminée',
        NEW_TASK_INPUT: 'Nouvelle tâche'
      },
      it: {
        HIDE_TASKS_BUTTON: 'Nascondi completato',
        SHOW_TASKS_BUTTON: 'Visualizzazione completato',
        REMOVE_TASKS_BUTTON: 'Rimuovere completato',
        NEW_TASK_INPUT: 'Nuova attività'
      }
    };

    $translateProvider
      .translations('pt', translations.pt)
      .translations('en', translations.en)
      .translations('es', translations.es)
      .translations('de', translations.de)
      .translations('fr', translations.fr)
      .translations('it', translations.it)
      .useSanitizeValueStrategy(null)
      .preferredLanguage(getCookie('lang') || 'pt');

    tmhDynamicLocaleProvider.localeLocationPattern('https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.6.4/angular-locale_{{locale}}.js');
    tmhDynamicLocaleProvider.defaultLocale(getCookie('lang') || 'pt');
  });
