import { FormControl } from '@angular/forms';
import { ParsedNumber, parse, isValidNumber } from 'libphonenumber-js';

export const phoneNumberValidator = (control: FormControl) => {
	const error = { validatePhoneNumber: { valid: false } };

	let number: ParsedNumber;
	try {
		number = parse(control.value.number, control.value.countryCode);
	} catch (e) {
		return error;
	}

	if (!number) {
		return error;
	} else {
		if (!isValidNumber(number)) {
			return error;
		}
	}

	return;
};
