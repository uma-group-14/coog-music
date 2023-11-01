"use client";

import { PrismaClient } from "@prisma/client";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import Carousel from "./Carousel";

const LikedTracks = () => {
  const user = useUser();
  const router = useRouter();

  const [likedTracks, setLikedTracks] = useState<Track[]>();
  //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]

  //consume likedTracks api endpoint
  useEffect(() => {
    axios
      .get<Track[]>(`/api/likedTracks?user_id=${user.userId}`)
      .then((response) => {
        if (response.data) {
          setLikedTracks(response.data);
        }
      })
      .catch((error) => {
        alert("error fetching data");
      });
  }, [user.userId]);

  return (
    <div>
      Liked Tracks
      {likedTracks ? <Carousel tracks={likedTracks} /> : null}
    </div>
  );
};

export default LikedTracks;
