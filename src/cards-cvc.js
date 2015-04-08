(function () {
    'use strict';

    angular.module('angularValidators')

        .factory('Cards', function() {

            var defaultFormat = /(\d{1,4})/g;
            var defaultInputFormat = /(?:^|\s)(\d{4})$/;

            var cards = [{
                type: 'maestro',
                pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
                format: defaultFormat,
                inputFormat: defaultInputFormat,
                lengths: [12, 13, 14, 15, 16, 17, 18, 19],
                cvcLengths: [3],
                luhn: true
            }, {
                type: 'dinersclub',
                pattern: /^(36|38|30[0-5])/,
                format: defaultFormat,
                inputFormat: defaultInputFormat,
                lengths: [14],
                cvcLengths: [3],
                luhn: true
            }, {
                type: 'laser',
                pattern: /^(6706|6771|6709)/,
                format: defaultFormat,
                inputFormat: defaultInputFormat,
                lengths: [16, 17, 18, 19],
                cvcLengths: [3],
                luhn: true
            }, {
                type: 'jcb',
                pattern: /^35/,
                format: defaultFormat,
                inputFormat: defaultInputFormat,
                lengths: [16],
                cvcLengths: [3],
                luhn: true
            }, {
                type: 'unionpay',
                pattern: /^62/,
                format: defaultFormat,
                inputFormat: defaultInputFormat,
                lengths: [16, 17, 18, 19],
                cvcLengths: [3],
                luhn: false
            }, {
                type: 'discover',
                pattern: /^(6011|65|64[4-9]|622)/,
                format: defaultFormat,
                inputFormat: defaultInputFormat,
                lengths: [16],
                cvcLengths: [3],
                luhn: true
            }, {
                type: 'mastercard',
                pattern: /^5[1-5]/,
                format: defaultFormat,
                inputFormat: defaultInputFormat,
                lengths: [16],
                cvcLengths: [3],
                luhn: true
            }, {
                type: 'amex',
                pattern: /^3[47]/,
                format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
                inputFormat: /^(\d{4}|\d{4}\s\d{6})$/,
                lengths: [15],
                cvcLengths: [3, 4],
                luhn: true
            }, {
                type: 'visa',
                pattern: /^4/,
                format: defaultFormat,
                inputFormat: defaultInputFormat,
                lengths: [13, 14, 15, 16],
                cvcLengths: [3],
                luhn: true
            }];

            return {
                getDefaultFormat: function() {
                    return defaultFormat;
                },
                getDefaultInputFormat: function() {
                    return defaultInputFormat;
                },
                fromNumber: function(number) {
                    var returnedCard;
                    angular.forEach(cards, function(card) {
                        if (card.pattern.test(number)) {
                            returnedCard = card;
                            return false;
                        }
                    });
                    return returnedCard;
                },
                fromType: function(val) {
                    var returnedCard;
                    angular.forEach(cards, function(card) {
                        if (card.type === val) {
                            returnedCard = card;
                            return false;
                        }
                    });
                    return returnedCard;
                }
            };
        })

        .directive('ivCard', function(Cards) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    function luhnValid(number)
                    {
                        var odd = true;
                        var sum = 0;
                        var digits = (number + '').split('').reverse();
                        var i, len;

                        for (i = 0, len = digits.length; i < len; i++) {

                            var digit = digits[i];
                            digit = parseInt(digit, 10);
                            if ((odd = !odd)) {
                                digit *= 2;
                            }
                            if (digit > 9) {
                                digit -= 9;
                            }
                            sum += digit;

                        }

                        return sum % 10 === 0;
                    }

                    ngModel.$validators.card = function(value)
                    {
                        var card = Cards.fromNumber(value);
                        return (typeof card !== 'undefined' && card.lengths.indexOf(value.toString().length) !== -1 && (card.luhn === false || luhnValid(value)));
                    };
                }
            };
        })

        .directive('ivCvc', function(Cards) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel)
                {
                    if (!ngModel) {
                        return;
                    }

                    attrs.$observe('cardType', function() {
                        ngModel.$validate();
                    });

                    attrs.$observe('cardNumber', function() {
                        ngModel.$validate();
                    });

                    ngModel.$validators.cvc = function(value)
                    {
                        var valid = false;
                        var card;

                        if (!value) {
                            return false;
                        }

                        if (attrs.cardNumber) {
                            card = Cards.fromNumber(attrs.cardNumber);
                        } else if (attrs.cardType) {
                            card = Cards.fromType(attrs.cardType);
                        }

                        if (typeof card !== 'undefined' && card.cvcLengths.indexOf(value.toString().length) !== -1) {
                            valid = true;
                        }

                        return valid;
                    };
                }
            };
        });

}());
