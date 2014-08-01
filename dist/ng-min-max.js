(function () {
    'use strict';

    function isEmpty(value) {
        return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    angular.module('angularValidators')

        .directive('ngMin', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    ngModel.$validators.ngMin = function(value)
                    {
                        var min = scope.$eval(attrs.ngMin) || 0;
                        if (!isEmpty(value) && value < min) {
                            return false;
                        } else {
                            return true;
                        }
                    };
                }
            };
        })

        .directive('ngMax', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    ngModel.$validators.ngMax = function(value)
                    {
                        var max = scope.$eval(attrs.ngMax) || Infinity;
                        if (!isEmpty(value) && value > max) {
                            return false;
                        } else {
                            return true;
                        }
                    };
                }
            };
        });

}());
