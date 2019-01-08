import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { AuthorizationService } from '../authorization.service';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    confirmCode = false;
    codeWasConfirmed = false;
    error = '';

    unConfirmedException = 'UserNotConfirmedException';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthorizationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            console.error('Loginform is invalid');
            return;
        }

        this.loading = true;
        this.authenticationService.signIn(this.f.username.value, this.f.password.value)
            .subscribe(data => {
                if (data.code === this.unConfirmedException) {
                    // this.confirmUser();
                    this.confirmCode = true;
                    return;
                }
                this.router.navigate([this.returnUrl]);
            }, error => {
                console.error(error);
                this.loading = false;
            });
    }

    confirmUser(form: NgForm) {
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

    /**
     * User is not confirmed. DONE
     *
     */
}
