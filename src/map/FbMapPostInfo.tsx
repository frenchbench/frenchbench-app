import { FC, PropsWithChildren } from 'react';
import { PostSummaryModel } from '../utils/apiClient';

export interface FbMapPostInfoProps {
  post: PostSummaryModel;
}

export const FbMapPostInfo: FC<FbMapPostInfoProps> = (props: PropsWithChildren<FbMapPostInfoProps>) => {
  const { post: { title, assets } } = props;
  const displayName = `${title}`;
  const asset0 = assets[0].asset;
  return (
    <div>
      <div>
        {displayName} |{' '}
        <a
          target="_new"
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}
        >
          Wikipedia
        </a>
      </div>
      {asset0 && <img width={240} src={asset0.url} alt='info here' />}
    </div>
  );
}
