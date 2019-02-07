/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { parse, isValidNumber } from 'libphonenumber-js';
/** @type {?} */
export const phoneNumberValidator = (control) => {
    /** @type {?} */
    const error = { validatePhoneNumber: { valid: false } };
    /** @type {?} */
    let number;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQWdCLEtBQUssRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFFdkUsTUFBTSxPQUFPLG9CQUFvQixHQUFHLENBQUMsT0FBb0IsRUFBRSxFQUFFOztVQUN0RCxLQUFLLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTs7UUFFbkQsTUFBb0I7SUFDeEIsSUFBSTtRQUNILE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNoRTtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1gsT0FBTyxLQUFLLENBQUM7S0FDYjtJQUVELElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDWixPQUFPLEtBQUssQ0FBQztLQUNiO1NBQU07UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1NBQ2I7S0FDRDtJQUVELE9BQU87QUFDUixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQYXJzZWROdW1iZXIsIHBhcnNlLCBpc1ZhbGlkTnVtYmVyIH0gZnJvbSAnbGlicGhvbmVudW1iZXItanMnO1xuXG5leHBvcnQgY29uc3QgcGhvbmVOdW1iZXJWYWxpZGF0b3IgPSAoY29udHJvbDogRm9ybUNvbnRyb2wpID0+IHtcblx0Y29uc3QgZXJyb3IgPSB7IHZhbGlkYXRlUGhvbmVOdW1iZXI6IHsgdmFsaWQ6IGZhbHNlIH0gfTtcblxuXHRsZXQgbnVtYmVyOiBQYXJzZWROdW1iZXI7XG5cdHRyeSB7XG5cdFx0bnVtYmVyID0gcGFyc2UoY29udHJvbC52YWx1ZS5udW1iZXIsIGNvbnRyb2wudmFsdWUuY291bnRyeUNvZGUpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGVycm9yO1xuXHR9XG5cblx0aWYgKCFudW1iZXIpIHtcblx0XHRyZXR1cm4gZXJyb3I7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKCFpc1ZhbGlkTnVtYmVyKG51bWJlcikpIHtcblx0XHRcdHJldHVybiBlcnJvcjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm47XG59O1xuIl19