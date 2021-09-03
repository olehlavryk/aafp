import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { AccountLoader } from 'src/components/Loaders/AccountLoader/AccountLoader';
import { setLoading } from 'src/store/actions';
import { loadingSelector, ordersSelector, favoritesdSelector } from 'src/store/selectors';
import { getOrders, setOrders, getFavorites, setFavorites } from "src/store/actions";
import { UserAccountForm } from '../Form/UserAccountForm/UserAccountForm';
import { UserChangePasswordForm } from '../Form/UserChangePasswordForm/UserChangePasswordForm';
import { FavoritesGrid } from '../FavoritesGrid/FavoritesGrid';
import { OrdersGrid } from '../OrdersGrid/OrdersGrid';
import "./UserStatistics.css"

export const UserStatistics = ({ user }) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const orders = useSelector(ordersSelector);
  const favorites = useSelector(favoritesdSelector);


  useEffect(async () => {
    dispatch(setLoading(true));

    if (!orders.length) {
      const ordersRequest = await dispatch(getOrders());
      dispatch(setOrders(ordersRequest.data));
    }

    if (!favorites.length) {
      const favoritesRequest = await dispatch(getFavorites());
      dispatch(setFavorites(favoritesRequest.data));
    }

    dispatch(setLoading(false));
  }, []);

  if (loading) {
    return (
      <AccountLoader />
    )
  }

  // content
  let initials = user.fullName.match(/\b\w/g) || [];
  initials = (
    (initials.shift() || '') + (initials.pop() || '')
  ).toUpperCase();

  return (
    <>
      {/* User Avatar */}
      <div className="user_avatar_block">
        <div className="user_without_avatar">{initials}</div>
      </div>

      {/* User Full Name */}
      <div className="user_name">{user.fullName}</div>

      {/* User Tabs */}
      <Tabs defaultIndex={0}>
        <TabList className="tabs_header">
          <Tab className="tab_item" selectedClassName="active">
            <div className="tab_title">
              Edit Account
            </div>
          </Tab>
          <Tab className="tab_item" selectedClassName="active">
            <div className="tab_title">
              Orders History
            </div>
          </Tab>
          <Tab
            className="tab_item"
            selectedClassName="active"
          >
            <div className="tab_title">
              Favourites
            </div>
          </Tab>
        </TabList>

        <TabPanel>
          <div className="tab_panel_content narrow-pannel">
            <div className="account_form_title">
              Main information
            </div>
            <UserAccountForm user={user} />
            <div className="account_form_title">
              Change password
            </div>
            <UserChangePasswordForm />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tab_panel_content narrow-pannel">
            <OrdersGrid orders={orders} />

          </div>
        </TabPanel>
        <TabPanel>
          <div className="tab_panel_content">
            {favorites && (
              <FavoritesGrid favorites={favorites} />
            )}
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};
