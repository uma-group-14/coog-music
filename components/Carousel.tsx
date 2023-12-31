"use client"

import { Album, Track } from "@/types"
import TrackItem from "./TrackItem";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import Image from "next/image";
import axios from 'axios';
import UpdateModal from "./UpdateModal";
import { useState } from "react";


interface CarouselProps {
    tracks: Track[];
    albums: Album[];

}

const Carousel: React.FC<CarouselProps> = ({
    tracks,
    albums

}) => {
    const player = usePlayer();
    const onPlay = useOnPlay(tracks);
    if (tracks.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">No tracks available.</div>
        )
    };


    return (
        <div
            className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5 
                2xl:grid-cols-8 
                gap-4 
                mt-4
              "
        >

            {tracks.map((item) => (


                <TrackItem
                    key={item.track_id}
                    onClick={(id: number) => {

                        onPlay(id);
                        player.setPath(item.track_path);
                        axios.patch(`/api/stream?track_id=${item.track_id}`)
                            .then(() => { })
                            .catch(() => console.log("failed to increment stream"));
                    }}
                    data={item}
                    albums={albums}
                />

            ))}
        </div>
    );
}


export default Carousel