
import prisma from '@/client'
import { User } from '@/types';
import { NextRequest } from "next/server";


//UNFINISHED
//change name to specify race demographics
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const artist_id = searchParams.get('artist_id');
    const query = `${artist_id}`;
    const race = await prisma.$queryRaw<User[]>`
        SELECT ethnicity_name, COUNT(*) AS Total , ROUND(((COUNT(*) / (SELECT COUNT(*)
                                                            FROM artist as A, ethnicity as E, user as U, listener_follows_artists as LFA, listener as L
                                                            WHERE A.artist_email = ${query} AND LFA.artist_id = A.artist_id AND U.user_id = L.user_id AND LFA.listener_id = L.listener_id AND U.ethnicity_id = E.ethnicity_id)) * 100),1) AS PERCENT
        FROM artist as A, ethnicity as E, user as U, listener_follows_artists as LFA, listener as L
        WHERE A.artist_email = ${query} AND LFA.artist_id = A.artist_id AND U.user_id = L.user_id AND LFA.listener_id = L.listener_id AND U.ethnicity_id = E.ethnicity_id AND U.archive = 0
        GROUP BY ethnicity_name;`;
    const result = JSON.parse(JSON.stringify(race, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
    return new Response(JSON.stringify(result));
};