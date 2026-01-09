import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  console.log("userAuthGuard: user-token ", localStorage.getItem('user-token'));
  console.log("userAuthGuard: user-jwt ", localStorage.getItem('user-jwt'));


  if (localStorage.getItem('user-token') != null) {
    // const token = localStorage.getItem('admin-jwt')
    // if (token) {
    //   let decodedToken = jwtDecode(token);
    // }
    return true;
  } else {
    // this.router.navigate(['admin/auth']);
    router.navigate(['smartgroup/auth/login']);
    return false;

  }
};
