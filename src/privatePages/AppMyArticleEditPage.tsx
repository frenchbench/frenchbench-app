import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbLoadArticleEditor } from '../articles/FbLoadArticleEditor';
import { FbAppMyMenu } from '../menus/FbAppMyMenu';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

export function AppMyArticleEditPage({ appConfig, api, i18n }) {
  const currentUserState = useContext(FbCurrentUserContext);
  const { articleId = '' } = useParams();
  const layoutProps = { appConfig, title: 'Articles', i18n, activeItemOfTopMenu: 'my' };
  const myMenuProps = { activeItem: 'articles', api, currentUserState, i18n };
  const myEditorProps = { api, currentUserState, i18n, articleId };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMyMenu {...myMenuProps} />
      <FbLoadArticleEditor {...myEditorProps} />
    </ProtectedLayout>
  );
}