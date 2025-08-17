export const ENCRYPT_KEY = process.env.NEXT_PUBLIC_ENCRYPT_KEY || '';
export const IV_HEX = process.env.NEXT_PUBLIC_IV_HEX || '00112233445566778899aabbccddeeff';

export const LS = { THEME: 'theme' };

export const exampleJson = {
  name: 'example name',
  title: 'example title',
  description: 'example description',
  token: {
    decimal: 18,
    symbol: 'ETH',
    name: 'Ethereum',
    img: 'http://example.img.eth',
  },
  metadata: {
    '2025': {
      '1': 'example1',
      '2': 'example2',
    },
    '2024': {
      '1': {
        '1': 1,
        '2': 2,
      },
    },
  },
};
