import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';

const AUTH = "auth_key";
@Injectable({providedIn : "root"})
export class AuthService{

    subject = new BehaviorSubject<User>(null);
    obs$ = this.subject.asObservable();
    loggedIn$ = new Observable<boolean>();

    constructor(private http: HttpClient){

        this.loggedIn$ = this.obs$.pipe(map(val =>  !!val));
        const localUser = localStorage.getItem(AUTH);
        if(localUser!=null){
            this.subject.next(JSON.parse(localUser));
        }
    }


    Login(email : string, password: string) : Observable<User>{
        
        return this.http.post<User>("/api/login", {email,password}).pipe(
            tap(user=> {
                this.subject.next(user);
                localStorage.setItem(AUTH, JSON.stringify(user))
            }),
            shareReplay()
        );

    }

    Logout(){
        this.subject.next(null);
        localStorage.removeItem(AUTH);
    }


}