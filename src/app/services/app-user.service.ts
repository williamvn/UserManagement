import { Injectable } from '@angular/core';
import { AppUser } from '../model/app-user';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../DTO/token-response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppUserService {
    BASE_URI = "http://192.168.0.164:3000/auth/login";

    private _token: string;

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
                    this._token = response.access_token;
                    return true;
                }));
    }
}
