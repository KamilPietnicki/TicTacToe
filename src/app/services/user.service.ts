import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router'; 
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from 'amazon-cognito-identity-js';

const PoolData = {
    UserPoolId: 'us-east-1_qRdMI4QGp',
    ClientId: '193l2qgeu9o51qpmboddhda5kk'
  };
  
const userPool = new CognitoUserPool(PoolData);

@Injectable()
export class UserService {

    // Enable routing

    constructor(private router: Router){
    }

    /// Sign Up User

    signupUser(user: string, password: string, email: string) {
        const dataEmail = {
        Name: 'email',
        Value: email
        };
        const  emailAtt = [new CognitoUserAttribute(dataEmail)];

        userPool.signUp(user,  password, emailAtt, null, ((err, result) => {
        if (err) {
            console.log('There was an error ', err);
        } else {
            console.log('You have successfully signed up')
            this.router.navigate(['home'])
        }
        }))
    }

    /// Confirm User

    confirmUser(username: string, code: string) {
      const userData = {
        Username: username,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.log('There was an error -> ', err)
        } else {
          console.log('You have been confirmed ')
        }
      })
    }

    //// Sign in User

    signinUser(username: string, password: string) {
        const authData = {
        Username: username,
        Password: password
        };

        const authDetails = new AuthenticationDetails(authData);

        const userData = {
            Username: username,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: () => {
                this.router.navigate(['home'])
            },
            onFailure: (err) => {
                console.log('There was an error during login, please try again -> ', err)
            }
        })
    }

    /// Log User Out

    logoutUser() {
      userPool.getCurrentUser().signOut();
      this.router.navigate(['login'])
    }

    checkUser() {
        var user = userPool.getCurrentUser();
        console.log(user);
        return user;
    }

    ValidateEmail(mail: string) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
      }
        return (false)
    }
}