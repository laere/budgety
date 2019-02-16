import axios from 'axios';
import history from '../history';
import {
  FETCH_USER,
  FETCH_BUDGETS,
  FETCH_BUDGET
} from 'actions/types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBudgets = () => async dispatch => {
  const res = await axios.get('/api/budgets');

  dispatch({ type: FETCH_BUDGETS, payload: res.data });
};

export const fetchBudget = (id) => async dispatch => {
  const res = await axios.get(`/api/budgets/${id}`);

  dispatch({ type: FETCH_BUDGET, payload: res.data });
}

export const addBudget = formValues => async dispatch => {
  const res = await axios.post('/api/budgets', formValues);

  history.push('/budgets');
  dispatch({ type: FETCH_USER, payload: res.data });
};
