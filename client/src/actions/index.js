import axios from 'axios';
import history from '../history';
import {
  FETCH_USER,
  FETCH_BUDGETS,
} from 'actions/types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};


export const fetchBudgets = () => async dispatch => {
  const res = await axios.get('api/budgets');

  dispatch({ type: FETCH_BUDGETS, payload: res.data });
};

export const fetchBudget = () => async dispatch => {

};

export const addBudget = formValues => async (dispatch, getState) => {
  const res = await axios.post('/api/budgets', formValues);

  dispatch({ type: FETCH_USER, payload: res.data });

  history.push('/budgets');
};

export const editBudget = (id, formValues) => async dispatch => {

};

export const deleteBudget = (id) => async dispatch => {

}

export const addTransaction = () => dispatch => {

};

export const deleteTransaction = (id) => dispatch => {

};

export const editTransaction = (id, formValues) => dispatch => {

};
