import { FC, PropsWithChildren } from 'react';
import { ProtectedLayout } from '../layouts/ProtectedLayout';
import { FbAppMenu } from '../menus/FbAppMenu';
import { FbPostSearch } from '../posts/FbPostSearch';
import { AppPageProps } from '../types';

export type AppPostsPageProps = AppPageProps;

export const AppPostsPage: FC<AppPostsPageProps> = (props: PropsWithChildren<AppPostsPageProps>) => {
  const { appConfig, api, i18n } = props;
  const layoutProps = { appConfig, title: 'Posts', containerClassName: 'fb-page-app-posts' };
  const myMenuProps = { activeItem: 'posts', api, i18n };
  const searchProps = { api, i18n };
  return (
    <ProtectedLayout {...layoutProps}>
      <FbAppMenu {...myMenuProps} />
      <div className='fb-content'>
        <FbPostSearch {...searchProps} />
      </div>
    </ProtectedLayout>
  );
}
