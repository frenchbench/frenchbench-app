import React from 'react';
import { Card } from 'semantic-ui-react';
import { RandomImage } from './RandomImage';

export function FbCardIdea({ title, keywords, idea }) {
  return (
    <div className='fb-card-idea'>
      <Card>
        <RandomImage keywords={keywords} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>
            <div className='fb-desc-row'>⭐️ {idea}</div>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
