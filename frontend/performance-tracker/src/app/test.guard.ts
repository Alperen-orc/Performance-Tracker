import { CanActivateFn, Router } from '@angular/router';

export const testGuard: CanActivateFn = () => {
  console.log('Test guard çalıştı');
  return true;
};
