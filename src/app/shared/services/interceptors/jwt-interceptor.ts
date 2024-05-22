import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { environment_Taskify } from '../../../../environments/Taskify-environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let cloneReq = req.clone()
    let token = sessionStorage.getItem('token')
    if (cloneReq.url.includes(`${environment_Taskify.baseUrl}`)) {
      cloneReq = cloneReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })

    }
    return next.handle(cloneReq);
  }
}
