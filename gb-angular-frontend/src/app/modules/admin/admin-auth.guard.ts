import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';


export const adminAuthGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);

  console.log("adminAuthGuard: admin-token ", localStorage.getItem('admin-token'));
  console.log("adminAuthGuard: admin-jwt ", localStorage.getItem('admin-jwt'));


  if (localStorage.getItem('admin-token') != null) {
    // const token = localStorage.getItem('admin-jwt')
    // if (token) {
    //   let decodedToken = jwtDecode(token);
    // }
    return true;
  } else {
    // this.router.navigate(['admin/auth']);
    router.navigate(['smartgroup/auth/adminlogin']);
    return false;

  }

}
//   return true;
// };
