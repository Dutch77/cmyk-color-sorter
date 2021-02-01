import {getCurrentInstance} from 'vue';


export default function () {
  const instance = getCurrentInstance();
  // @ts-ignore wtf
  return instance.proxy.$context;
};
