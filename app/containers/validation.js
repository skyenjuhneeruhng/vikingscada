
// import { createNumberMask, createTextMask } from 'redux-form-input-masks';
import { createTextMask } from 'redux-form-input-masks';

const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

export const required = (value) => (
  value || typeof value === 'number' ? undefined : 'Required'
);

export const email = (value) => (
  value && !expression.test(String(value).toLowerCase()) ?
    'Invalid email address' :
    undefined
);

export const number = (value) => (
  value && Number.isNaN(Number(value)) ? 'Must be a number' : undefined
);

export const posNumber = (value) => (
  value && value <= 0 ? 'Must be more than zero' : undefined
);

export const posNumberWithZero = (value) => (
  value && value < 0 ? 'Must be a positive number' : undefined
);

export const phoneNumber = (value) => (
  value && value.toString().length !== 10 ?
    'Invalid phone number' :
    undefined
);

export const price = (value) => (
  value && !/^\d{1,9}(\.\d{1,2})*$/.test(value) ?
    'Invalid price' :
    undefined
);

export const equals = (fieldName) => (value, values) => {
  const compareValue = values[fieldName];
  return value && value === compareValue ?
    undefined :
    'Confirm password should be the same as password';
};

export const equalsValue = (compareValue, message) => (value) => (
  value && value === compareValue ?
    undefined :
    message
);

export const moreValue = (fieldName, message) => (value, values) => {
  const compareValue = values[fieldName];
  return (
    value && value > +compareValue ?
      undefined :
      message
  );
};

export const lessValue = (fieldName, message) => (value, values) => {
  const compareValue = values[fieldName];
  return (
    value && +value < +compareValue ?
      undefined :
      message
  );
};

export const zipCode = (value) => (
  value && !/^\d{5}(?:[-\s]\d{4})?$/.test(value) ?
    'Invalid zip code' :
    undefined
);

export const password = (value) => (
  value && value.length < 8 ? 'Should be at least 8 symbols' : undefined
);

export const minLength = (min, msg) => (value) => (
  value && value.length < min ? msg : undefined
);

export const minValue = (min, msg) => (value) => (
  value && value < min ? msg : undefined
);

export const inRange = (range, msg) => (value) => {
  const [min, max] = range;
  return value && (+value < min || +value > max) ? msg : undefined;
};

export const onlySpaces = (value) => (
  value && !/\S/.test(value) ? 'Field can not consist only with spaces.' : undefined
);

export const bitMask = (value) => (
  value && !/[0-9]{1,2}([,][0-9]{1,2})*$/.test(value) ?
    'Invalid Bit mask' :
    undefined
);

export const requiredValue = (fieldName, message) => (value, values) => {
  const compareValue = values[fieldName];
  console.log(typeof compareValue !== 'undefined' && compareValue !== null && compareValue !== '');
  if (typeof compareValue !== 'undefined' && compareValue !== null && compareValue !== '') {
    if (typeof value !== 'undefined' && value !== null && value !== '') {
      return undefined;
    }
    return message;
  }
  return undefined;
};

export const isMoreValue = (fieldName, message) => (value, values) => {
  const compareValue = values[fieldName];
  if (compareValue && value) {
    return (
      value > +compareValue ?
        undefined :
        message
    );
  }
  return undefined;
};

// mask

export const phoneMask = createTextMask({
  pattern: '+1 (999) 999-9999'
});
