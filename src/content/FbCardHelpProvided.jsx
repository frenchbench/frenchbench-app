import React from 'react';
import { Card } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import { RandomImage } from '../components';

export function FbCardHelpProvided({ i18n }) {
  return (
    <div className='fb-card-help-provided'>
      <Card fluid>
        <RandomImage keywords='community,help,doctor,nurse,teacher,barber,electrician,cook,handyman' />
        <Card.Content>
          <Card.Header>I Can Help</Card.Header>
          <Card.Description>
            <div>
              <span>⭐️ I am &nbsp;</span>
              <TextLoop>
                <span>a doctor</span>
                <span>a nurse</span>
                <span>a teacher</span>
                <span>a gardener</span>
                <span>a cleaner</span>
                <span>a barber</span>
                <span>an electrician</span>
                <span>a handyman</span>
                <span>a cook</span>
                <span>selling a bicycle</span>
                <span>selling a lawn mower</span>
                <span>renting a generator</span>
              </TextLoop>
              <span>&nbsp;.</span>
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}