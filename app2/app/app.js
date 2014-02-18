'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute','angular-responsive'])
    .config(function($routeProvider, responsiveHelperProvider) {
        var device = 'desktop';
        var responsiveHelper = responsiveHelperProvider.$get();
        if(responsiveHelper.isMobile()){
            device = 'mobile';
        }
        $routeProvider.when('/view1', {templateUrl: device + '/partial1.html', controller: 'myController'});
        $routeProvider.when('/view2', {templateUrl: device + '/partial2.html', controller: 'myController'});
        $routeProvider.otherwise({redirectTo: '/view1'});
    });


function myController($scope) {
    $scope.email = 'jlavin@jimlavin.net';
}