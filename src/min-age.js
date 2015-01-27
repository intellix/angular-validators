(function () {
    'use strict';

    angular.module('angularValidators').directive('ivMinAge', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel)
            {
                if (!ngModel) {
                    return;
                }

                var todayDate = new Date();

                function getAge(date)
                {
                    var day = date.getDate();
                    var month = date.getMonth();
                    var year = date.getUTCFullYear();
                    var todayYear = todayDate.getFullYear();
                    var todayMonth = todayDate.getMonth();
                    var todayDay = todayDate.getDate();
                    var age = todayYear - year;

                    if (todayMonth < month) {
                        age--;
                    }

                    if (month === todayMonth && todayDay < day) {
                        age--;
                    }

                    return age;
                }

                ngModel.$validators.tooYoung = function (value)
                {
                    if (!value) {
                        return;
                    }
                    var date = new Date(value);
                    return getAge(date) >= scope.$eval(attrs.ivMinAge);
                };

                attrs.$observe('ivMinAge', function () {
                    ngModel.$validate();
                });
            }
        };
    });

}());
