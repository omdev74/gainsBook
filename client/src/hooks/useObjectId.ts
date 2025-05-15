import { useCallback } from 'react';

// Utility to generate a 24-character hex string like MongoDB's ObjectId
const generateObjectId = () => {
  return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const useObjectId = () => {
  const getNewId = useCallback(() => generateObjectId(), []);
  return getNewId;
};
