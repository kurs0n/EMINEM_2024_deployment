import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET all movies
export async function GET() {
  const movies = db.movies.findMany();
  return NextResponse.json(movies);
}

// POST new movie
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const movie = db.movies.create(body);
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 400 }
    );
  }
} 