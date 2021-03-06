import { Dispatch, Action as ReduxAction } from 'redux';
import { FormStateMap } from 'redux-form';

import { ActionTypes } from './action-types';
import {
  GeoLocation,
  BaseLocation,
  UserDoc,
  ListingDoc,
  MessageDoc,
} from '../../common';

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

export interface ReplaceListingAction {
  type: ActionTypes.replaceListing;
  payload: ListingDoc;
}

export interface ClearListingAction {
  type: ActionTypes.clearListing;
}

export interface FetchListingsAction {
  type: ActionTypes.fetchListings;
  payload: ListingDoc[];
}

export interface ClearListingsAction {
  type: ActionTypes.clearListings;
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

export interface FetchSavedListingIdsAction {
  type: ActionTypes.fetchSavedListingIds;
  payload: Record<string, string>;
}

export interface ClearSavedListingIdsAction {
  type: ActionTypes.clearSavedListingIds;
}

// Filters
export interface SetDefaultFiltersAction {
  type: ActionTypes.setDefaultFilters;
  payload: CombinedLocation;
}

// SOCKETS
export interface AddSocketsAction {
  type: ActionTypes.addSockets;
  payload: Record<string, SocketIOClient.Socket>;
}

// CHAT
export interface FetchChatroomsAction {
  type: ActionTypes.fetchChatrooms;
  payload: Record<string, ChatroomDocClient>;
}

export interface ClearChatroomsAction {
  type: ActionTypes.clearChatrooms;
}

export interface AddNewChatroomAction {
  type: ActionTypes.addNewChatroom;
  payload: ChatroomDocClient;
}

export interface DeleteChatroomAction {
  type: ActionTypes.deleteChatroom;
  payload: string;
}

export interface InsertMessageAction {
  type: ActionTypes.insertMessage;
  payload: MessageDoc;
}

export interface UpdateMessageAction {
  type: ActionTypes.updateMessage;
  payload: MessageDoc;
}

export interface AddUnreadMsgIdAction {
  type: ActionTypes.addUnreadMsgId;
  payload: MessageDoc;
}

export interface ClearUnreadMsgIdsByBuyerAction {
  type: ActionTypes.clearUnreadMsgIdsByBuyer;
  payload: string;
}

export interface ClearUnreadMsgIdsBySellerAction {
  type: ActionTypes.clearUnreadMsgIdsBySeller;
  payload: string;
}

export interface TypingAction {
  type: ActionTypes.typing;
  payload: string;
}

export interface StopTypingAction {
  type: ActionTypes.stopTyping;
  payload: string;
}

export interface UpdateSoldStatusAction {
  type: ActionTypes.updateSoldStatus;
  payload: string;
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
  | ReplaceListingAction
  | ClearListingAction
  | FetchListingsAction
  | ClearListingsAction
  | EditListingAction
  | SaveListingAction
  | UnsaveListingAction
  | FetchSavedListingIdsAction
  | ClearSavedListingIdsAction
  | SetDefaultFiltersAction
  | AddSocketsAction
  | FetchChatroomsAction
  | ClearChatroomsAction
  | AddNewChatroomAction
  | InsertMessageAction
  | UpdateMessageAction
  | DeleteChatroomAction
  | TypingAction
  | StopTypingAction
  | ClearUnreadMsgIdsByBuyerAction
  | ClearUnreadMsgIdsBySellerAction
  | AddUnreadMsgIdAction
  | UpdateSoldStatusAction;

// Store State
export interface StoreState {
  user: UserDoc | null;
  listing: ListingDoc | null;
  listings: ListingDoc[];
  savedListingIds: Record<string, string>;
  form: FormStateMap;
  currentLocation: GeoLocation;
  searchedLocations: SearchedLocation[];
  btnLoading: boolean;
  defaultFilters: FilterAttrs;
  sockets: Record<string, SocketIOClient.Socket>;
  chatrooms: Record<string, ChatroomDocClient>;
}

export interface SearchedLocation {
  fields: BaseLocation & {
    longitude: number;
    latitude: number;
  };
  recordid: string;
}

//
export type FunctionalAction = (
  dispatch: Dispatch,
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

export interface FilterAttrs {
  location: CombinedLocation;
  distance: string;
  sort: string;
  postedWithin: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  subcategory?: string;
  searchTerm?: string;
}

export interface ChatroomDocClient {
  id: string;
  listing: ListingDoc;
  buyer: UserDoc;
  seller: UserDoc;
  messages: Record<string, MessageDoc>;
  lastMessage?: MessageDoc;
  typing: boolean;
  unreadMsgIdsByBuyer: string[];
  unreadMsgIdsBySeller: string[];
}
