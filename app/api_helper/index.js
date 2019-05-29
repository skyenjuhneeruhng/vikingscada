import axios from 'axios';
import qs from 'qs';
import { Observable } from 'rxjs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


export const serialize = (data) => qs.stringify(data);

export const parseQuery = (query) => qs.parse(query, { ignoreQueryPrefix: true });

export const stringifyQuery = (query) => qs.stringify(query, { charset: 'utf-8' });

export const ucFirst = (str) => {
  const entities = ['site', 'manager', 'viewer'];
  const entity = entities.reduce(
    (action, curEntity) => (str.includes(curEntity) ? curEntity : action)
  );

  return entity[0].toUpperCase() + entity.slice(1);
};

export const changeRouts = (str) => {
  if (!str) return str;
  else if (str === 'site' || str === 'manager' || str === 'viewer') {
    return 'company';
  }
  return str;
};


export const handleError = (error) => (
  error.response && error.response.data ?
    Observable.of(`${error.response.data.message}`) :
    Observable.of(`${error}`)
);

export const getCompany = (profile) => {
  const roleType = profile && profile.role && profile.role.type;
  switch (roleType) {
    case 'company':
      return profile.company_admin;
    case 'managers':
      return profile.manager_company;
    case 'viewers':
      return profile.viewer_company;
    default:
      return null;
  }
};

export const downloadFile = (path) => {
  setTimeout(() => {
    const response = {
      file: path
    };
    window.open(response.file);
  }, 100);
};

export const returnUrl = (url) => {
  const arr = url.split('/');
  return arr[arr.length - 1];
};

export const formData = (fields) => {
  const myForm = new FormData();
  Object.keys(fields).forEach((fieldID) => {
    const fieldValue = fields[fieldID];
    if (fieldID === 'company_logo') {
      if (fieldValue !== null) {
        myForm.append(fieldID, fieldValue);
      }
    } else if (typeof fieldValue === 'string') {
      myForm.append(fieldID, fieldValue.trim());
    }
  }
  );
  return myForm;
};
