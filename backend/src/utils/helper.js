// src/utils/helper.js
import { nanoid } from 'nanoid';

export const generateNanoId = (length = 7) => {
  return nanoid(length);
};