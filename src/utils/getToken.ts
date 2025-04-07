// utils/getToken.ts
import { NextRequest } from 'next/server';

export const getToken = (request: NextRequest) => {
  return request.cookies.get('token')?.value || '';
};
