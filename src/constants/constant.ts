export const APP_ID = '23360d87caa1ec2a';
export const APP_KEY = 'RjYPpRVLNAwjrypvlvlclj6rBtQxmBpT';
const PREFIX = '/api';
export const TEXT_API = PREFIX + '/api';
export const PIC_API = PREFIX + '/ocrtransapi';
export const API_URL = 'https://openapi.youdao.com';
export const code =
{
  '选择源语言': 'error',
  '选择目标语言': 'error',
  '中文': 'zh-CHS',
  '日文': 'ja',
  '英文': 'en',
  '自动检测语言': 'auto',
} as const;
export const decode = Object.fromEntries(Object.entries(code).map(([key, value]) =>
{
  return [value, key];
}));