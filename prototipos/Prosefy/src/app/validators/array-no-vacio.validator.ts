import { FormGroup, ValidatorFn } from '@angular/forms';

export function arrayNoVacio(): ValidatorFn {
    return (control) => {
        if (!Array.isArray(control.value) || control.value.length === 0) {
            return { arrayNoVacio: true };
        }
        return null;
    };
}