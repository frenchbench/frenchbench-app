import React from 'react';
import { formatDistance } from 'date-fns';
import { Card, Image, Label } from 'semantic-ui-react';
import { randomImgSrc } from '../utils/randomImgSrc';
import { makeAdvertLink } from '../makeRoutes';
import { makeHashTagList } from '../utils/makeHashTagList';
import { FbHashTagLinkList, FbLink } from '../components';
import { FbAssetImage } from '../assets/FbAssetImage';

export function FbAdvertListItem({ id, title, tags, created_at, username, advert_ref, is_buying, price, currency, assets = [] }) {
  const dt = formatDistance(new Date(created_at), new Date());
  const tagArr = makeHashTagList(tags);
  const tag0 = tagArr[0];
  const keywords = tag0 !== '' ? tag0 : 'community';
  const avatarSrc = randomImgSrc('silhouette', 96, 96);
  const link = makeAdvertLink({ username, advert_ref });
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  const priceInfo = is_buying ? 'GIVING' : 'ASKING';
  return (
    <div className='fb-advert-list-item'>
      <Card>
        <Card.Content>
          <FbLink to={`/app/user/${username}`}><Image floated='right' size='mini' src={avatarSrc} /></FbLink>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{username} advertised {dt} ago (123 views)</Card.Meta>
          <Card.Description>
            <FbLink to={link}>
              <div>
                <FbAssetImage asset={asset0info} keywords={keywords} link={link} w={240} h={240} wrapped={false} label={null} />
                <Label color='green' ribbon='right'>{priceInfo} {price} {currency}</Label>
              </div>
            </FbLink>
          </Card.Description>
          <Card.Description extra>
            <FbHashTagLinkList tags={tags} />
          </Card.Description>
        </Card.Content>
      </Card>

    </div>
  );
}