"use client";

import Image from "next/image";

import { Album, Track } from "@/types";
import PlayButton from "./PlayButton";
import AlbumDropdown from "./AlbumDropdown";
import { useUser } from "@/hooks/useUser";


interface TrackItemProps {
    data: Track;
    albums: Album[];
    onClick: (id: number) => void;
}

const TrackItem: React.FC<TrackItemProps> = ({
    data,
    albums,
    onClick
}) => {
    const imagePath = data.track_img_path;
    const user = useUser();
    return (
        <div
            onClick={() => onClick(data.track_id)}
            className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
        >
            <div
                className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
            >
                <Image
                    className="object-cover"
                    src={imagePath || '/images/music-placeholder.png'}
                    fill
                    alt="Image"
                />
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="font-semibold truncate w-full">
                    {data.track_name}
                </p>
                <p
                    className="
            text-neutral-400 
            text-sm 
            pb-2
            w-full 
            truncate
          "
                >
                    By {data.artist_name}
                </p>
                <div
                    className="
            text-neutral-400 
            text-sm 
            pb-2 
            w-full 
            truncate
          "
                >
                </div>
            </div>
            <div
                className="
          absolute 
          bottom-24 
          right-5
        "
            >
                <PlayButton />
            </div>

            {(albums[0] && user.userRole === 'artist' && data.artist_id === user.artistId) ?

                < div
                    className="
            absolute
            bottom-1
            right-1
            "
                >
                    <AlbumDropdown track_id={data.track_id} albums={albums} />

                </div> : null
            }

        </div >
    );
}

export default TrackItem;