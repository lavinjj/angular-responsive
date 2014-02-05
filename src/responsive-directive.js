(function () {
    'use strict';

    angular.module('angular-responsive', [])
        // localization service responsible for retrieving resource files from the server and
        // managing the translation dictionary
        .factory('responsiveHelper', ['$window', function ($window) {
            var helper = {

                isSmartDevice: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                },

                isMobile: function () {
                    var width = $window.outerWidth;

                    var smartDevice = helper.isSmartDevice();

                    return smartDevice && width <= 767;
                },

                isTablet: function () {
                    var width = $window.outerWidth;

                    var smartDevice = helper.isSmartDevice();

                    return smartDevice && width >= 768;
                },

                isDesktop: function () {
                    return !helper.isSmartDevice();
                }
            }
            // return the local instance when called
            return helper;
        } ])

        .directive('arMobile', ['responsiveHelper', function (responsiveHelper) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                compile: function (element, attr, transclude) {
                    return function postLink(scope, element, attr) {
                        var childElement, childScope;
                        scope.$watch(attr['arMobile'], function (newValue) {
                            if (childElement) {
                                childElement.remove();
                                childScope.$destroy();
                                childElement = undefined;
                                childScope = undefined;
                            }
                            if (responsiveHelper.isMobile()) {
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

        .directive('arTablet', ['responsiveHelper', function (responsiveHelper) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                compile: function (element, attr, transclude) {
                    return function postLink(scope, element, attr) {
                        var childElement, childScope;
                        scope.$watch(attr['arTablet'], function (newValue) {
                            if (childElement) {
                                childElement.remove();
                                childScope.$destroy();
                                childElement = undefined;
                                childScope = undefined;
                            }
                            if (responsiveHelper.isTablet()) {
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

        .directive('arDesktop', ['responsiveHelper', function (responsiveHelper) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                compile: function (element, attr, transclude) {
                    return function postLink(scope, element, attr) {
                        var childElement, childScope;
                        scope.$watch(attr['arDesktop'], function (newValue) {
                            if (childElement) {
                                childElement.remove();
                                childScope.$destroy();
                                childElement = undefined;
                                childScope = undefined;
                            }
                            if (responsiveHelper.isDesktop()) {
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

        .directive('arResponsive', ['responsiveHelper', function (responsiveHelper) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                compile: function (element, attr, transclude) {
                    return function postLink(scope, element, attr) {
                        var deviceTypes = scope.$eval(attr['arResponsive']);
                        var childElement, childScope;

                        scope.$watch(deviceTypes, function (newValue) {
                                if (childElement) {
                                    childElement.remove();
                                    childScope.$destroy();
                                    childElement = undefined;
                                    childScope = undefined;
                                }

                                var showElement = false;

                                if (!showElement && deviceTypes.Mobile) {
                                    showElement = responsiveHelper.isMobile();
                                }
                                if (!showElement && deviceTypes.Tablet) {
                                    showElement = responsiveHelper.isTablet();
                                }
                                if (!showElement && deviceTypes.Desktop) {
                                    showElement = responsiveHelper.isDesktop();
                                }

                                if (showElement) {
                                    childScope = scope.$new();
                                    childElement = transclude(childScope, function (clone) {
                                        element.after(clone);
                                    });
                                }
                            }
                        );
                    }
                }
            };

            return device;
        }
        ])

})();