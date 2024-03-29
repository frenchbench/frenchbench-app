import { Card, Label } from 'semantic-ui-react';
import TextLoop from 'react-text-loop';
import ReactChildrenAnimated from 'react-children-animated';
import { FbRandomImage } from '../components';
import { localeCodeEn, localeCodeTr } from '../utils/i18n';

export function FbCardCommunity({ i18n }) {
  return (
    <div className='fb-card-community'>
      <Card fluid>
        <FbRandomImage keywords='community' preferName='001.jpg' />
        {content[i18n._code]}
      </Card>
    </div>
  );
}

const content = {
  [localeCodeEn]: (
    <Card.Content>
      <Card.Header>FrenchBench Communities</Card.Header>
      <Card.Description>
        <div className='fb-desc-row'>⭐️ relevant and <Label as='span' color='red' size='small'>local</Label></div>
        <div className='fb-desc-row'>
          <span>⭐️ keep helping with your&nbsp;</span>
          <TextLoop>
            <span><Label as='span' size='small' color='orange'>time</Label></span>
            <span><Label as='span' size='small' color='yellow'>knowledge</Label></span>
            <span><Label as='span' size='small' color='green'>products</Label></span>
            <span><Label as='span' size='small' color='blue'>services</Label></span>
          </TextLoop>
        </div>
        <div className='fb-desc-row'>⭐️ find/receive help in your<Label as='span' color='violet' size='small'>neighbourhood</Label></div>
        <div className='fb-desc-row'>⭐️ happy <Label as='span' size='small' color='olive'>exchanging</Label></div>
        <div>
          {/* TODO: replace TextLoop after adding animation to slide up/down etc.
          <ReactChildrenAnimated delay={5000}>
            <span><Label as='span' size='small' color='orange'>time</Label></span>
            <span><Label as='span' size='small' color='yellow'>knowledge</Label></span>
            <span><Label as='span' size='small' color='green'>products</Label></span>
            <span><Label as='span' size='small' color='blue'>services</Label></span>
          </ReactChildrenAnimated>
          */}
        </div>
      </Card.Description>
    </Card.Content>
  ),
  [localeCodeTr]: (
    <Card.Content>
      <Card.Header>FrenchBench Communities</Card.Header>
      <Card.Description>
        <div className='fb-desc-row'>⭐️ alakalı ve <Label as='span' color='red' size='small'>yakında</Label></div>
        <div className='fb-desc-row'>
          <span>⭐️ yardıma devam&nbsp;</span>
          <TextLoop>
            <span><Label as='span' size='small' color='orange'>zamanın</Label></span>
            <span><Label as='span' size='small' color='yellow'>bilgin</Label></span>
            <span><Label as='span' size='small' color='green'>ürünlerin</Label></span>
            <span><Label as='span' size='small' color='blue'>hizmetlerin</Label></span>
          </TextLoop>
          <span> ile</span>
        </div>
        <div className='fb-desc-row'>⭐️ aradığını<Label as='span' color='violet' size='small'>mahallende</Label> bul</div>
        <div className='fb-desc-row'>⭐️ mutlu <Label as='span' size='small' color='olive'>pazarlıklar</Label></div>
      </Card.Description>
    </Card.Content>
  ),
}
