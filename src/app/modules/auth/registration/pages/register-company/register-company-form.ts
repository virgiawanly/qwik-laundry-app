import { FormControl, FormGroup, Validators } from '@angular/forms';

export class RegisterCompanyForm extends FormGroup {
  constructor() {
    super({
      company_name: new FormControl('', [Validators.required]),
      outlet_name: new FormControl('', [Validators.required]),
      outlet_address: new FormControl('', [Validators.required]),
      outlet_phone: new FormControl('', [Validators.required]),
    });
  }
}
