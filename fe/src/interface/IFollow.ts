export interface IFollow {
    id: number;
    userId: number;
    username: string;
    full_name: string;
    email: string;
    photo_profile: string;
    description: string;
    isFollowed: boolean;
}