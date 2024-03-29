import { FbImageLoader, FbImageLoaderProps } from '../components';
import { randomImg } from '../utils/randomImg';
import { assetImgSrc, AssetWithUrl } from '../utils/assetImgSrc';

export interface FbAssetImageProps extends FbImageLoaderProps {
  asset?: AssetWithUrl | null;
  keywords?: string | null;
}

export function FbAssetImage({ asset = null, keywords = '', w = 320, h = 240, ...overrides }) {
  let src, alt;
  if (asset) {
    src = assetImgSrc(asset, 'small');
  } else {
    const img = randomImg(keywords, 'small');
    src = img.src;
    alt = img.info;
  }
  const imgProps = {
    src,
    alt,
    ui: false,
    label: { as: 'span', corner: 'left', icon: 'heart', color: 'purple' },
    wrapped: true,
    ...overrides,
  };
  return <FbImageLoader imgProps={imgProps} w={w} h={h} />;
}
