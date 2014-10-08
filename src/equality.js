(function () {
    'use strict';

    angular.module('angularValidators')

        .directive('ivEquals', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    attrs.$observe('iv-equals', function() {
                        ngModel.$validate();
                    });

                    ngModel.$validators.equals = function(value)
                    {
                        return value === attrs.equals;
                    };
                }
            };
        })

        .directive('ivNotEquals', function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    attrs.$observe('iv-not-equals', function() {
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
