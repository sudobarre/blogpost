import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class ExceptionIntercept implements HttpInterceptor {
  constructor() {
    }


    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle(request)
/*            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let message = '';
                    if (error.error instanceof ErrorEvent) {
                        // handle client-side error
                        message = `Error: ${error.error.message}`;
                    } else {
                        // handle server-side error
                        message = `Error Status: ${error.status}\nMessage: ${error.message}`;
                    }
                    console.log(message);
                    return throwError(() => new Error (message));
                })
            ) */
    }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ExceptionIntercept, multi: true },
];
