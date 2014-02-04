(function () {
    'use strict';

    angular.module('angular-responsive', [])

        .directive('arDevice', ['$window', '$animate', function ($window, $animate) {
            var device = {
                restrict: "EAC",
                transclude: 'element',
                template: '<div></div>',
                isMobile: function () {
                    // Adapted from http://www.detectmobilebrowsers.com
                    var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;

                    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                },
                link: function ($scope, $element, $attr, ctrl, $transclude) {
                    var block, childScope = null;
                    var showElement = false;
                    if(device.isMobile() && $attr.arDevice === "Mobile"){
                        showElement = true;
                    }
                    if(!device.isMobile() && $attr.arDevice === "Desktop") {
                        showElement = true;
                    }

                    if (showElement) {
                        if (!childScope) {
                            childScope = $scope.$new();
                            $transclude(childScope, function (clone) {
                                clone[clone.length++] = document.createComment(' end arDevice: ' + $attr.arDevice + ' ');
                                // Note: We only need the first/last node of the cloned nodes.
                                // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                                // by a directive with templateUrl when it's template arrives.
                                block = {
                                    clone: clone
                                };
                                $animate.enter(clone, $element.parent(), $element);
                            });
                        }
                    } else {

                        if (childScope) {
                            childScope.$destroy();
                            childScope = null;
                        }

                        if (block) {
                            $animate.leave(angular.getBlockElements(block.clone));
                            block = null;
                        }
                    }
                }

            };

            return device;
        }]);

})();