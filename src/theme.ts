import { DefaultTheme } from 'styled-components'

const colors = {
  purple: '#7D53D6',
  border: '#D9D9D9',
  star: '#FFE600',

  popupBg: '#F2F7F9',
  overlayDesc: '#5A5A5A',

  searchBtn: '#8A8A8A',
  sortBtn: '#969696',
  filterBorder: '#F5F5F5',
  filterBrand: '#8A8A8A',
  checkBox: '#ECECEC',
  checkBoxDesc: '#969696',

  reviewkeywordBg: 'rgba(125, 83, 214, 0.07)',
  reviewKeyword: '#8A8A8A',
  reviewBg: '#F5F5F5',
}

export type ColorsTypes = typeof colors

export const theme: DefaultTheme = {
  colors,
}
