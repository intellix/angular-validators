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

                    attrs.$observe('ivEquals', function() {
                        ngModel.$validate();
                    });

                    ngModel.$validators.ivEquals = function(value)
                    {
                        return value === attrs.ivEquals;
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

                    attrs.$observe('ivNotEquals', function() {
                        ngModel.$validate();
                    });

                    ngModel.$validators.ivNotEquals = function(value)
                    {
                        return value !== attrs.ivNotEquals;
                    };
                }
            };
        });
        
}());
