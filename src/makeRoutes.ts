import { Component, ReactElement, FC } from 'react';
import * as privatePages from './privatePages';
import * as publicPages from './publicPages';

export const makeAppLink           = (): string => '/app';
export const makeAppHomeLink       = (): string => '/app/home';
export const makeAppPostsLink      = (): string => '/app/posts';
export const makeAppAdvertsLink    = (): string => '/app/adverts';
export const makeAppNeighboursLink = (): string => '/app/neighbours';

export const makeInfoLink          = (): string => '/info';
export const makeInfoSignInLink    = (): string => '/info/sign-in';
export const makeInfoSignUpLink    = (): string => '/info/sign-up';
export const makeInfoICanHelpLink  = (): string => '/info/i-can-help';
export const makeInfoINeedHelpLink = (): string => '/info/i-need-help';

export const makeMyLink          = (): string => '/app/my';
export const makeMyHomeLink      = (): string => '/app/my/home';
export const makeMyAdvertsLink   = (): string => '/app/my/adverts';
export const makeMyNewAdvertLink = (): string => '/app/my/new-advert';
export const makeMyPostsLink     = (): string => '/app/my/posts';
export const makeMyNewPostLink   = (): string => '/app/my/new-post';

export const makeMyArticlesLink    = (): string         => '/app/my/articles';
export const makeMyArticleEditLink = ({ id }: { id: string }): string   => id ? `/app/my/article/${id}` : null;
export const makeArticleLink       = ({ slug }: { slug: string }): string => slug ? `/info/article/${slug}` : null;

export const makeUserProfileLink = ({ username }: { username: string }): string => username ? `/app/user/${username}` : null;
export const makeUserAdvertsLink = ({ username }: { username: string }): string => username ? `/app/user/${username}/adverts` : null;
export const makeUserPostsLink   = ({ username }: { username: string }): string => username ? `/app/user/${username}/posts` : null;

export const makeAdvertLink      = ({ username, slug }: { username: string; slug: string; }): string => username && slug ? `/app/user/${username}/advert/${slug}` : null;
export const makePostLink        = ({ username, slug }: { username: string; slug: string; }): string => username && slug ? `/app/user/${username}/post/${slug}` : null;

export const makeBlogLink = (slug = 'our-story'): string => `https://frenchbench.com/${slug}`;

export interface IRoute {
  path: string;
  component: any; // TODO
  exact?: boolean;
  ssr?: string;
}

export function makeRoutes(): Array<IRoute> {
  return [
    { path: '/app/my/article/:articleId', component: privatePages.AppMyArticleEditPage },
    { path: makeMyArticlesLink(),         component: privatePages.AppMyArticlesPage },
    { path: makeMyAdvertsLink(),          component: privatePages.AppMyAdvertsPage },
    { path: makeMyNewAdvertLink(),        component: privatePages.AppMyNewAdvertPage },
    { path: makeMyPostsLink(),            component: privatePages.AppMyPostsPage },
    { path: makeMyNewPostLink(),          component: privatePages.AppMyNewPostPage },
    { path: makeMyHomeLink(),             component: privatePages.AppMyIndexPage },
    { path: makeMyLink(),                 component: privatePages.AppMyIndexPage, exact: true },

    { path: '/app/user/:username/post/:slug',   component: privatePages.AppUserPostPage },
    { path: '/app/user/:username/posts',        component: privatePages.AppUserPostsPage },
    { path: '/app/user/:username/advert/:slug', component: privatePages.AppUserAdvertPage },
    { path: '/app/user/:username/adverts',      component: privatePages.AppUserAdvertsPage },
    { path: '/app/user/:username',              component: privatePages.AppUserIndexPage },

    { path: '/app/posts/tag/:tag',   component: privatePages.AppPostsByTagPage },
    { path: makeAppPostsLink(),      component: privatePages.AppPostsPage },
    { path: makeAppAdvertsLink(),    component: privatePages.AppAdvertsPage },
    { path: makeAppNeighboursLink(), component: privatePages.AppNeighboursPage },
    { path: makeAppHomeLink(),       component: privatePages.AppIndexPage },
    { path: makeAppLink(),           component: privatePages.AppIndexPage, exact: true },

    { path: '/info/article/:slug',   component: publicPages.InfoArticlePage, ssr: 'InfoArticlePage' },
    { path: makeInfoICanHelpLink(),  component: publicPages.InfoICanHelpPage },
    { path: makeInfoINeedHelpLink(), component: publicPages.InfoINeedHelpPage },
    { path: makeInfoSignInLink(),    component: publicPages.InfoSignInPage },
    { path: makeInfoSignUpLink(),    component: publicPages.InfoSignUpPage },

    { path: makeInfoLink(), component: publicPages.IndexPage, ssr: 'IndexPage', exact: true },
    { path: '/',            component: publicPages.IndexPage, ssr: 'IndexPage', exact: true },
    { path: '*',            component: publicPages.ErrorPage },
  ];
}
