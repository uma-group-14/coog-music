
import prisma from '@/client'
import { Track } from '@/types';
import { NextRequest } from "next/server";



export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const user_id = searchParams.get('user_id');

    const tracks = await prisma.$queryRaw<Track[]>`
    SELECT liked_tracks.track_id, genre_id, track_name, track_path, track_img_path, artist.artist_id, artist_name 
    FROM liked_tracks, track, artist 
    WHERE track.artist_id = artist.user_id AND track.track_id = liked_tracks.track_id 
    AND liked_tracks.user_id = ${user_id} and track.archive != 1;`
    // console.log(tracks);
    return new Response(JSON.stringify(tracks))

};