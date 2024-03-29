import { ElementType, FC, PropsWithChildren, ReactNode } from 'react';
import { formatDistance } from 'date-fns';
import { Card, Label } from 'semantic-ui-react';
import { makeAdvertLink } from '../makeRoutes';
import { FbLink } from '../components';
import { FbAssetImage } from '../assets/FbAssetImage';
import { AdvertSummaryModel } from '../utils';
import { FbPropsWithApiAndI18n } from '../types';

export interface FbAdvertSummaryProps extends FbPropsWithApiAndI18n {
  advert: AdvertSummaryModel;
  keywords?: string | null;
  summary?: string | ElementType | ReactNode | null;
}

export const FbAdvertSummary: FC<FbAdvertSummaryProps> = (props: PropsWithChildren<FbAdvertSummaryProps>) => {
  const { api, i18n, advert, summary, keywords } = props;
  const { id, title, price, currency, is_buying, is_service, created_at, username, slug, assets = [] } = advert;
  const dt = formatDistance(new Date(created_at), new Date());
  const link = makeAdvertLink({ username, slug });
  const asset0 = assets[0] ?? null;
  const asset0info = asset0?.asset ?? null;
  const buyingOption = api.buyingOptionList(i18n).find(({ id }) => id == is_buying);
  const serviceOption = api.serviceOptionList(i18n).find(({ id }) => id == is_service);
  return (
    <div className='fb-advert-summary'>
      <Card fluid>
        <FbLink to={link}><FbAssetImage asset={asset0info} keywords={keywords} w={240} h={240} /></FbLink>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta><span className='date'>{dt} ago</span></Card.Meta>
          {summary && <Card.Description>{summary}</Card.Description>}
          <Card.Description extra>
            <Label color='green' ribbon='right'>{price} {currency}</Label>
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
