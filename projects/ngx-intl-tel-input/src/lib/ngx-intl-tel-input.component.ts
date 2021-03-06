import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { CountryCode } from './data/country-code';
import { phoneNumberValidator } from './ngx-intl-tel-input.validator';
import { Country } from './model/country.model';
import examples from 'libphonenumber-js/examples.mobile.json';
import { parse, format, ParsedNumber, CountryCode as PhoneCountryCode, getExampleNumber, PhoneNumber} from 'libphonenumber-js';
@Component({
	selector: 'ngx-intl-tel-input',
	templateUrl: './ngx-intl-tel-input.component.html',
	styleUrls: ['./ngx-intl-tel-input.component.css'],
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
			useValue: phoneNumberValidator,
			multi: true,
		}
	]
})
export class NgxIntlTelInputComponent implements OnInit {

	@Input() value = '';
	@Input() preferredCountries: Array<string> = [];
	@Input() enablePlaceholder = true;
	@Input() cssClass = 'form-control';
  @Input() onlyCountries: Array<string> = [];
  @Input() enableAutoCountrySelect = false;

	phoneNumber = '';
	allCountries: Array<Country> = [];
	preferredCountriesInDropDown: Array<Country> = [];
	selectedCountry: Country;
	disabled = false;
	errors: Array<any> = ['Phone number is required.'];


	onTouched = () => { };
	propagateChange = (_: any) => { };

	constructor(
		private countryCodeData: CountryCode
	) {
		this.fetchCountryData();
	}

	ngOnInit() {
		if (this.preferredCountries.length) {
			this.preferredCountries.forEach(iso2 => {
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
		} else {
			this.selectedCountry = this.allCountries[0];
    }
	}

	public onPhoneNumberChange(): void {
		this.value = this.phoneNumber;

		let number: ParsedNumber;
		try {
      number = parse(this.phoneNumber, this.selectedCountry.iso2);
		} catch (e) {
    }

    let countryCode = this.selectedCountry.iso2;
    // auto select country based on the extension (e.g select spain if number starts with +34)
    if (this.enableAutoCountrySelect) {
      countryCode = number && number.country
        ? number.country
        : this.selectedCountry.iso2;
      if (countryCode !== this.selectedCountry.iso2) {
        const newCountry = this.allCountries.find(c => c.iso2 === countryCode);
        if (newCountry) {
          this.selectedCountry = newCountry;
        }
      }
    }
    countryCode = countryCode ? countryCode : this.selectedCountry.iso2;
    const internationalNumber = number ? format(number, 'INTERNATIONAL') : '';
    const nationalNumber = number ? format(number, 'NATIONAL') : '';
		this.propagateChange({
			number: this.value,
			internationalNumber,
			nationalNumber,
      countryCode: countryCode.toUpperCase()
		});
	}

	public onCountrySelect(country: Country, el): void {
		this.selectedCountry = country;

		if (this.phoneNumber.length > 0) {
			this.value = this.phoneNumber;

			let number: ParsedNumber;
			try {
				number = parse(this.phoneNumber, this.selectedCountry.iso2);
			} catch (e) {
			}
      const internationalNumber = number ? format(number, 'INTERNATIONAL') : '';
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

	public onInputKeyPress(event): void {
		const pattern = /[0-9\+\-\ ]/;
		const inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
			event.preventDefault();
		}
	}

	protected fetchCountryData(): void {
		this.countryCodeData.allCountries.forEach(c => {
			const country: Country = {
				name: c[0].toString(),
				iso2: (c[1].toString().toUpperCase() as PhoneCountryCode),
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

	protected getPhoneNumberPlaceHolder(countryCode: PhoneCountryCode): string {
		try {
      const example: PhoneNumber = getExampleNumber(countryCode, examples);
			return format(example.number, countryCode, 'INTERNATIONAL');
		} catch (e) {
			console.log('CountryCode: "' + countryCode + '" ' + e);
			return e;
		}
	}

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	writeValue(obj: any): void {
		if (obj) {
			this.phoneNumber = obj;
			setTimeout(() => {
				this.onPhoneNumberChange();
			}, 1);
		}
  }
}
