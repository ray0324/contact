/**
 * ContactsApp Module
 * Description
 */
angular.module('ContactsApp', ['ngRoute','ngResource','ngMessages'])
    .run(function($rootScope) {
        $rootScope.message = 'hello Angular';
    })
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/contact', {
                controller: 'ListController',
                templateUrl: 'views/list.html'
            })
            .when('/contact/new',{
                controller:'NewController',
                templateUrl:'views/new.html'
            });
        $locationProvider.html5Mode(true);
    }])
