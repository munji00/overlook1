import User from './user.entity';
export default class UserActivity {
    id: number;
    friId: number;
    fraId: number;
    fri: User;
    fra: User;
    isAccepted: boolean;
}
