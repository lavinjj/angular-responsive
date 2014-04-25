(function () {
    'use strict';

    angular
        .module('angular-responsive', [])
        .provider('responsiveHelper', ["$windowProvider", function ($windowProvider)
        {
            var $window = $windowProvider.$get();

            var helper = {

                isSmartDevice: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                },

                isMobile: function () {
                    var width = $window['outerWidth'];

                    var smartDevice = helper.isSmartDevice();

                    return smartDevice && width <= 767;
                },

                isTablet: function () {
                    var width = $window['outerWidth'];

                    var smartDevice = helper.isSmartDevice();

                    return smartDevice && width >= 768;
                },

                isDesktop: function () {
                    return !helper.isSmartDevice();
                }
            };

            this.$get = function() {
                return helper;
            };
        }])

        .directive('arMobile', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arMobile', responsiveHelper.isMobile )
            };
        }])
        .directive('arTablet', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arTablet', responsiveHelper.isTablet )
            };
        }])
        .directive('arDesktop', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arDesktop', responsiveHelper.isDesktop )
            };
        }])
        .directive('arResponsive', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arResponsive', checkAllTypes(responsiveHelper) )
            };
        }]);

    /**
     * Partial application for DRY construction of a directive compile function
     */
    function buildCompileFn(responsiveType, verifyFn )
    {
        return function (element, attr, transclude)
        {
            return function postLink(scope, element, attr)
            {
                var childElement, childScope,
                    config  = scope.$eval( attr[responsiveType]),
                    unwatch = scope.$watch( config, function ()
                    {
                        // attribute changed, delete existing element & $scope

                        if (childElement) {
                            childElement.remove();
                            childScope.$destroy();
                            childElement = undefined;
                            childScope = undefined;
                        }

                        if ( verifyFn(config) )
                        {
                            // Create a new element and $scope...

                            childScope = scope.$new();
                            childElement = transclude(childScope, function (clone) {
                                element.after(clone);
                            });
                        }
                    });

                    scope.$on( "$destroy", unwatch );
            };
        };
    }

    /**
     * Partial application for DRY construction of function to scan of any valid responsive types
     */
    function checkAllTypes(responsiveHelper)
    {
        return function( deviceTypes )
        {
            return  ( deviceTypes['Mobile']  && responsiveHelper.isMobile()  ) ||
                    ( deviceTypes['Tablet']  && responsiveHelper.isTablet()  ) ||
                    ( deviceTypes['Desktop'] && responsiveHelper.isDesktop() ) || false;
        };
    }

})();
