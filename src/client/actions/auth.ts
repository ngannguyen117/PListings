import axios from 'axios';
import { history } from '../history';
import {
  ActionTypes,
  catchSubmissionError,
  FetchCurrentUserAction,
  SignUpAction,
  LogInAction,
  LogOutAction,
  UpdateProfileAction,
  UpdateProfileAttrs,
  UpdatePasswordAction,
  UpdatePasswordAttrs,
  FunctionalAction,
  processCombinedLocationToGeoLocation,
  processFormValuesToFormData,
} from '../utilities';
import { UserAttrs } from '../../server/models';
import { ApiRoutes } from '../../common';
import { reset } from 'redux-form';
import { AlertType, showAlert } from '.././components/alert';

export const fetchCurrentUser = (): FunctionalAction<
  FetchCurrentUserAction
> => async dispatch => {
  const { data } = await axios.get(ApiRoutes.CurrentUser);

  dispatch({
    type: ActionTypes.fetchCurrentUser,
    payload: data.data,
  });
};

export const signUp = (formValues: UserAttrs): FunctionalAction<SignUpAction> =>
  catchSubmissionError(async (dispatch, getState) => {
    const { data } = await axios.post(ApiRoutes.SignUp, {
      ...formValues,
      location: getState!().currentLocation,
    });

    dispatch({
      type: ActionTypes.signUp,
      payload: data.data,
    });

    history.push('/');
  });

export const logIn = (formValue: {
  email: string;
  password: string;
}): FunctionalAction<LogInAction> =>
  catchSubmissionError(async dispatch => {
    const { data } = await axios.post(ApiRoutes.LogIn, formValue);

    dispatch({
      type: ActionTypes.logIn,
      payload: data.data,
    });

    showAlert(AlertType.Success, 'Logged in successfully');
    history.push('/');
  });

export const logOut = (nextRoute = '/'): FunctionalAction<LogOutAction> => {
  return async dispatch => {
    await axios.get(ApiRoutes.LogOut);

    dispatch({
      type: ActionTypes.logOut,
      payload: null,
    });

    history.push(nextRoute);
  };
};

export const updatePassword = (
  formValue: UpdatePasswordAttrs
): FunctionalAction<UpdatePasswordAction> =>
  catchSubmissionError(async dispatch => {
    const { data } = await axios.patch(ApiRoutes.UpdateMyPassword, formValue);

    dispatch({
      type: ActionTypes.updatePassword,
      payload: data.data,
    });

    showAlert(AlertType.Success, 'Password updated successfully');
    //@ts-ignore
    dispatch(reset('updatePasswordForm'));
  });

export const updateProfile = (
  formValues: UpdateProfileAttrs
): FunctionalAction<UpdateProfileAction> =>
  catchSubmissionError(async dispatch => {
    processCombinedLocationToGeoLocation(formValues);

    let response;

    if (!formValues.photo)
      response = await axios.patch(ApiRoutes.UpdateMyAccount, formValues);
    else {
      formValues.photo = formValues.photo[0];

      const formData = new FormData();
      processFormValuesToFormData(formValues, formData);

      response = await axios.patch(ApiRoutes.UpdateMyAccount, formData);
    }

    dispatch({
      type: ActionTypes.updateProfile,
      payload: response!.data.data,
    });

    history.replace('/user/account-settings');
    showAlert(AlertType.Success, 'Account updated successfully');
  });
