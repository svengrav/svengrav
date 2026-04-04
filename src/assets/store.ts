export const BASE_STORE = 'https://stsvengrav.blob.core.windows.net/stsvengrav'

export const resolveStoreUrl = (src: string): string =>
  src.startsWith('http') ? src : `${BASE_STORE}${src}`
