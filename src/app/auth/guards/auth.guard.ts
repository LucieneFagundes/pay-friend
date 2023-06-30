import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthService = inject(AuthService);
  authService.updatedLoggedIn();

  if (localStorage.getItem("token")) {
    return true;
  } else {
    const router: Router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
