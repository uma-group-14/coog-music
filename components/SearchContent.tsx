"use client"
import { Playlist, Track } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import usePlayer from "@/hooks/usePlayer";
import useOnPlay from "@/hooks/useOnPlay";
import PlaylistDropdown from "./PlaylistDropdown";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";



interface SearchContentProps {
    tracks: Track[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    tracks
}) => {

    const onPlay = useOnPlay(tracks);
    const player = usePlayer();
    const user = useUser();
    const [playlists, setPlaylists] = useState<Playlist[]>();

    useEffect(() => {

        if (user.userRole === 'listener') {
            //get playList or albumId's

            axios.get<Playlist[]>(`/api/playlist?listener_id=${user.listenerId}`)
                .then(response => {


                    if (response.data) {
                        setPlaylists(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })

        }

    }, [user.userId, user.listenerId, user.userRole])





    if (tracks.length === 0) {
        return (
            <div
                className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
            >
                No tracks found.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6 z-0">
            {tracks.map((track: Track) => (
                <div
                    key={track.track_id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem
                            onClick={(id: number) => { onPlay(id); player.setPath(track.track_path) }}
                            data={track}
                        />
                    </div>
                    {(user.userRole === "listener" && playlists) ? <PlaylistDropdown playlists={playlists} track_id={track.track_id} /> : null}
                    {(user.userRole === 'admin') ?
                        <div className="flex flex-row">
                            <UpdateButton id={track.track_id} name={track.track_name} type={"track"} genre={track.genre_id} />

                            <DeleteButton type={"track"} id={track.track_id} name={track.track_name} />

                        </div>
                        : <LikeButton trackId={track.track_id} />}

                </div>
            ))}
        </div>
    );
}

export default SearchContent;