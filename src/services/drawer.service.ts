import { Subject } from 'rxjs';
import { useState, useEffect } from 'react';

const subscriberSource = new Subject<boolean>();
const subscriber$ = subscriberSource.asObservable();

const useDrawerStatus = (toggle: boolean) => {
  const [open, setOpen] = useState(toggle);

  useEffect(() => {
    const subs = subscriber$.subscribe((t) => {
      setOpen(t);
      drawerService.defaultValue = t;
    });

    return () => {
      if (subs) subs.unsubscribe();
    };
  }, [toggle]);

  return open;
};

export const drawerService = {
  defaultValue: true,
  toggleDrawer: (t: boolean) => {
    subscriberSource.next(t);
  },
  useDrawerStatus,
};
