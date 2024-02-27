import UserActivity from "./userActivity.entity";
import UserAssets from "./userAssets.entity";
import UserProfile from "./userProfile.entity";
export default class User {
    id: number;
    userName: string;
    password: string;
    hashedPassword(): Promise<void>;
    mobileNumber: number;
    profile: UserProfile;
    assets: UserAssets;
    fri: UserActivity[];
    fra: UserActivity[];
}
