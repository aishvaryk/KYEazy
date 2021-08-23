import { createReducer, on } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { set } from 'src/app/redux/actions/loggedin.actions';

export const initialState = false;


const _loggedinReducer = createReducer(
  initialState,
  on(set, (state: any, {loggedin}) => {
    return loggedin;
  }),
);

export function loggedinReducer(state: any, action:any) {
  return _loggedinReducer(state, action);
}
