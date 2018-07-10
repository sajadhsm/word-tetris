import Vue from 'vue';

/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

const englishNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const persianNumbers = ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۰'];

Vue.filter('toPersianNum', (value) => {
  if (!value && value !== 0) return;

  value = value.toString();

  for (let i = 0, numbersLen = englishNumbers.length; i < numbersLen; i += 1) {
    value = value.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
  }

  return value;
});
