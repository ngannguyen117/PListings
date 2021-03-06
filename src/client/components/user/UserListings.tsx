import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { replaceListing } from '../../actions';
import { UserPageLayout, NavItem } from './UserPageLayout';
import {
  calcDistanceBetweenTwoPoints,
  catchAsync,
  StoreState,
} from '../../utilities';
import { Loader } from '../Modal';
import { ListingCardPublic, ListingCardPrivate } from '../ListingCard';
import {
  MyListingsTypes,
  DEFAULT_MY_LISTINGS,
  UserDoc,
  ApiRoutes,
  ListingDoc,
  SocketIOEvents,
} from '../../../common';

interface UserListingsProps {
  user: UserDoc;

  sockets: Record<string, SocketIOClient.Socket>;
  replaceListing(listing: ListingDoc): void;
}

const _UserListings = (props: UserListingsProps): JSX.Element => {
  useEffect(() => {
    setLoader(true);
    const fetchListings = async () =>
      catchAsync(async () => {
        const { data } = await axios.get(ApiRoutes.MyListings);
        if (data) setListings(data.data);
        setLoader(false);
      })({ clearLoader: () => setLoader(false) });

    fetchListings();
  }, []);

  const [activeListingType, setActiveListingType] = useState(
    MyListingsTypes.Selling
  );
  const [listings, setListings] = useState(DEFAULT_MY_LISTINGS);
  const [loader, setLoader] = useState(false);

  const removeListing = (index: number, listingType: MyListingsTypes): void => {
    setListings({
      ...listings,
      [listingType]: listings[listingType].filter((l, i) => i !== index),
    });
  };

  const markAsSold = async (index: number): Promise<void> =>
    catchAsync(async () => {
      const selling = listings[MyListingsTypes.Selling];

      const { data } = await axios.patch(
        `${ApiRoutes.ListingMarkedAsSold}/${selling[index].id}`
      );

      setListings({
        ...listings,
        [MyListingsTypes.Selling]: selling.filter((l, i) => i !== index),
        [MyListingsTypes.Sold]: [data.data, ...listings[MyListingsTypes.Sold]],
      });

      props.sockets[`/${selling[index].id}`].emit(SocketIOEvents.ListingSold);
    })({
      msg:
        'Having issue with marking this listing as sold. Please try again later.',
    });

  const renewListing = async (
    index: number,
    listingType: MyListingsTypes
  ): Promise<void> =>
    catchAsync(async () => {
      const { data } = await axios.patch(
        `${ApiRoutes.ListingRenew}/${listings[listingType][index].id}`
      );

      setListings({
        ...listings,
        [listingType]: listings[listingType].filter((l, i) => i !== index),
        [MyListingsTypes.Selling]: [
          data.data,
          ...listings[MyListingsTypes.Selling],
        ],
      });
    })({
      msg: 'Having issue with renewing your listing. Please try again later.',
    });

  const renderListings = (): JSX.Element => {
    let element: JSX.Element[] = [];

    switch (activeListingType) {
      case MyListingsTypes.Saved:
        element = listings[MyListingsTypes.Saved].map(listing => {
          const [lng2, lat2] = listing.location.coordinates;
          const [lng1, lat1] = props.user.location.coordinates;
          return (
            <ListingCardPublic
              key={listing.id}
              listing={listing}
              saved
              clickable
              distanceDiff={calcDistanceBetweenTwoPoints(
                lat1,
                lng1,
                lat2,
                lng2
              )}
              replaceListing={() => props.replaceListing(listing)}
            />
          );
        });
        break;
      case MyListingsTypes.Selling:
        element = listings[MyListingsTypes.Selling].map((listing, i) => {
          return (
            <ListingCardPrivate
              key={listing.id}
              listing={listing}
              onDelete={() => removeListing(i, MyListingsTypes.Selling)}
              btnText="Mark as Sold"
              btnAction={() => markAsSold(i)}
              showEditBtn
              replaceListing={() => props.replaceListing(listing)}
            />
          );
        });
        break;
      case MyListingsTypes.Expired:
        element = listings[MyListingsTypes.Expired].map((listing, i) => {
          return (
            <ListingCardPrivate
              key={listing.id}
              listing={listing}
              onDelete={() => removeListing(i, MyListingsTypes.Expired)}
              btnText="Renew Listing"
              btnAction={() => renewListing(i, MyListingsTypes.Expired)}
              replaceListing={() => props.replaceListing(listing)}
            />
          );
        });
        break;
      case MyListingsTypes.Sold:
        element = listings[MyListingsTypes.Sold].map((listing, i) => {
          return (
            <ListingCardPrivate
              key={listing.id}
              listing={listing}
              onDelete={() => removeListing(i, MyListingsTypes.Sold)}
              btnText="Sell Item Again"
              btnAction={() => renewListing(i, MyListingsTypes.Sold)}
              replaceListing={() => props.replaceListing(listing)}
            />
          );
        });
        break;
    }

    return <div className="listings">{element}</div>;
  };

  const renderHeader = (): JSX.Element => (
    <h2 className="heading-primary">My Listings</h2>
  );

  const navList: Record<MyListingsTypes, NavItem> = {
    [MyListingsTypes.Selling]: {
      name: 'Selling',
      onClick: () => setActiveListingType(MyListingsTypes.Selling),
    },
    [MyListingsTypes.Saved]: {
      name: 'Saved',
      onClick: () => setActiveListingType(MyListingsTypes.Saved),
    },
    [MyListingsTypes.Expired]: {
      name: 'Expired',
      onClick: () => setActiveListingType(MyListingsTypes.Expired),
    },
    [MyListingsTypes.Sold]: {
      name: 'Sold',
      onClick: () => setActiveListingType(MyListingsTypes.Sold),
    },
  };

  return (
    <>
      <UserPageLayout
        header={renderHeader()}
        body={renderListings()}
        navList={navList}
        active={MyListingsTypes.Selling}
      />
      {loader && <Loader />}
    </>
  );
};

const mapStateToProps = (state: StoreState) => {
  return { sockets: state.sockets };
};

export const UserListings = connect(mapStateToProps, { replaceListing })(
  _UserListings
);
