(function ( angular ) {
    'use strict';

    angular
        .module('angular-responsive', [])
        .provider('responsiveHelper', ["$windowProvider", function ($windowProvider)
        {
            // Gather winWidth based in Twitter BootStrap http://getbootstrap.com/css/#grid-media-queries

            var $window  = $windowProvider.$get();
            // is better get first the innerWitdh that will not include a lateral panel
            // like the console inspector, bookmarks, etc
            var winWidth = $window.innerWidth || $window.outerWidth;
            var helper   = {

                //isSmartDevice : isSmartDevice( $window ),
                isXs: function () { return winWidth < 768; },
                isSm: function () { return winWidth >= 768 && winWidth < 992; },
                isMd: function () { return winWidth >= 992 && winWidth < 1200; },
                isLg: function () { return winWidth >= 1200; }

            };

            // Publish accessor function...

            this.$get = function() {
                return helper;
            };
        }])

        /**
         * Extra small devices Phones (<768px)
         */
        .directive('arXs', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arXs', responsiveHelper.isXs )
            };
        }])

        /**
         * Small devices Tablets (≥768px)
         */
        .directive('arSm', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arSm', responsiveHelper.isSm )
            };
        }])

        /**
         * Medium devices Desktops (≥992px)
         */
        .directive('arMd', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arMd', responsiveHelper.isMd )
            };
        }])

        /**
         * Large devices Desktops (≥1200px)
         */
        .directive('arLg', ['responsiveHelper', function (responsiveHelper)
        {
            return {
                restrict    : "EAC",
                transclude  : 'element',
                template    : '<div></div>',
                compile     : buildCompileFn( 'arLg', responsiveHelper.isLg )
            };
        }])

        /**
         * Does the with a match user-specified combination (0..4)
         */
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
        return function compile(element, attr, transclude)
        {
            return function postLink(scope, element, attr)
            {
                var childElement, childScope,
                    config  = scope.$eval( attr[responsiveType] ),
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

                // Fix memory leak an remove watcher when element/directive is released

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
            return  ( deviceTypes['xs']  && responsiveHelper.isXs()  ) ||
                ( deviceTypes['sm']  && responsiveHelper.isSm()  ) ||
                ( deviceTypes['md']  && responsiveHelper.isMd()  ) ||
                ( deviceTypes['lg'] && responsiveHelper.isLg() ) || false;
        };
    }

    /**
     * Scan to determine if current window is hosted within a `smart` device
     * @param $window
     * @returns {boolean}
     */
    /*
    function isSmartDevice( $window )
    {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];

        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }
    */

})( window.angular );
