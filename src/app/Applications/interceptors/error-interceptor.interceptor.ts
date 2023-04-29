import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {NgToastService} from "ng-angular-popup";

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private toast: NgToastService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.toast.error({detail: 'error', duration: 5000, summary: error.message, type: 'error'});
          return throwError(error);
        })
      );
  }
}
