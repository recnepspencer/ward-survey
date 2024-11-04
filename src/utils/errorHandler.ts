// src/utils/errorHandler.ts

import { NextResponse } from 'next/server';
import { ValidationError, AuthError } from '@/errors';
import { DuplicateEntryError } from '@/errors/DuplicateEntryError';

/**
 * Centralized error handler function.
 * Maps specific error types to HTTP responses.
 *
 * @param error - The caught error object.
 * @returns A NextResponse with appropriate status and message.
 */
export const errorHandler = (error: unknown): NextResponse => {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 } 
    );
  }

  if (error instanceof AuthError) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 } 
    );
  }

  if (error instanceof DuplicateEntryError) {
    return NextResponse.json(
      { error: error.message },
      { status: 409 } 
    );
  }

  console.error('Unhandled Error:', error);
  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 } 
  );
};
