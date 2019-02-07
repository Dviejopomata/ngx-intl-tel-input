import { CountryCode } from 'libphonenumber-js';
export interface Country {
    name: string;
    iso2: CountryCode;
    dialCode: string;
    priority: number;
    areaCode?: number;
    flagClass: string;
    placeHolder: string;
}
