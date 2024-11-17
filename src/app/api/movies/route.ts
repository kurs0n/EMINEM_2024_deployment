import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Movie } from '@/models/movie';
// GET all movies
export async function GET() {
  try {
    await connectDB();
    const movies = await Movie.find({});
    return NextResponse.json(movies);
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
}

// POST new movie
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const movie = await Movie.create(body);
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error('Failed to create movie:', error);
    return NextResponse.json(
      { error: 'Failed to create movie' },
      { status: 400 }
    );
  }
} 