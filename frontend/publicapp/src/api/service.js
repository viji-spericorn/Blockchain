import instance from './instance';

export const postdata = (url, data) => instance.post(url, data);
export const getdata = (url) => instance.get(url);
