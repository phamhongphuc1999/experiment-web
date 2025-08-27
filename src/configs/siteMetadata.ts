import IconImg from 'public/star.svg';
import ThumbImg from 'public/thumbnail.webp';
import { PageMetadataType } from 'src/global';
import { APP_NAME } from './constance';

export const siteMetadata: PageMetadataType = {
  title: APP_NAME,
  description: 'I will deploy some app to domain.',
  url: 'https://experiment.peter-present.xyz/',
  siteName: APP_NAME,
  twitterHandle: 'PhamHon08928762',
  icon: IconImg.src,
  image: ThumbImg.src,
  keywords: '',
};
