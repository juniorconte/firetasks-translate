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
        NEW_TASK_INPUT: 'Nova tarefa',
        SESSION_TITLE: 'Autentique-se para concluir ou inserir outra tarefa',
        SESSION_DISCLAIMER: 'O Firetasks utiliza o padrão de autenticação baseado em OAuth gerenciado pelo Firebase, por tanto, sua senha ficará segura dentro de seu provedor de confiança, e jamais precisará ser informada para o Firetasks'
      },
      en: {
        HIDE_TASKS_BUTTON: 'Hide completed',
        SHOW_TASKS_BUTTON: 'Display completed',
        REMOVE_TASKS_BUTTON: 'Remove completed',
        NEW_TASK_INPUT: 'New task',
        SESSION_TITLE: 'Log in to complete or insert another task',
        SESSION_DISCLAIMER: 'The Firetasks uses the standard OAuth based authentication managed by Firebase, therefore, your password will be safe within your trusted provider, and never need to be informed to the Firetasks'
      },
      es: {
        HIDE_TASKS_BUTTON: 'Ocultar completada',
        SHOW_TASKS_BUTTON: 'Pantalla completado',
        REMOVE_TASKS_BUTTON: 'Eliminar completado',
        NEW_TASK_INPUT: 'Nueva tarea',
        SESSION_TITLE: 'Sesión completa o insertar otra tarea',
        SESSION_DISCLAIMER: 'El Firetasks utiliza el estándar de autenticación gestionado por bases avanzadas basada en OAuth, por lo tanto, la contraseña estará a salvo dentro de su proveedor de confianza y nunca necesitará ser informado a la Firetasks'
      },
      de: {
        HIDE_TASKS_BUTTON: 'Ausblenden abgeschlossen',
        SHOW_TASKS_BUTTON: 'Anzeige abgeschlossen',
        REMOVE_TASKS_BUTTON: 'Entfernen abgeschlossen',
        NEW_TASK_INPUT: 'Neue Aufgabe',
        SESSION_TITLE: 'Melden Sie sich bei abzuschließen oder einen anderen Vorgang einfügen',
        SESSION_DISCLAIMER: 'Die Firetasks nutzt den Standard, den OAuth Authentifizierung verwaltet von Firebase basierend, daher werden Ihr Passwort sicher in Ihrem vertrauenswürdigen Anbieter, und nie müssen, um die Firetasks informiert zu werden'
      },
      fr: {
        HIDE_TASKS_BUTTON: 'Masquer dûment rempli',
        SHOW_TASKS_BUTTON: 'Affichage terminé',
        REMOVE_TASKS_BUTTON: 'Remove terminée',
        NEW_TASK_INPUT: 'Nouvelle tâche',
        SESSION_TITLE: 'Connectez-vous pour compléter ou insérer une autre tâche',
        SESSION_DISCLAIMER: 'La Firetasks utilise la norme OAuth authentification gérée par Firebase basée sur, par conséquent, votre mot de passe sera en sécurité au sein de votre fournisseur de confiance et jamais besoin d’être informé de la Firetasks'
      },
      it: {
        HIDE_TASKS_BUTTON: 'Nascondi completato',
        SHOW_TASKS_BUTTON: 'Visualizzazione completato',
        REMOVE_TASKS_BUTTON: 'Rimuovere completato',
        NEW_TASK_INPUT: 'Nuova attività',
        SESSION_TITLE: 'Login per completare o inserire un\'altra attività',
        SESSION_DISCLAIMER: 'Il Firetasks utilizza lo standard OAuth basato su autenticazione gestita da Firebase, di conseguenza, la password sarà sicura all\'interno del vostro provider di fiducia e mai necessità di essere informato alla Firetasks'
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
