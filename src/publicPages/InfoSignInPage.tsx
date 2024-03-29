import { FC, PropsWithChildren, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbLink } from '../components';
import { FbGreatYouHere } from '../content';
import { FbSignInForm } from '../users/FbSignInForm';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';
import { AppPageProps } from '../types';

const defaultPageData = {
  username: '',
  password: '',
  loading: false,
  errorMessage: null,
  successMessage: null,
};

export type InfoSignInPageProps = AppPageProps;

export const InfoSignInPage: FC<InfoSignInPageProps> = (props: PropsWithChildren<InfoSignInPageProps>) => {
  const { api, i18n } = props;
  const history = useHistory();
  
  const currentUserState = useContext(FbCurrentUserContext);

  if (currentUserState.data) { // special case
    history.push('/app'); // user signed in already, let's go to app
  }
  
  const [pageData, setPageData] = useState(defaultPageData);
  const { loading, errorMessage, successMessage } = pageData;

  const onChange = (ev, { name, value }) => {
    setPageData({ ...pageData, [name]: value });
  }
  
  const onSubmit = async (ev) => {
    ev.preventDefault();
    const { username, password } = pageData;
    setPageData({ ...pageData, successMessage: null, errorMessage: null, loading: true });
    
    try {
      const { data = null, error = null } = await api.signin({ username, password });
      if (data) { // success
        const userRes = await api.me();
        if (userRes.data) { // get user details and update context
          currentUserState.setData(userRes.data);
        }
        setPageData({ ...pageData, successMessage: 'success', loading: false });
        history.push('/app');
      } else {
        setPageData({ ...pageData, errorMessage: error, loading: false });
      }
    } catch (err) {
      setPageData({ ...pageData, errorMessage: err.message, loading: false });
    }
  }

  const formProps = {
    i18n,
    onSubmit,
    onChange,
    loading,
    errorMessage,
    successMessage,
  };

  const layoutProps = { title: i18n._('account_sign_in') };
  return (
    <PublicLayout {...layoutProps}>
      <Header as='h2'>
        {i18n._('account_sign_in')}
        <Header.Subheader>
          {i18n._('account_signin_prompt')}
        </Header.Subheader>
      </Header>

      <Grid container>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          
          <Segment>
            <FbSignInForm {...formProps} />
          </Segment>

          <Segment>
            <p>{i18n._('account_if_no_account')}</p>
            <div>
              <FbLink to='/info/sign-up'>
                <Button icon labelPosition='left' secondary type='button'>
                  <Icon name='signup' /> {i18n._('account_sign_up')}
                </Button>
              </FbLink>
            </div>
          </Segment>
          
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbGreatYouHere i18n={i18n} />
        </Grid.Column>
      </Grid>
    </PublicLayout>
  );
}
