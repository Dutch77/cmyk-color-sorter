import {merge} from 'lodash-es';

const globalTranslations = {
};

const createTranslations = (...translations) => {
  return merge(
    globalTranslations,
    ...translations,
  );
};

export default createTranslations;
