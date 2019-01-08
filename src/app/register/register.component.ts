import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

// import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { AuthorizationService } from '../authorization.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    confirmCode = false;
    codeWasConfirmed = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthorizationService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        const userData = [this.f.firstName.value, this.f.lastName.value];
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            console.error('Loginform is invalid');
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.f.username.value, this.f.password.value, userData)
            .subscribe(data => {
                this.confirmCode = true;
                console.log('Registration successful');
                // this.router.navigate(['/login']);
            }, error => {
                console.error(error);
                this.error = 'Registration Error has occurred';
                this.loading = false;
            });
    }

    // register(form: NgForm) {
    //     const email = form.value.email;
    //     const password = form.value.password;
    //     this.auth.register(email, password).subscribe(
    //       (data) => {
    //         this.confirmCode = true;
    //       },
    //       (err) => {
    //         console.log(err);
    //         this.error = 'Registration Error has occurred';
    //       }
    //     );
    //   }

      validateAuthCode(form: NgForm) {
        const code = form.value.code;

        this.authenticationService.confirmAuthCode(code).subscribe(
          (data) => {
            // this._router.navigateByUrl('/');
            this.codeWasConfirmed = true;
            this.confirmCode = false;
          },
          (err) => {
            console.log(err);
            this.error = 'Confirm Authorization Error has occurred';
          });
      }

    //   unConfirmedUser() {

    //   }

      /**
       * An account with the given email already exists.
       */
}
