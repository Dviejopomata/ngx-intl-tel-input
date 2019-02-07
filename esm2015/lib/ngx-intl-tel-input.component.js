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
const ɵ0 = phoneNumberValidator;
export class NgxIntlTelInputComponent {
    /**
     * @param {?} countryCodeData
     */
    constructor(countryCodeData) {
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
        this.onTouched = () => { };
        this.propagateChange = (_) => { };
        this.fetchCountryData();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.preferredCountries.length) {
            this.preferredCountries.forEach(iso2 => {
                /** @type {?} */
                const preferredCountry = this.allCountries.filter((c) => {
                    return c.iso2 === iso2;
                });
                this.preferredCountriesInDropDown.push(preferredCountry[0]);
            });
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter(c => this.onlyCountries.includes(c.iso2));
        }
        if (this.preferredCountriesInDropDown.length) {
            this.selectedCountry = this.preferredCountriesInDropDown[0];
        }
        else {
            this.selectedCountry = this.allCountries[0];
        }
    }
    /**
     * @return {?}
     */
    onPhoneNumberChange() {
        this.value = this.phoneNumber;
        /** @type {?} */
        let number;
        try {
            number = parse(this.phoneNumber, this.selectedCountry.iso2);
        }
        catch (e) {
        }
        /** @type {?} */
        let countryCode = this.selectedCountry.iso2;
        // auto select country based on the extension (e.g select spain if number starts with +34)
        if (this.enableAutoCountrySelect) {
            countryCode = number && number.country
                ? number.country
                : this.selectedCountry.iso2;
            if (countryCode !== this.selectedCountry.iso2) {
                /** @type {?} */
                const newCountry = this.allCountries.find(c => c.iso2 === countryCode);
                if (newCountry) {
                    this.selectedCountry = newCountry;
                }
            }
        }
        countryCode = countryCode ? countryCode : this.selectedCountry.iso2;
        /** @type {?} */
        const internationalNumber = number ? format(number, 'INTERNATIONAL') : '';
        /** @type {?} */
        const nationalNumber = number ? format(number, 'NATIONAL') : '';
        this.propagateChange({
            number: this.value,
            internationalNumber,
            nationalNumber,
            countryCode: countryCode.toUpperCase()
        });
    }
    /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    onCountrySelect(country, el) {
        this.selectedCountry = country;
        if (this.phoneNumber.length > 0) {
            this.value = this.phoneNumber;
            /** @type {?} */
            let number;
            try {
                number = parse(this.phoneNumber, this.selectedCountry.iso2);
            }
            catch (e) {
            }
            /** @type {?} */
            const internationalNumber = number ? format(number, 'INTERNATIONAL') : '';
            /** @type {?} */
            const nationalNumber = number ? format(number, 'NATIONAL') : '';
            this.propagateChange({
                number: this.value,
                internationalNumber,
                nationalNumber,
                countryCode: this.selectedCountry.iso2.toUpperCase()
            });
        }
        el.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInputKeyPress(event) {
        /** @type {?} */
        const pattern = /[0-9\+\-\ ]/;
        /** @type {?} */
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    /**
     * @protected
     * @return {?}
     */
    fetchCountryData() {
        this.countryCodeData.allCountries.forEach(c => {
            /** @type {?} */
            const country = {
                name: c[0].toString(),
                iso2: ((/** @type {?} */ (c[1].toString().toUpperCase()))),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCode: +c[4] || undefined,
                flagClass: c[1].toString().toLocaleLowerCase(),
                placeHolder: ''
            };
            if (this.enablePlaceholder) {
                country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2);
            }
            this.allCountries.push(country);
        });
    }
    /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    getPhoneNumberPlaceHolder(countryCode) {
        try {
            /** @type {?} */
            const example = getExampleNumber(countryCode, (/** @type {?} */ (examples)));
            return format(example.number, countryCode, 'INTERNATIONAL');
        }
        catch (e) {
            console.log('CountryCode: "' + countryCode + '" ' + e);
            return e;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj) {
            this.phoneNumber = obj;
            setTimeout(() => {
                this.onPhoneNumberChange();
            }, 1);
        }
    }
}
NgxIntlTelInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-intl-tel-input',
                template: "<div class=\"intl-tel-input allow-dropdown\">\n  <div class=\"flag-container\" dropdown [ngClass]=\"{'disabled': disabled}\">\n    <div class=\"selected-flag dropdown-toggle\" dropdownToggle>\n      <div class=\"iti-flag\" [ngClass]=\"selectedCountry.flagClass\"></div>\n      <div class=\"iti-arrow\"></div>\n    </div>\n    <ul class=\"country-list dropdown-menu\" *dropdownMenu>\n      <li class=\"country\" *ngFor=\"let country of preferredCountriesInDropDown\" (click)=\"onCountrySelect(country, focusable)\">\n        <div class=\"flag-box\">\n          <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\n        </div>\n        <span class=\"country-name\">{{country.name}}</span>\n        <span class=\"dial-code\">+{{country.dialCode}}</span>\n      </li>\n      <li class=\"divider\" *ngIf=\"preferredCountriesInDropDown?.length\"></li>\n      <li class=\"country\" *ngFor=\"let country of allCountries\" (click)=\"onCountrySelect(country, focusable)\">\n        <div class=\"flag-box\">\n          <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\n        </div>\n        <span class=\"country-name\">{{country.name}}</span>\n        <span class=\"dial-code\">+{{country.dialCode}}</span>\n      </li>\n    </ul>\n  </div>\n  <input type=\"tel\" id=\"phone\" autocomplete=\"off\"\n        [ngClass]=\"cssClass\"\n        (blur)=\"onTouched()\"\n        (keypress)=\"onInputKeyPress($event)\"\n        [(ngModel)]=\"phoneNumber\"\n        (ngModelChange)=\"onPhoneNumberChange()\"\n        [disabled]=\"disabled\"\n        [placeholder]=\"selectedCountry.placeHolder\" #focusable>\n</div>\n",
                providers: [
                    CountryCode,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef(() => NgxIntlTelInputComponent),
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
NgxIntlTelInputComponent.ctorParameters = () => [
    { type: CountryCode }
];
NgxIntlTelInputComponent.propDecorators = {
    value: [{ type: Input }],
    preferredCountries: [{ type: Input }],
    enablePlaceholder: [{ type: Input }],
    cssClass: [{ type: Input }],
    onlyCountries: [{ type: Input }],
    enableAutoCountrySelect: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUF3QixhQUFhLEVBQUUsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFdEUsT0FBTyxRQUFRLE1BQU0sd0NBQXdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWlELGdCQUFnQixFQUFjLE1BQU0sbUJBQW1CLENBQUM7V0FlbEgsb0JBQW9CO0FBS2pDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFvQnBDLFlBQ1MsZUFBNEI7UUFBNUIsb0JBQWUsR0FBZixlQUFlLENBQWE7UUFuQjVCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCx1QkFBa0IsR0FBa0IsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixhQUFRLEdBQUcsY0FBYyxDQUFDO1FBQ3pCLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztRQUNsQyw0QkFBdUIsR0FBRyxLQUFLLENBQUM7UUFFMUMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsaUJBQVksR0FBbUIsRUFBRSxDQUFDO1FBQ2xDLGlDQUE0QixHQUFtQixFQUFFLENBQUM7UUFFbEQsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixXQUFNLEdBQWUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBR25ELGNBQVMsR0FBRyxHQUFHLEVBQUUsR0FB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cEIsc0RBQWdEOztJQUNoRCxxREFBa0M7O0lBQ2xDLDRDQUFtQzs7SUFDbEMsaURBQTJDOztJQUMzQywyREFBeUM7O0lBRTFDLCtDQUFpQjs7SUFDakIsZ0RBQWtDOztJQUNsQyxnRUFBa0Q7O0lBQ2xELG1EQUF5Qjs7SUFDekIsNENBQWlCOztJQUNqQiwwQ0FBbUQ7O0lBR25ELDZDQUFzQjs7SUFDdEIsbURBQWtDOzs7OztJQUdqQyxtREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb3VudHJ5Q29kZSB9IGZyb20gJy4vZGF0YS9jb3VudHJ5LWNvZGUnO1xuaW1wb3J0IHsgcGhvbmVOdW1iZXJWYWxpZGF0b3IgfSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3InO1xuaW1wb3J0IHsgQ291bnRyeSB9IGZyb20gJy4vbW9kZWwvY291bnRyeS5tb2RlbCc7XG5pbXBvcnQgZXhhbXBsZXMgZnJvbSAnbGlicGhvbmVudW1iZXItanMvZXhhbXBsZXMubW9iaWxlLmpzb24nO1xuaW1wb3J0IHsgcGFyc2UsIGZvcm1hdCwgUGFyc2VkTnVtYmVyLCBDb3VudHJ5Q29kZSBhcyBQaG9uZUNvdW50cnlDb2RlLCBnZXRFeGFtcGxlTnVtYmVyLCBQaG9uZU51bWJlcn0gZnJvbSAnbGlicGhvbmVudW1iZXItanMnO1xuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbmd4LWludGwtdGVsLWlucHV0Jyxcblx0dGVtcGxhdGVVcmw6ICcuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuY3NzJ10sXG5cdHByb3ZpZGVyczogW1xuXHRcdENvdW50cnlDb2RlLFxuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQpLFxuXHRcdFx0bXVsdGk6IHRydWVcblx0XHR9LFxuXHRcdHtcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG5cdFx0XHR1c2VWYWx1ZTogcGhvbmVOdW1iZXJWYWxpZGF0b3IsXG5cdFx0XHRtdWx0aTogdHJ1ZSxcblx0XHR9XG5cdF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRASW5wdXQoKSB2YWx1ZSA9ICcnO1xuXHRASW5wdXQoKSBwcmVmZXJyZWRDb3VudHJpZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblx0QElucHV0KCkgZW5hYmxlUGxhY2Vob2xkZXIgPSB0cnVlO1xuXHRASW5wdXQoKSBjc3NDbGFzcyA9ICdmb3JtLWNvbnRyb2wnO1xuICBASW5wdXQoKSBvbmx5Q291bnRyaWVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0ID0gZmFsc2U7XG5cblx0cGhvbmVOdW1iZXIgPSAnJztcblx0YWxsQ291bnRyaWVzOiBBcnJheTxDb3VudHJ5PiA9IFtdO1xuXHRwcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duOiBBcnJheTxDb3VudHJ5PiA9IFtdO1xuXHRzZWxlY3RlZENvdW50cnk6IENvdW50cnk7XG5cdGRpc2FibGVkID0gZmFsc2U7XG5cdGVycm9yczogQXJyYXk8YW55PiA9IFsnUGhvbmUgbnVtYmVyIGlzIHJlcXVpcmVkLiddO1xuXG5cblx0b25Ub3VjaGVkID0gKCkgPT4geyB9O1xuXHRwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBjb3VudHJ5Q29kZURhdGE6IENvdW50cnlDb2RlXG5cdCkge1xuXHRcdHRoaXMuZmV0Y2hDb3VudHJ5RGF0YSgpO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0aWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5wcmVmZXJyZWRDb3VudHJpZXMuZm9yRWFjaChpc28yID0+IHtcblx0XHRcdFx0Y29uc3QgcHJlZmVycmVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcigoYykgPT4ge1xuXHRcdFx0XHRcdHJldHVybiBjLmlzbzIgPT09IGlzbzI7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5wdXNoKHByZWZlcnJlZENvdW50cnlbMF0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuICAgIGlmICh0aGlzLm9ubHlDb3VudHJpZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFsbENvdW50cmllcyA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcihjID0+IHRoaXMub25seUNvdW50cmllcy5pbmNsdWRlcyhjLmlzbzIpKTtcbiAgICB9XG5cdFx0aWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5sZW5ndGgpIHtcblx0XHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gdGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duWzBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNlbGVjdGVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzWzBdO1xuICAgIH1cblx0fVxuXG5cdHB1YmxpYyBvblBob25lTnVtYmVyQ2hhbmdlKCk6IHZvaWQge1xuXHRcdHRoaXMudmFsdWUgPSB0aGlzLnBob25lTnVtYmVyO1xuXG5cdFx0bGV0IG51bWJlcjogUGFyc2VkTnVtYmVyO1xuXHRcdHRyeSB7XG4gICAgICBudW1iZXIgPSBwYXJzZSh0aGlzLnBob25lTnVtYmVyLCB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yKTtcblx0XHR9IGNhdGNoIChlKSB7XG4gICAgfVxuXG4gICAgbGV0IGNvdW50cnlDb2RlID0gdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcbiAgICAvLyBhdXRvIHNlbGVjdCBjb3VudHJ5IGJhc2VkIG9uIHRoZSBleHRlbnNpb24gKGUuZyBzZWxlY3Qgc3BhaW4gaWYgbnVtYmVyIHN0YXJ0cyB3aXRoICszNClcbiAgICBpZiAodGhpcy5lbmFibGVBdXRvQ291bnRyeVNlbGVjdCkge1xuICAgICAgY291bnRyeUNvZGUgPSBudW1iZXIgJiYgbnVtYmVyLmNvdW50cnlcbiAgICAgICAgPyBudW1iZXIuY291bnRyeVxuICAgICAgICA6IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzI7XG4gICAgICBpZiAoY291bnRyeUNvZGUgIT09IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIpIHtcbiAgICAgICAgY29uc3QgbmV3Q291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbmQoYyA9PiBjLmlzbzIgPT09IGNvdW50cnlDb2RlKTtcbiAgICAgICAgaWYgKG5ld0NvdW50cnkpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ291bnRyeSA9IG5ld0NvdW50cnk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY291bnRyeUNvZGUgPSBjb3VudHJ5Q29kZSA/IGNvdW50cnlDb2RlIDogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcbiAgICBjb25zdCBpbnRlcm5hdGlvbmFsTnVtYmVyID0gbnVtYmVyID8gZm9ybWF0KG51bWJlciwgJ0lOVEVSTkFUSU9OQUwnKSA6ICcnO1xuICAgIGNvbnN0IG5hdGlvbmFsTnVtYmVyID0gbnVtYmVyID8gZm9ybWF0KG51bWJlciwgJ05BVElPTkFMJykgOiAnJztcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XG5cdFx0XHRudW1iZXI6IHRoaXMudmFsdWUsXG5cdFx0XHRpbnRlcm5hdGlvbmFsTnVtYmVyLFxuXHRcdFx0bmF0aW9uYWxOdW1iZXIsXG4gICAgICBjb3VudHJ5Q29kZTogY291bnRyeUNvZGUudG9VcHBlckNhc2UoKVxuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIG9uQ291bnRyeVNlbGVjdChjb3VudHJ5OiBDb3VudHJ5LCBlbCk6IHZvaWQge1xuXHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gY291bnRyeTtcblxuXHRcdGlmICh0aGlzLnBob25lTnVtYmVyLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMudmFsdWUgPSB0aGlzLnBob25lTnVtYmVyO1xuXG5cdFx0XHRsZXQgbnVtYmVyOiBQYXJzZWROdW1iZXI7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRudW1iZXIgPSBwYXJzZSh0aGlzLnBob25lTnVtYmVyLCB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdH1cbiAgICAgIGNvbnN0IGludGVybmF0aW9uYWxOdW1iZXIgPSBudW1iZXIgPyBmb3JtYXQobnVtYmVyLCAnSU5URVJOQVRJT05BTCcpIDogJyc7XG4gICAgICBjb25zdCBuYXRpb25hbE51bWJlciA9IG51bWJlciA/IGZvcm1hdChudW1iZXIsICdOQVRJT05BTCcpIDogJyc7XG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XG5cdFx0XHRcdG51bWJlcjogdGhpcy52YWx1ZSxcblx0XHRcdFx0aW50ZXJuYXRpb25hbE51bWJlcixcblx0XHRcdFx0bmF0aW9uYWxOdW1iZXIsXG5cdFx0XHRcdGNvdW50cnlDb2RlOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yLnRvVXBwZXJDYXNlKClcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGVsLmZvY3VzKCk7XG5cdH1cblxuXHRwdWJsaWMgb25JbnB1dEtleVByZXNzKGV2ZW50KTogdm9pZCB7XG5cdFx0Y29uc3QgcGF0dGVybiA9IC9bMC05XFwrXFwtXFwgXS87XG5cdFx0Y29uc3QgaW5wdXRDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShldmVudC5jaGFyQ29kZSk7XG5cdFx0aWYgKCFwYXR0ZXJuLnRlc3QoaW5wdXRDaGFyKSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgZmV0Y2hDb3VudHJ5RGF0YSgpOiB2b2lkIHtcblx0XHR0aGlzLmNvdW50cnlDb2RlRGF0YS5hbGxDb3VudHJpZXMuZm9yRWFjaChjID0+IHtcblx0XHRcdGNvbnN0IGNvdW50cnk6IENvdW50cnkgPSB7XG5cdFx0XHRcdG5hbWU6IGNbMF0udG9TdHJpbmcoKSxcblx0XHRcdFx0aXNvMjogKGNbMV0udG9TdHJpbmcoKS50b1VwcGVyQ2FzZSgpIGFzIFBob25lQ291bnRyeUNvZGUpLFxuXHRcdFx0XHRkaWFsQ29kZTogY1syXS50b1N0cmluZygpLFxuXHRcdFx0XHRwcmlvcml0eTogK2NbM10gfHwgMCxcblx0XHRcdFx0YXJlYUNvZGU6ICtjWzRdIHx8IHVuZGVmaW5lZCxcblx0XHRcdFx0ZmxhZ0NsYXNzOiBjWzFdLnRvU3RyaW5nKCkudG9Mb2NhbGVMb3dlckNhc2UoKSxcblx0XHRcdFx0cGxhY2VIb2xkZXI6ICcnXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAodGhpcy5lbmFibGVQbGFjZWhvbGRlcikge1xuXHRcdFx0XHRjb3VudHJ5LnBsYWNlSG9sZGVyID0gdGhpcy5nZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKGNvdW50cnkuaXNvMik7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuYWxsQ291bnRyaWVzLnB1c2goY291bnRyeSk7XG5cdFx0fSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZ2V0UGhvbmVOdW1iZXJQbGFjZUhvbGRlcihjb3VudHJ5Q29kZTogUGhvbmVDb3VudHJ5Q29kZSk6IHN0cmluZyB7XG5cdFx0dHJ5IHtcbiAgICAgIGNvbnN0IGV4YW1wbGU6IFBob25lTnVtYmVyID0gZ2V0RXhhbXBsZU51bWJlcihjb3VudHJ5Q29kZSwgZXhhbXBsZXMgYXMgYW55KTtcblx0XHRcdHJldHVybiBmb3JtYXQoZXhhbXBsZS5udW1iZXIsIGNvdW50cnlDb2RlLCAnSU5URVJOQVRJT05BTCcpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdDb3VudHJ5Q29kZTogXCInICsgY291bnRyeUNvZGUgKyAnXCIgJyArIGUpO1xuXHRcdFx0cmV0dXJuIGU7XG5cdFx0fVxuXHR9XG5cblx0cmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcblx0fVxuXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcblx0XHR0aGlzLm9uVG91Y2hlZCA9IGZuO1xuXHR9XG5cblx0c2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG5cdFx0dGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG5cdH1cblxuXHR3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XG5cdFx0aWYgKG9iaikge1xuXHRcdFx0dGhpcy5waG9uZU51bWJlciA9IG9iajtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHR0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcblx0XHRcdH0sIDEpO1xuXHRcdH1cbiAgfVxufVxuIl19