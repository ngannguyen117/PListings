export enum ActionTypes {
  // auth
  fetchCurrentUser,
  signUp,
  logOut,
  logIn,
  updateProfile,
  updatePassword,

  // location
  getLocationWithPermission,
  getLocationByIP,

  // search for matching locations from opendata soft - US Zip Code Latitude and Longitude
  searchLocation,

  // loader
  setBtnLoader,

  // listings
  replaceListing,
  clearListing,
  fetchListings,
  clearListings,
  createListing,
  editListing,
  saveListing,
  unsaveListing,
  fetchSavedListingIds,
  clearSavedListingIds,
  updateSoldStatus,

  // listings filters
  setDefaultFilters,

  // socket-io
  addSockets,

  // chatrooms
  fetchChatrooms,
  clearChatrooms,
  addNewChatroom,
  deleteChatroom,
  insertMessage,
  updateMessage,
  addUnreadMsgId,
  clearUnreadMsgIdsByBuyer,
  clearUnreadMsgIdsBySeller,
  typing,
  stopTyping,
}
