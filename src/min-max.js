(function () {
    'use strict';

    function isEmpty(value) {
        return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    angular.module('angularValidators')

        .directive('ivMin', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    attrs.$observe('ivMin', function() {
                        ngModel.$validate();
                    });

                    ngModel.$validators.ivMin = function(value)
                    {
                        var min = scope.$eval(attrs.ivMin) || 0;
                        if (!isEmpty(value) && value < min) {
                            return false;
                        } else {
                            return true;
                        }
                    };
                }
            };
        })

        .directive('ivMax', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    attrs.$observe('ivMax', function() {
                        ngModel.$validate();
                    });

                    ngModel.$validators.ivMax = function(value)
                    {
                        var max = scope.$eval(attrs.ivMax) || Infinity;
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
