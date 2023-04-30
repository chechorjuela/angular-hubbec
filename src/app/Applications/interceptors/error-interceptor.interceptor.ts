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
          if (error.error.errors !== undefined || error.error.errors .length > 0) {
            console.info(error.error.errors)
            error.error.errors.map((e: any) => this.toast.error({
              detail: e,
              duration: 5000,
              summary: '',
              type: 'error'
            }))

          } else {
            this.toast.error({detail: 'error', duration: 5000, summary: error.message, type: 'error'});
          }
          return throwError(error);
        })
      );
  }
}
