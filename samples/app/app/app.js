'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['angular-responsive'])
       .controller('myController',
            function ($scope) {
                $scope.email = 'jlavin@jimlavin.net';
        });
