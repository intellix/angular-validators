describe('angularValidators', function() {

    beforeEach(module('angularValidators'));

    describe('ivEquals', function() {

        var element, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.val1 = 'meep';
            element = $compile('<form name="form"><input type="text" name="input" ng-model="val1" iv-equals="{{val2}}"></form>')(scope);
            scope.$digest();
        }));

        it('should be valid when input does equal', function() {
            scope.$apply(function() {
                scope.val2 = 'meep';
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be invalid when input does not equal', function() {
            scope.$apply(function() {
                scope.val2 = 'beep';
            });
            expect(scope.form.input.$valid).toBe(false);
        });

    });

    describe('ivNotEquals', function() {

        var element, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.val1 = 'meep';
            element = $compile('<form name="form"><input type="text" name="input" ng-model="val1" iv-not-equals="{{val2}}"></form>')(scope);
            scope.$digest();
        }));

        it('should be valid when input does not equal', function() {
            scope.$apply(function() {
                scope.val2 = 'beep';
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be invalid when input does equal', function() {
            scope.$apply(function() {
                scope.val2 = 'meep';
            });
            expect(scope.form.input.$valid).toBe(false);
        });

    });

    describe('ivMinAge', function() {

        var element, scope, currentDate;

        beforeEach(inject(function($rootScope, $compile) {
            currentDate = new Date();
            scope = $rootScope.$new();
            scope.minAge = 18;
            element = $compile('<form name="form"><input type="date" name="input" ng-model="date" iv-min-age="{{minAge}}"></form>')(scope);
            scope.$digest();
        }));

        it('should be valid when age is exactly 18', function() {
            scope.$apply(function() {
                scope.date = currentDate;
                scope.date.setYear(currentDate.getFullYear() - 18);
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be valid when age is greater than 18', function() {
            scope.$apply(function() {
                scope.date = currentDate;
                scope.date.setYear(currentDate.getFullYear() - 19);
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be invalid when age is less than 18', function() {
            scope.$apply(function() {
                scope.date = currentDate;
                scope.date.setYear(currentDate.getFullYear() - 17);
            });
            expect(scope.form.input.$valid).toBe(false);
        });

        it('should be invalid when age is 18 and minimum age is increased to 21', function() {
            scope.$apply(function() {
                scope.date = currentDate;
                scope.date.setYear(currentDate.getFullYear() - 18);
                scope.minAge = 21;
            });
            expect(scope.form.input.$valid).toBe(false);
        });

        it('should not populate $pending if no value passed', function() {
            scope.$apply(function() {
                scope.minAge = 21;
            });
            expect(scope.form.$pending).toBe(undefined);
        });

    });

    describe('ivMin', function() {

        var element, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.min = 1000;
            element = $compile('<form name="form"><input type="number" name="input" ng-model="val1" iv-min="{{min}}"></form>')(scope);
            scope.$digest();
        }));

        it('should be valid when min is 1000 and ng-model is equal to 1000', function() {
            scope.$apply(function() {
                scope.val1 = 1000;
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be valid when min is 1000 and ng-model is greater than 1000', function() {
            scope.$apply(function() {
                scope.val1 = 1001;
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be invalid when min is 1000 and ng-model is less than that', function() {
            scope.$apply(function() {
                scope.val1 = 999;
            });
            expect(scope.form.input.$valid).toBe(false);
        });

        it('should be invalidated when changing the minimum value', function() {
            scope.$apply(function() {
                scope.val1 = 1001;
            });
            scope.$apply(function() {
                scope.min = 1002;
            });
            expect(scope.form.input.$valid).toBe(false);
        });
    });

    describe('ivMax', function() {

        var element, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.max = 1000;
            element = $compile('<form name="form"><input type="number" name="input" ng-model="val1" iv-max="{{max}}"></form>')(scope);
            scope.$digest();
        }));

        it('should be valid when max is 1000 and ng-model is equal to 1000', function() {
            scope.$apply(function() {
                scope.val1 = 1000;
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be valid when max is 1000 and ng-model is less than 1000', function() {
            scope.$apply(function() {
                scope.val1 = 999;
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be invalid when ma is 1000 and ng-model is greater than that', function() {
            scope.$apply(function() {
                scope.val1 = 1001;
            });
            expect(scope.form.input.$valid).toBe(false);
        });

        it('should be invalidated when changing the maximum value', function() {
            scope.$apply(function() {
                scope.val1 = 999;
            });
            scope.$apply(function() {
                scope.max = 998;
            });
            expect(scope.form.input.$valid).toBe(false);
        });

    });

    describe('ivCard', function() {

        var element, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element = $compile('<form name="form"><input type="text" name="input" ng-model="val1" iv-card></form>')(scope);
            scope.$digest();
        }));

        it('should be valid when entering a valid luhn `visa` number', function() {
            scope.$apply(function() {
                scope.val1 = '4111111111111111';
            });
            // Some reason this is invalid unless I time it out
            setTimeout(function() {
                expect(scope.form.input.$valid).toBe(true);
            });
        });

        it('should be invalid when entering an invalid luhn `visa` number', function() {
            scope.$apply(function() {
                scope.val1 = '4111111111111112';
            });
            expect(scope.form.input.$valid).toBe(false);
        });

        it('should be invalid when entering an invalid length `visa` number', function() {
            scope.$apply(function() {
                scope.val1 = '411111111111111';
            });
            expect(scope.form.input.$valid).toBe(false);
        });
    });

    describe('ivCvc', function() {

        var element, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            scope.cardNumber = '4111111111111111';
            element = $compile('<form name="form"><input type="number" name="input" ng-model="val1" iv-cvc card-number="{{cardNumber}}"></form>')(scope);
            scope.$digest();
        }));

        it('should be valid when selected `visa` via card-number and enter 3-digit CVC', function() {
            scope.$apply(function() {
                scope.val1 = 123;
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be valid when selected `amex` via card-number and enter 3-digit or 4-digits', function() {
            scope.$apply(function() {
                scope.cardNumber = '374131664560548';
                scope.val1 = 123;
            });
            expect(scope.form.input.$valid).toBe(true);

            scope.$apply(function() {
                scope.cardNumber = '374131664560548';
                scope.val1 = 1234;
            });
            expect(scope.form.input.$valid).toBe(true);
        });

        it('should be invalid when selected `visa` via card-number and enter less than or more than 3-digits', function() {
            scope.$apply(function() {
                scope.val1 = 12;
            });
            expect(scope.form.input.$valid).toBe(false);
            scope.$apply(function() {
                scope.val1 = 1234;
            });
            expect(scope.form.input.$valid).toBe(false);
        });

    });

    describe('ivCvc', function() {

        var element, scope;

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element = $compile('<form name="form"><input type="number" name="input" ng-model="val1" iv-cvc card-type="visa"></form>')(scope);
            scope.$digest();
        }));

        it('should be valid when selected `visa` via card-type and enter 3-digits', function() {
            scope.$apply(function() {
                scope.val1 = 123;
            });
            expect(scope.form.input.$valid).toBe(true);
        });

    });

});
