import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError as observableThrowError } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
        
    ): Observable<HttpEvent<any>>{
        req = req.clone({
            setHeaders: {
                'x-rapidapi-key': '10ffbb2a24msh18509fdbb4dac5bp1d68bbjsn2efb0aa7484f',
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
            },
            setParams: {
                key: 'f319e894efbc45a8aa1f1f3514df94f0'
            }
        });
        return next.handle(req);
    }
}
