/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { parse, isValidNumber } from 'libphonenumber-js';
/** @type {?} */
export var phoneNumberValidator = function (control) {
    /** @type {?} */
    var error = { validatePhoneNumber: { valid: false } };
    /** @type {?} */
    var number;
    try {
        number = parse(control.value.number, control.value.countryCode);
    }
    catch (e) {
        return error;
    }
    if (!number) {
        return error;
    }
    else {
        if (!isValidNumber(number)) {
            return error;
        }
    }
    return;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQWdCLEtBQUssRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFdkUsTUFBTSxLQUFPLG9CQUFvQixHQUFHLFVBQUMsT0FBb0I7O1FBQ2xELEtBQUssR0FBRyxFQUFFLG1CQUFtQixFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFOztRQUVuRCxNQUFvQjtJQUN4QixJQUFJO1FBQ0gsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ2hFO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDWCxPQUFPLEtBQUssQ0FBQztLQUNiO0lBRUQsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNaLE9BQU8sS0FBSyxDQUFDO0tBQ2I7U0FBTTtRQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUM7U0FDYjtLQUNEO0lBRUQsT0FBTztBQUNSLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFBhcnNlZE51bWJlciwgcGFyc2UsIGlzVmFsaWROdW1iZXIgfSBmcm9tICdsaWJwaG9uZW51bWJlci1qcyc7XG5cbmV4cG9ydCBjb25zdCBwaG9uZU51bWJlclZhbGlkYXRvciA9IChjb250cm9sOiBGb3JtQ29udHJvbCkgPT4ge1xuXHRjb25zdCBlcnJvciA9IHsgdmFsaWRhdGVQaG9uZU51bWJlcjogeyB2YWxpZDogZmFsc2UgfSB9O1xuXG5cdGxldCBudW1iZXI6IFBhcnNlZE51bWJlcjtcblx0dHJ5IHtcblx0XHRudW1iZXIgPSBwYXJzZShjb250cm9sLnZhbHVlLm51bWJlciwgY29udHJvbC52YWx1ZS5jb3VudHJ5Q29kZSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gZXJyb3I7XG5cdH1cblxuXHRpZiAoIW51bWJlcikge1xuXHRcdHJldHVybiBlcnJvcjtcblx0fSBlbHNlIHtcblx0XHRpZiAoIWlzVmFsaWROdW1iZXIobnVtYmVyKSkge1xuXHRcdFx0cmV0dXJuIGVycm9yO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybjtcbn07XG4iXX0=