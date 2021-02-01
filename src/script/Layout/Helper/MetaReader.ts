import {find} from 'lodash-es';

export const readMeta = (name: string): string | null => {
  const metas = document.getElementsByTagName('meta');
  const exactMeta: HTMLMetaElement = find(metas, (meta: HTMLMetaElement) =>
    meta.getAttribute('name') === name,
  );

  return exactMeta ? exactMeta.getAttribute('content') : null;
};
