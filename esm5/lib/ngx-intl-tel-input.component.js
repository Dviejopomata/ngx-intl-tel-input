/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryCode } from './data/country-code';
import { phoneNumberValidator } from './ngx-intl-tel-input.validator';
import examples from 'libphonenumber-js/examples.mobile.json';
import { parse, format, getExampleNumber } from 'libphonenumber-js';
var ɵ0 = phoneNumberValidator;
var NgxIntlTelInputComponent = /** @class */ (function () {
    function NgxIntlTelInputComponent(countryCodeData) {
        this.countryCodeData = countryCodeData;
        this.value = '';
        this.preferredCountries = [];
        this.enablePlaceholder = true;
        this.cssClass = 'form-control';
        this.onlyCountries = [];
        this.enableAutoCountrySelect = false;
        this.phoneNumber = '';
        this.allCountries = [];
        this.preferredCountriesInDropDown = [];
        this.disabled = false;
        this.errors = ['Phone number is required.'];
        this.onTouched = function () { };
        this.propagateChange = function (_) { };
        this.fetchCountryData();
    }
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.preferredCountries.length) {
            this.preferredCountries.forEach(function (iso2) {
                /** @type {?} */
                var preferredCountry = _this.allCountries.filter(function (c) {
                    return c.iso2 === iso2;
                });
                _this.preferredCountriesInDropDown.push(preferredCountry[0]);
            });
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter(function (c) { return _this.onlyCountries.includes(c.iso2); });
        }
        if (this.preferredCountriesInDropDown.length) {
            this.selectedCountry = this.preferredCountriesInDropDown[0];
        }
        else {
            this.selectedCountry = this.allCountries[0];
        }
    };
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onPhoneNumberChange = /**
     * @return {?}
     */
    function () {
        this.value = this.phoneNumber;
        /** @type {?} */
        var number;
        try {
            number = parse(this.phoneNumber, this.selectedCountry.iso2);
        }
        catch (e) {
        }
        /** @type {?} */
        var countryCode = this.selectedCountry.iso2;
        // auto select country based on the extension (e.g select spain if number starts with +34)
        if (this.enableAutoCountrySelect) {
            countryCode = number && number.country
                ? number.country
                : this.selectedCountry.iso2;
            if (countryCode !== this.selectedCountry.iso2) {
                /** @type {?} */
                var newCountry = this.allCountries.find(function (c) { return c.iso2 === countryCode; });
                if (newCountry) {
                    this.selectedCountry = newCountry;
                }
            }
        }
        countryCode = countryCode ? countryCode : this.selectedCountry.iso2;
        /** @type {?} */
        var internationalNumber = number ? format(number, 'INTERNATIONAL') : '';
        /** @type {?} */
        var nationalNumber = number ? format(number, 'NATIONAL') : '';
        this.propagateChange({
            number: this.value,
            internationalNumber: internationalNumber,
            nationalNumber: nationalNumber,
            countryCode: countryCode.toUpperCase()
        });
    };
    /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onCountrySelect = /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    function (country, el) {
        this.selectedCountry = country;
        if (this.phoneNumber.length > 0) {
            this.value = this.phoneNumber;
            /** @type {?} */
            var number = void 0;
            try {
                number = parse(this.phoneNumber, this.selectedCountry.iso2);
            }
            catch (e) {
            }
            /** @type {?} */
            var internationalNumber = number ? format(number, 'INTERNATIONAL') : '';
            /** @type {?} */
            var nationalNumber = number ? format(number, 'NATIONAL') : '';
            this.propagateChange({
                number: this.value,
                internationalNumber: internationalNumber,
                nationalNumber: nationalNumber,
                countryCode: this.selectedCountry.iso2.toUpperCase()
            });
        }
        el.focus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onInputKeyPress = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var pattern = /[0-9\+\-\ ]/;
        /** @type {?} */
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    /**
     * @protected
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.fetchCountryData = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        this.countryCodeData.allCountries.forEach(function (c) {
            /** @type {?} */
            var country = {
                name: c[0].toString(),
                iso2: ((/** @type {?} */ (c[1].toString().toUpperCase()))),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCode: +c[4] || undefined,
                flagClass: c[1].toString().toLocaleLowerCase(),
                placeHolder: ''
            };
            if (_this.enablePlaceholder) {
                country.placeHolder = _this.getPhoneNumberPlaceHolder(country.iso2);
            }
            _this.allCountries.push(country);
        });
    };
    /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getPhoneNumberPlaceHolder = /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    function (countryCode) {
        try {
            /** @type {?} */
            var example = getExampleNumber(countryCode, (/** @type {?} */ (examples)));
            return format(example.number, countryCode, 'INTERNATIONAL');
        }
        catch (e) {
            console.log('CountryCode: "' + countryCode + '" ' + e);
            return e;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        var _this = this;
        if (obj) {
            this.phoneNumber = obj;
            setTimeout(function () {
                _this.onPhoneNumberChange();
            }, 1);
        }
    };
    NgxIntlTelInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-intl-tel-input',
                    template: "<div class=\"intl-tel-input allow-dropdown\">\n  <div class=\"flag-container\" dropdown [ngClass]=\"{'disabled': disabled}\">\n    <div class=\"selected-flag dropdown-toggle\" dropdownToggle>\n      <div class=\"iti-flag\" [ngClass]=\"selectedCountry.flagClass\"></div>\n      <div class=\"iti-arrow\"></div>\n    </div>\n    <ul class=\"country-list dropdown-menu\" *dropdownMenu>\n      <li class=\"country\" *ngFor=\"let country of preferredCountriesInDropDown\" (click)=\"onCountrySelect(country, focusable)\">\n        <div class=\"flag-box\">\n          <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\n        </div>\n        <span class=\"country-name\">{{country.name}}</span>\n        <span class=\"dial-code\">+{{country.dialCode}}</span>\n      </li>\n      <li class=\"divider\" *ngIf=\"preferredCountriesInDropDown?.length\"></li>\n      <li class=\"country\" *ngFor=\"let country of allCountries\" (click)=\"onCountrySelect(country, focusable)\">\n        <div class=\"flag-box\">\n          <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\n        </div>\n        <span class=\"country-name\">{{country.name}}</span>\n        <span class=\"dial-code\">+{{country.dialCode}}</span>\n      </li>\n    </ul>\n  </div>\n  <input type=\"tel\" id=\"phone\" autocomplete=\"off\"\n        [ngClass]=\"cssClass\"\n        (blur)=\"onTouched()\"\n        (keypress)=\"onInputKeyPress($event)\"\n        [(ngModel)]=\"phoneNumber\"\n        (ngModelChange)=\"onPhoneNumberChange()\"\n        [disabled]=\"disabled\"\n        [placeholder]=\"selectedCountry.placeHolder\" #focusable>\n</div>\n",
                    providers: [
                        CountryCode,
                        {
                            provide: NG_VALUE_ACCESSOR,
                            // tslint:disable-next-line:no-forward-ref
                            useExisting: forwardRef(function () { return NgxIntlTelInputComponent; }),
                            multi: true
                        },
                        {
                            provide: NG_VALIDATORS,
                            useValue: ɵ0,
                            multi: true,
                        }
                    ],
                    styles: ["li.country:hover{background-color:rgba(0,0,0,.05)}.selected-flag.dropdown-toggle:after{content:none}.flag-container.disabled{cursor:default!important}.intl-tel-input.allow-dropdown .flag-container.disabled:hover .selected-flag{background:0 0}"]
                }] }
    ];
    /** @nocollapse */
    NgxIntlTelInputComponent.ctorParameters = function () { return [
        { type: CountryCode }
    ]; };
    NgxIntlTelInputComponent.propDecorators = {
        value: [{ type: Input }],
        preferredCountries: [{ type: Input }],
        enablePlaceholder: [{ type: Input }],
        cssClass: [{ type: Input }],
        onlyCountries: [{ type: Input }],
        enableAutoCountrySelect: [{ type: Input }]
    };
    return NgxIntlTelInputComponent;
}());
export { NgxIntlTelInputComponent };
if (false) {
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.value;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.preferredCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.enablePlaceholder;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.cssClass;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.onlyCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.enableAutoCountrySelect;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.phoneNumber;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.allCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.preferredCountriesInDropDown;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.selectedCountry;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.disabled;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.errors;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.onTouched;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    NgxIntlTelInputComponent.prototype.countryCodeData;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUF3QixhQUFhLEVBQUUsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFdEUsT0FBTyxRQUFRLE1BQU0sd0NBQXdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWlELGdCQUFnQixFQUFjLE1BQU0sbUJBQW1CLENBQUM7U0FlbEgsb0JBQW9CO0FBZGpDO0lBdUNDLGtDQUNTLGVBQTRCO1FBQTVCLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBbkI1QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsdUJBQWtCLEdBQWtCLEVBQUUsQ0FBQztRQUN2QyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsYUFBUSxHQUFHLGNBQWMsQ0FBQztRQUN6QixrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDbEMsNEJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBRTFDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGlCQUFZLEdBQW1CLEVBQUUsQ0FBQztRQUNsQyxpQ0FBNEIsR0FBbUIsRUFBRSxDQUFDO1FBRWxELGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsV0FBTSxHQUFlLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUduRCxjQUFTLEdBQUcsY0FBUSxDQUFDLENBQUM7UUFDdEIsb0JBQWUsR0FBRyxV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O3lCQUNYO3FCQUNEOztpQkFDRDs7OztnQkF2QlEsV0FBVzs7O3dCQTBCbEIsS0FBSztxQ0FDTCxLQUFLO29DQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FDSixLQUFLOzBDQUNMLEtBQUs7O0lBMEpSLCtCQUFDO0NBQUEsQUFwTEQsSUFvTEM7U0FqS1ksd0JBQXdCOzs7SUFFcEMseUNBQW9COztJQUNwQixzREFBZ0Q7O0lBQ2hELHFEQUFrQzs7SUFDbEMsNENBQW1DOztJQUNsQyxpREFBMkM7O0lBQzNDLDJEQUF5Qzs7SUFFMUMsK0NBQWlCOztJQUNqQixnREFBa0M7O0lBQ2xDLGdFQUFrRDs7SUFDbEQsbURBQXlCOztJQUN6Qiw0Q0FBaUI7O0lBQ2pCLDBDQUFtRDs7SUFHbkQsNkNBQXNCOztJQUN0QixtREFBa0M7Ozs7O0lBR2pDLG1EQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvdW50cnlDb2RlIH0gZnJvbSAnLi9kYXRhL2NvdW50cnktY29kZSc7XG5pbXBvcnQgeyBwaG9uZU51bWJlclZhbGlkYXRvciB9IGZyb20gJy4vbmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb3VudHJ5IH0gZnJvbSAnLi9tb2RlbC9jb3VudHJ5Lm1vZGVsJztcbmltcG9ydCBleGFtcGxlcyBmcm9tICdsaWJwaG9uZW51bWJlci1qcy9leGFtcGxlcy5tb2JpbGUuanNvbic7XG5pbXBvcnQgeyBwYXJzZSwgZm9ybWF0LCBQYXJzZWROdW1iZXIsIENvdW50cnlDb2RlIGFzIFBob25lQ291bnRyeUNvZGUsIGdldEV4YW1wbGVOdW1iZXIsIFBob25lTnVtYmVyfSBmcm9tICdsaWJwaG9uZW51bWJlci1qcyc7XG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICduZ3gtaW50bC10ZWwtaW5wdXQnLFxuXHR0ZW1wbGF0ZVVybDogJy4vbmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vbmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5jc3MnXSxcblx0cHJvdmlkZXJzOiBbXG5cdFx0Q291bnRyeUNvZGUsXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yd2FyZC1yZWZcblx0XHRcdHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEludGxUZWxJbnB1dENvbXBvbmVudCksXG5cdFx0XHRtdWx0aTogdHJ1ZVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0cHJvdmlkZTogTkdfVkFMSURBVE9SUyxcblx0XHRcdHVzZVZhbHVlOiBwaG9uZU51bWJlclZhbGlkYXRvcixcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdH1cblx0XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdEBJbnB1dCgpIHZhbHVlID0gJyc7XG5cdEBJbnB1dCgpIHByZWZlcnJlZENvdW50cmllczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXHRASW5wdXQoKSBlbmFibGVQbGFjZWhvbGRlciA9IHRydWU7XG5cdEBJbnB1dCgpIGNzc0NsYXNzID0gJ2Zvcm0tY29udHJvbCc7XG4gIEBJbnB1dCgpIG9ubHlDb3VudHJpZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgQElucHV0KCkgZW5hYmxlQXV0b0NvdW50cnlTZWxlY3QgPSBmYWxzZTtcblxuXHRwaG9uZU51bWJlciA9ICcnO1xuXHRhbGxDb3VudHJpZXM6IEFycmF5PENvdW50cnk+ID0gW107XG5cdHByZWZlcnJlZENvdW50cmllc0luRHJvcERvd246IEFycmF5PENvdW50cnk+ID0gW107XG5cdHNlbGVjdGVkQ291bnRyeTogQ291bnRyeTtcblx0ZGlzYWJsZWQgPSBmYWxzZTtcblx0ZXJyb3JzOiBBcnJheTxhbnk+ID0gWydQaG9uZSBudW1iZXIgaXMgcmVxdWlyZWQuJ107XG5cblxuXHRvblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cdHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGNvdW50cnlDb2RlRGF0YTogQ291bnRyeUNvZGVcblx0KSB7XG5cdFx0dGhpcy5mZXRjaENvdW50cnlEYXRhKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXMubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLnByZWZlcnJlZENvdW50cmllcy5mb3JFYWNoKGlzbzIgPT4ge1xuXHRcdFx0XHRjb25zdCBwcmVmZXJyZWRDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKChjKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIGMuaXNvMiA9PT0gaXNvMjtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duLnB1c2gocHJlZmVycmVkQ291bnRyeVswXSk7XG5cdFx0XHR9KTtcblx0XHR9XG4gICAgaWYgKHRoaXMub25seUNvdW50cmllcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYWxsQ291bnRyaWVzID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKGMgPT4gdGhpcy5vbmx5Q291bnRyaWVzLmluY2x1ZGVzKGMuaXNvMikpO1xuICAgIH1cblx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSB0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd25bMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXNbMF07XG4gICAgfVxuXHR9XG5cblx0cHVibGljIG9uUGhvbmVOdW1iZXJDaGFuZ2UoKTogdm9pZCB7XG5cdFx0dGhpcy52YWx1ZSA9IHRoaXMucGhvbmVOdW1iZXI7XG5cblx0XHRsZXQgbnVtYmVyOiBQYXJzZWROdW1iZXI7XG5cdFx0dHJ5IHtcbiAgICAgIG51bWJlciA9IHBhcnNlKHRoaXMucGhvbmVOdW1iZXIsIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcbiAgICB9XG5cbiAgICBsZXQgY291bnRyeUNvZGUgPSB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xuICAgIC8vIGF1dG8gc2VsZWN0IGNvdW50cnkgYmFzZWQgb24gdGhlIGV4dGVuc2lvbiAoZS5nIHNlbGVjdCBzcGFpbiBpZiBudW1iZXIgc3RhcnRzIHdpdGggKzM0KVxuICAgIGlmICh0aGlzLmVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0KSB7XG4gICAgICBjb3VudHJ5Q29kZSA9IG51bWJlciAmJiBudW1iZXIuY291bnRyeVxuICAgICAgICA/IG51bWJlci5jb3VudHJ5XG4gICAgICAgIDogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcbiAgICAgIGlmIChjb3VudHJ5Q29kZSAhPT0gdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMikge1xuICAgICAgICBjb25zdCBuZXdDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmluZChjID0+IGMuaXNvMiA9PT0gY291bnRyeUNvZGUpO1xuICAgICAgICBpZiAobmV3Q291bnRyeSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gbmV3Q291bnRyeTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb3VudHJ5Q29kZSA9IGNvdW50cnlDb2RlID8gY291bnRyeUNvZGUgOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xuICAgIGNvbnN0IGludGVybmF0aW9uYWxOdW1iZXIgPSBudW1iZXIgPyBmb3JtYXQobnVtYmVyLCAnSU5URVJOQVRJT05BTCcpIDogJyc7XG4gICAgY29uc3QgbmF0aW9uYWxOdW1iZXIgPSBudW1iZXIgPyBmb3JtYXQobnVtYmVyLCAnTkFUSU9OQUwnKSA6ICcnO1xuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHtcblx0XHRcdG51bWJlcjogdGhpcy52YWx1ZSxcblx0XHRcdGludGVybmF0aW9uYWxOdW1iZXIsXG5cdFx0XHRuYXRpb25hbE51bWJlcixcbiAgICAgIGNvdW50cnlDb2RlOiBjb3VudHJ5Q29kZS50b1VwcGVyQ2FzZSgpXG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgb25Db3VudHJ5U2VsZWN0KGNvdW50cnk6IENvdW50cnksIGVsKTogdm9pZCB7XG5cdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSBjb3VudHJ5O1xuXG5cdFx0aWYgKHRoaXMucGhvbmVOdW1iZXIubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy52YWx1ZSA9IHRoaXMucGhvbmVOdW1iZXI7XG5cblx0XHRcdGxldCBudW1iZXI6IFBhcnNlZE51bWJlcjtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdG51bWJlciA9IHBhcnNlKHRoaXMucGhvbmVOdW1iZXIsIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0fVxuICAgICAgY29uc3QgaW50ZXJuYXRpb25hbE51bWJlciA9IG51bWJlciA/IGZvcm1hdChudW1iZXIsICdJTlRFUk5BVElPTkFMJykgOiAnJztcbiAgICAgIGNvbnN0IG5hdGlvbmFsTnVtYmVyID0gbnVtYmVyID8gZm9ybWF0KG51bWJlciwgJ05BVElPTkFMJykgOiAnJztcblx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHtcblx0XHRcdFx0bnVtYmVyOiB0aGlzLnZhbHVlLFxuXHRcdFx0XHRpbnRlcm5hdGlvbmFsTnVtYmVyLFxuXHRcdFx0XHRuYXRpb25hbE51bWJlcixcblx0XHRcdFx0Y291bnRyeUNvZGU6IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZWwuZm9jdXMoKTtcblx0fVxuXG5cdHB1YmxpYyBvbklucHV0S2V5UHJlc3MoZXZlbnQpOiB2b2lkIHtcblx0XHRjb25zdCBwYXR0ZXJuID0gL1swLTlcXCtcXC1cXCBdLztcblx0XHRjb25zdCBpbnB1dENoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGV2ZW50LmNoYXJDb2RlKTtcblx0XHRpZiAoIXBhdHRlcm4udGVzdChpbnB1dENoYXIpKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBmZXRjaENvdW50cnlEYXRhKCk6IHZvaWQge1xuXHRcdHRoaXMuY291bnRyeUNvZGVEYXRhLmFsbENvdW50cmllcy5mb3JFYWNoKGMgPT4ge1xuXHRcdFx0Y29uc3QgY291bnRyeTogQ291bnRyeSA9IHtcblx0XHRcdFx0bmFtZTogY1swXS50b1N0cmluZygpLFxuXHRcdFx0XHRpc28yOiAoY1sxXS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkgYXMgUGhvbmVDb3VudHJ5Q29kZSksXG5cdFx0XHRcdGRpYWxDb2RlOiBjWzJdLnRvU3RyaW5nKCksXG5cdFx0XHRcdHByaW9yaXR5OiArY1szXSB8fCAwLFxuXHRcdFx0XHRhcmVhQ29kZTogK2NbNF0gfHwgdW5kZWZpbmVkLFxuXHRcdFx0XHRmbGFnQ2xhc3M6IGNbMV0udG9TdHJpbmcoKS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuXHRcdFx0XHRwbGFjZUhvbGRlcjogJydcblx0XHRcdH07XG5cblx0XHRcdGlmICh0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKSB7XG5cdFx0XHRcdGNvdW50cnkucGxhY2VIb2xkZXIgPSB0aGlzLmdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeS5pc28yKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5hbGxDb3VudHJpZXMucHVzaChjb3VudHJ5KTtcblx0XHR9KTtcblx0fVxuXG5cdHByb3RlY3RlZCBnZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKGNvdW50cnlDb2RlOiBQaG9uZUNvdW50cnlDb2RlKTogc3RyaW5nIHtcblx0XHR0cnkge1xuICAgICAgY29uc3QgZXhhbXBsZTogUGhvbmVOdW1iZXIgPSBnZXRFeGFtcGxlTnVtYmVyKGNvdW50cnlDb2RlLCBleGFtcGxlcyBhcyBhbnkpO1xuXHRcdFx0cmV0dXJuIGZvcm1hdChleGFtcGxlLm51bWJlciwgY291bnRyeUNvZGUsICdJTlRFUk5BVElPTkFMJyk7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5sb2coJ0NvdW50cnlDb2RlOiBcIicgKyBjb3VudHJ5Q29kZSArICdcIiAnICsgZSk7XG5cdFx0XHRyZXR1cm4gZTtcblx0XHR9XG5cdH1cblxuXHRyZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuXHR9XG5cblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuXHRcdHRoaXMub25Ub3VjaGVkID0gZm47XG5cdH1cblxuXHRzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcblx0XHR0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcblx0fVxuXG5cdHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcblx0XHRpZiAob2JqKSB7XG5cdFx0XHR0aGlzLnBob25lTnVtYmVyID0gb2JqO1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHRoaXMub25QaG9uZU51bWJlckNoYW5nZSgpO1xuXHRcdFx0fSwgMSk7XG5cdFx0fVxuICB9XG59XG4iXX0=