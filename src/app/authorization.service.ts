import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs/Observable';
import { observeOn } from 'rxjs/operators';

const poolData = {
  UserPoolId: 'us-east-2_OgWaNgaFG',
  ClientId: '1d994vbtdi40v4mll0g92r7jqu'
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthorizationService {
  cognitoUser: any;
  cognitoUserName: any;

  /* Error types */
  userExist = 'UsernameExistsException';
  unConfirmedException = 'UserNotConfirmedException';

  constructor() { }

  register(email, password, userData) {

    const attributeList = [];

    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log('signUp error', err);
          if (err.name === this.userExist) {
            this.getCurrentUser(email).subscribe(res => {
              console.log('Userdata', res);
            })
          }
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log('signUp success', result);
        observer.next(result);
        observer.complete();
      });
    });

  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }

  confirmAuthCode(code) {
    const user = {
      Username : this.cognitoUserName,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log('confirmAuthCode() success', result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  getCurrentUser(userName) {
    const user = {
      Username : userName,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.getUserData( (err, result) => {
        if (err) {
          console.error(err);
          observer.error(err);
        }
        console.log('User data', result);
        observer.next(result);
        observer.complete();
      })
    })
  }

  signIn(email, password) {

    this.cognitoUserName = email;

    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          // console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: (err) => {
          console.log(err);
          if (err.code === this.unConfirmedException) {
            observer.next(err);
          }
          observer.error(err);
        },
      });
    });
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }
}
