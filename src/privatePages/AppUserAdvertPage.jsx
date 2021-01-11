import React from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppUserMenu } from '../menus/FbAppUserMenu';
import { FbLoadUserAdvert } from '../adverts/FbLoadUserAdvert';
import { useUser } from '../hooks/useUser';

export function AppUserAdvertPage({ appConfig, api, i18n }) {
  const { username, advert_ref } = useParams();
  const userState = useUser(api, username);
  const layoutProps = { appConfig, title: 'Adverts', i18n };
  const userMenuProps = { username, activeItem: 'adverts', api, userState, i18n };
  const advertProps = { username, advert_ref, api, userState, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppUserMenu {...userMenuProps} />
      <FbLoadUserAdvert {...advertProps} />
    </ProtectedLayout>
  );
}
