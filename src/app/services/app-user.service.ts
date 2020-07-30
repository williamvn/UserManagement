import { Injectable } from '@angular/core';
import { AppUser } from '../model/app-user';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../DTO/token-response';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppUserService {
    BASE_URI = "https://his-rest-api.herokuapp.com/auth/login";

    private _tokenSubject = new BehaviorSubject<string>("");
    private _token: Observable<string> = this._tokenSubject.asObservable();

    get token() {
        return this._token;
    }

    constructor(private http: HttpClient) { }

    /**
     * Log the User and Get Token for Auth
     */
    public LogUser(appUser: AppUser): Observable<boolean> {
        return this.http.post<TokenResponse>(this.BASE_URI, appUser)
            .pipe(
                map((response: TokenResponse) => {
                    this._tokenSubject.next(response.access_token);
                    return true;
                }));
    }
}
