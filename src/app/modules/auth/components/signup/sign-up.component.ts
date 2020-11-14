import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userLastName: ['', [Validators.required]],
      userNickName: ['', [/*Validators.required*/]],
      userEmail: ['', [Validators.required]],
      userPassword: ['', [Validators.required]],
      userConfirmPassword: ['', [/*Validators.required*/]],
      userAge: ['', [/*Validators.required*/]],
    });
  }

  onSubmit(formValue: any) {
    this.authService.register(formValue).subscribe(data => console.log(data),
            error => console.log(error))
  }


//  GETTERS
  get userName() {
    return this.signUpForm.get('userName')
  }
  get userLastName() {
    return this.signUpForm.get('userLastName')
  }
  get userNickName() {
    return this.signUpForm.get('userNickName')
  }
  get userEmail() {
    return this.signUpForm.get('userEmail')
  }
  get userPassword() {
    return this.signUpForm.get('userPassword')
  }
  get userConfirmPassword() {
    return this.signUpForm.get('userConfirmPassword')
  }
  get userAge() {
    return this.signUpForm.get('userAge')
  }
}
