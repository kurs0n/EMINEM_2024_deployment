import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET single movie
export async function GET(request: Request, { params }: RouteParams) {
  const movie = db.movies.findUnique(params.id);
  
  if (!movie) {
    return NextResponse.json(
      { error: 'Movie not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(movie);
}

// PUT/UPDATE movie
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const movie = db.movies.update(params.id, body);
    
    if (!movie) {
      return NextResponse.json(
        { error: 'Movie not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update movie' },
      { status: 400 }
    );
  }
}

// DELETE movie
export async function DELETE(request: Request, { params }: RouteParams) {
  const movie = db.movies.delete(params.id);
  
  if (!movie) {
    return NextResponse.json(
      { error: 'Movie not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(movie);
} 