(function () {
    'use strict';

    angular.module('angular-responsive', [])

        .directive('arMobile', ['$window', '$animate', function ($window, $animate) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                isMobile: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

                    var width = $window.outerWidth;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    var smartDevice = (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);

                    return smartDevice && width <= 767;
                },
                compile: function (element, attr, transclude) {
                    return function postLink(scope, element, attr) {
                        var childElement, childScope;
                        scope.$watch(attr['arDevice'], function (newValue) {
                            if (childElement) {
                                childElement.remove();
                                childScope.$destroy();
                                childElement = undefined;
                                childScope = undefined;
                            }
                            if (device.isMobile()) {
                                childScope = scope.$new();
                                childElement = transclude(childScope, function (clone) {
                                    element.after(clone);
                                });
                            }
                        });
                    }
                }};

            return device;
        }])
        .directive('arTablet', ['$window', '$animate', function ($window, $animate) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                isTablet: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

                    var width = $window.outerWidth;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    var smartDevice = (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);

                    return smartDevice && width >= 768;
                },
                compile: function (element, attr, transclude) {
                    return function postLink(scope, element, attr) {
                        var childElement, childScope;
                        scope.$watch(attr['arDevice'], function (newValue) {
                            if (childElement) {
                                childElement.remove();
                                childScope.$destroy();
                                childElement = undefined;
                                childScope = undefined;
                            }
                            if (device.isTablet()) {
                                childScope = scope.$new();
                                childElement = transclude(childScope, function (clone) {
                                    element.after(clone);
                                });
                            }
                        });
                    }
                }};

            return device;
        }])
        .directive('arDesktop', ['$window', '$animate', function ($window, $animate) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                isDesktop: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    return !(/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                },
                compile: function (element, attr, transclude) {
                    return function postLink(scope, element, attr) {
                        var childElement, childScope;
                        scope.$watch(attr['arDevice'], function (newValue) {
                            if (childElement) {
                                childElement.remove();
                                childScope.$destroy();
                                childElement = undefined;
                                childScope = undefined;
                            }
                            if (device.isDesktop()) {
                                childScope = scope.$new();
                                childElement = transclude(childScope, function (clone) {
                                    element.after(clone);
                                });
                            }
                        });
                    }
                }};

            return device;
        }])
        .directive('arResponsive', ['$window', '$animate', function ($window, $animate) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                isMobile: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

                    var width = $window.outerWidth;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    var smartDevice = (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);

                    return smartDevice && width <= 767;
                },
                isTablet: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

                    var width = $window.outerWidth;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    var smartDevice = (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);

                    return smartDevice && width >= 768;
                },
                isDesktop: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    return !(/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                },
                compile: function (element, attr, transclude) {
                    return function postLink(scope, element, attr) {
                        var childElement, childScope;
                        var deviceTypes = attr['arResponsive'].split(',');
                        scope.$watch(attr['arDevice'], function (newValue) {
                            if (childElement) {
                                childElement.remove();
                                childScope.$destroy();
                                childElement = undefined;
                                childScope = undefined;
                            }

                            var showElement = false;

                            angular.forEach(deviceTypes, function(display){
                               switch(display.trim().toLowerCase()){
                                   case "mobile":
                                       if(!showElement){
                                           showElement = device.isMobile();
                                       }
                                       break;
                                   case "tablet":
                                       if(!showElement){
                                           showElement = device.isTablet();
                                       }
                                       break;
                                   case "desktop":
                                       if(!showElement){
                                           showElement = device.isDesktop();
                                       }
                                       break;
                               }
                            });

                            if (showElement) {
                                childScope = scope.$new();
                                childElement = transclude(childScope, function (clone) {
                                    element.after(clone);
                                });
                            }
                        });
                    }
                }};

            return device;
        }])


})();