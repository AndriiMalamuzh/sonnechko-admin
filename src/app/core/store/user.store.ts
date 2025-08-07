import { IUser } from '@interfaces/user/user.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => ({
    setUser(user: IUser) {
      patchState(store, { user });
    },
  }))
);
