"use client"
import Header from "@/components/Header";
import UserDetails from "@/components/UserDetails";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Playlist, SuperUser, User } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft } from "react-icons/rx"
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";
import AlbumTracks from "@/components/AlbumTracks";


export default function TracksPage() {
    const user = useUser();
    const player = usePlayer();
    const router = useRouter();

    const [isFollowing, setIsFollowing] = useState(false);
    const [streamCount, setStreamCount] = useState(0);
    const [followers, setFollowers] = useState<SuperUser[]>();


    //test if track has been liked already
    //get request
    useEffect(() => {
        //get streams


    }, [])


    return (

        <div
            className={twMerge(`
            h-fit 
        bg-gradient-to-b 
        from-indigo-800 to-30%
        p-6
          `,
                player.activeId && 'h-[calc(100%-80px)]'
            )}
        >
            <div className="w-full h-full mb-4 flex-col items-center">

                <button
                    onClick={() => router.back()}
                    className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                >
                    <RxCaretLeft className="text-white" size={35} />
                </button>
                <div className="text-center mb-10">

                    <div className="text-6xl font-bold gap-2 justify-center flex flex-row mb-2">

                        {user.activeAlbum.album_name}

                    </div>
                    Created on: {user.activeAlbum.album_created_at.toString().substring(0, 10)}




                </div>


                <AlbumTracks album_id={user.activeAlbum.album_id} />

            </div >

        </div >
    )
}