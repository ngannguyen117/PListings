import { Dispatch, Action as ReduxAction } from 'redux';
import { FormStateMap } from 'redux-form';

import { ActionTypes } from './action-types';
import { UserDoc, ListingDoc } from '../../server/models';
import { GeoLocation, BaseLocation } from '../../common';

// ACTIONS

// auth
export interface FetchCurrentUserAction {
  type: ActionTypes.fetchCurrentUser;
  payload: UserDoc | null;
}

export interface SignUpAction {
  type: ActionTypes.signUp;
  payload: UserDoc;
}

export interface LogInAction {
  type: ActionTypes.logIn;
  payload: UserDoc;
}

export interface LogOutAction {
  type: ActionTypes.logOut;
  payload: null;
}

export interface UpdateProfileAction {
  type: ActionTypes.updateProfile;
  payload: UserDoc;
}

export interface UpdatePasswordAction {
  type: ActionTypes.updatePassword;
  payload: UserDoc;
}

// Location
export interface GetLocationWithPermissionAction {
  type: ActionTypes.getLocationWithPermission;
  payload: GeoLocation;
}

export interface GetLocationByIPAction {
  type: ActionTypes.getLocationByIP;
  payload: GeoLocation;
}

// Search location
export interface SearchLocationAction {
  type: ActionTypes.searchLocation;
  payload: SearchedLocation[];
}

// Loader
export interface SetBtnLoaderAction {
  type: ActionTypes.setBtnLoader;
  payload: boolean;
}

// Listings
export interface CreateListingAction {
  type: ActionTypes.createListing;
  payload: ListingDoc;
}

export interface FetchListingAction {
  type: ActionTypes.fetchListing;
  payload: ListingDoc;
}

export interface EditListingAction {
  type: ActionTypes.editListing;
  payload: ListingDoc;
}

export interface SaveListingAction {
  type: ActionTypes.saveListing;
  payload: ListingDoc;
}

export interface UnsaveListingAction {
  type: ActionTypes.unsaveListing;
  payload: ListingDoc;
}

export type Action =
  | FetchCurrentUserAction
  | SignUpAction
  | LogOutAction
  | LogInAction
  | UpdateProfileAction
  | UpdatePasswordAction
  | GetLocationWithPermissionAction
  | GetLocationByIPAction
  | SearchLocationAction
  | SetBtnLoaderAction
  | CreateListingAction
  | FetchListingAction
  | EditListingAction
  | SaveListingAction
  | UnsaveListingAction;

// Store State
export interface StoreState {
  user: UserDoc | null;
  listing: ListingDoc | null;
  listingSaved: boolean;
  form: FormStateMap;
  currentLocation: GeoLocation;
  searchedLocations: SearchedLocation[];
  btnLoading: boolean;
}

export interface SearchedLocation {
  fields: BaseLocation & {
    longitude: number;
    latitude: number;
  };
  recordid: string;
}

//
export type FunctionalAction<A extends ReduxAction> = (
  dispatch: Dispatch<A>,
  getState?: () => StoreState
) => Promise<void>;

// FORM
export interface FieldProps {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

interface FormFields extends FieldProps {
  name: string;
}

export interface FormProps<Attrs> {
  onSubmit(formValues: Attrs): void;
  formFields: FormFields[];
  submitBtnText: string;
}

export interface LogInAttrs {
  email: string;
  password: string;
}

export interface SignUpAttrs {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UpdatePasswordAttrs {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}

export interface CombinedLocation extends BaseLocation {
  coordinates?: number[];
  country?: string;
  longitude?: number;
  latitude?: number;
}
export interface UpdateProfileAttrs {
  name: string;
  email: string;
  location: CombinedLocation;
  photo?: string;
  bio?: string;
}

export interface ListingImagesParams {
  newImages: Record<number, File>;
  existingImages?: string[];
  deletedImages?: string[];
}
