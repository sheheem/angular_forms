import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular_forms';
  registerForm!: FormGroup;

  constructor(private _fb: FormBuilder){}

  

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPass: ['', Validators.required]
    },{
      validators: [this.confirmMatch('password', 'confirmPass')]
    })
  }

  confirmMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  get f() {
    return this.registerForm.controls
  }

  onSubmit() {
    if(this.registerForm.invalid) {
      return 
    }
    console.log(this.registerForm.value);
    
  }
}
