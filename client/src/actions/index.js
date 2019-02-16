import axios from 'axios';
import history from '../history';
import {
  FETCH_USER,
  FETCH_BUDGETS,
  FETCH_BUDGET,
  DELETE_BUDGET
} from 'actions/types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBudgets = () => async dispatch => {
  const res = await axios.get('/api/budgets');

  dispatch({ type: FETCH_BUDGETS, payload: res.data });
};

export const fetchBudget = budgetId => async dispatch => {
  const res = await axios.get(`/api/budgets/${budgetId}`);

  dispatch({ type: FETCH_BUDGET, payload: res.data });
}

export const addBudget = formValues => async dispatch => {
  const res = await axios.post('/api/budgets', formValues);

  history.push('/budgets');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteBudget = budgetId => async dispatch => {
  const res = await axios.delete(`/api/budgets/delete/${budgetId}`);

  history.push('/budgets');
  dispatch({ type: DELETE_BUDGET, payload: budgetId });
}

// export const test = () => dispatch => {
//   dispatch({ type: 'test', payload: 'test'})
//
// }
