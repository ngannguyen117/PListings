import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './auth';
import { currentLocationReducer, searchLocationReducer } from './location';
import { btnLoaderReducer } from './loader';
import {
  listingReducer,
  listingsReducer,
  savedListingIdsReducer,
} from './listing';
import { chatroomReducer } from './chatroom';
import { socketReducer } from './socket-io';
import { filtersReducer } from './filters';
import { StoreState } from '../utilities';

export const reducers = combineReducers<StoreState>({
  user: authReducer,
  form: formReducer,
  currentLocation: currentLocationReducer,
  searchedLocations: searchLocationReducer,
  btnLoading: btnLoaderReducer,
  listing: listingReducer,
  listings: listingsReducer,
  savedListingIds: savedListingIdsReducer,
  defaultFilters: filtersReducer,
  sockets: socketReducer,
  chatrooms: chatroomReducer,
});
