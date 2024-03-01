import User from './user.entity';
export default class UserActivity {
    id: number;
    friId: number;
    fraId: number;
    createdAt: Date;
    fri: User;
    fra: User;
    isAccepted: boolean;
}
