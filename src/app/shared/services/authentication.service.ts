/**
 * Created by AleksanderVatleWaage on 07.02.2017.
 */
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable()
export class AuthenticationService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;


  constructor(private fb: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = fb.authState;
  }

  login(email: string, password: string): Observable<any> {
    return from(this.fb.auth.signInWithEmailAndPassword(email, password));
  }

  register(email: string, password: string): Observable<any> {
    return from(this.fb.auth.createUserWithEmailAndPassword(email, password));
  }

  logout() {
    this.fb.auth.signOut();
  }

  resetPassword(email: string): Observable<any> {
    return from(this.fb.auth.sendPasswordResetEmail(email));
  }

  isLoggedIn(): Observable<firebase.User> {
    return this.user;
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise(
      resolve => {
        this.fb.authState.subscribe(result => {
          if (result && result.uid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    );
  }


}

