import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/user.entity';
import { UserFriends } from 'src/database/userFriends.entity';
import { Channel } from 'src/database/channel.entity';
import { JwtModule } from '@nestjs/jwt';
import { Notification } from 'src/database/notifications.entity';
import { NotificationsService } from './notifications.service';
@Module({
    imports: [TypeOrmModule.forFeature([User, UserFriends, Notification]),JwtModule.register({
        secret:"0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6", 
        signOptions: { expiresIn: '1h' }, 
      })],
      providers: [NotificationsService],
      exports: [TypeOrmModule]
})
export class NotificationsModule {}