import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()
export class UserService {
    private readonly users = [
        {
            id: 1,
            username: 'samuel',
            password: '12345678',
        }
    ];

    async findOne(username: string): Promise<User |undefined> {
        return this.users.find(user => user.username === username);
    }
}