(function () {
    'use strict';

    angular.module('angularValidators')

        .directive('equals', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    attrs.$observe('equals', function() {
                        ngModel.$validate();
                    });

                    ngModel.$validators.equals = function(value)
                    {
                        return value === attrs.equals;
                    };
                }
            };
        })

        .directive('notEquals', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    attrs.$observe('notEquals', function() {
                        ngModel.$validate();
                    });

                    ngModel.$validators.notEquals = function(value)
                    {
                        return value !== attrs.notEquals;
                    };
                }
            };
        });
        
}());
