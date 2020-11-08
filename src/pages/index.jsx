import React from 'react';
import { Grid } from 'semantic-ui-react';
import { FbCallToAccount, FbCardCommunity, FbCardIdea, PublicLayout } from '../components';
import { apiClient } from '../lib/apiClient';
import { useCurrentUser } from '../lib/useCurrentUser';

// public home page
function PublicIndex(props) {
  const api = apiClient();
  const currentUserState = useCurrentUser(api);
  return (
    <PublicLayout title='Home page' currentUserState={currentUserState}>
      <h2>Welcome</h2>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardCommunity />
        </Grid.Column>
        
        {!currentUserState.data && <Grid.Column mobile={16} tablet={8} computer={8}><FbCallToAccount /></Grid.Column>}

        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardIdea title='Loneliness' keywords='loneliness' idea='No one should be alone in happiness or sadness' />
        </Grid.Column>

      </Grid>
    </PublicLayout>
  );
}

export default PublicIndex;
