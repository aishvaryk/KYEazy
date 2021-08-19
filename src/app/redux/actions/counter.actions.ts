import { createAction } from '@ngrx/store';

export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');
export const reset = createAction('RESET');
