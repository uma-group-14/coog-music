export interface Track {
    track_id: number;
    artist_name: string;
    artist_id: number;
    track_path: string;
    track_name: string;
    created_at?: Date;
    updated_at?: Date;
    stream?: number;
    track_img_path: string

};

export interface User {
    user_id: number;
    user_name: string;
    password: string;
    birth_date: Date;
    join_date: Date;
    email: string;
    race_name: string;
    ethnicity_name: string;
    gender_name: string;


}