import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class RateLimitInterceptor implements HttpInterceptor {
  lastCallTime = 0;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const now = Date.now();
    const delayMs = 1000;
    const elapsed = now - this.lastCallTime;
    if (elapsed < delayMs) {
      // Delay the request if it's being made too quickly
      const delay = delayMs - elapsed;
      return timer(delay).pipe(
        mergeMap(() => next.handle(request))
      );
    } else {
      // Make the request if it's not being made too quickly
      this.lastCallTime = now;
      return next.handle(request);
    }
  }
}
