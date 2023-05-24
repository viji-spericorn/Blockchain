import instance from './instance';

export const postdata = (url, data) => instance.post(url, data);
export const getdata = (url) => instance.get(url);
export const editdata = (url, id, data) => instance.patch(`${url}/${id}`, data);
export const getdataById = (url, id) => instance.get(`${url}/${id}`);
export const deleteData = (url, id) => instance.delete(`${url}/${id}`);
export const getDatas = (url, params) => instance.get(url, { params });
export const postDatas = (url, id, data) => instance.post(`${url}/${id}`, data);
// export const getdatas = (url, id, data) => instance.get(`${url}/${id}`, data);
