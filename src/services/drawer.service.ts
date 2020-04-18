import { Subject } from 'rxjs';

export const subscriber = new Subject<boolean>();

export const drawerService = {
  toggleDrawer: (t: boolean) => {
    subscriber.next(t);
  },
};
