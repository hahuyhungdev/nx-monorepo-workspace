import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserManagementController {
  @Get()
  listUsers() {
    return {
      data: [
        { id: '1', name: 'Alice', email: 'alice@example.com', role: 'admin' },
        { id: '2', name: 'Bob', email: 'bob@example.com', role: 'member' },
      ],
      message: 'Users fetched',
      success: true,
    };
  }
}
