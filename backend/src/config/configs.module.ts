import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './app/app-config.module';
import { AWSConfigModule } from './aws/aws-config.module';
import { DBConfigModule } from './database/db-config.module';
import { FirebaseConfigModule } from './firebase/firebase-config.module';
import { JwtConfigModule } from './jwt/jwt-config.module';
import { LiveKitConfigModule } from './livekit/livekit-config.module';
import { MailConfigModule } from './mail/mail-config.module';
import { MailerSendConfigModule } from './mailer-send/mailer-send-config.module';
import { RedisConfigModule } from './redis/redis-config.module';
import { SegmentConfigModule } from './segment/segment-config.module';
import { ShypChatConfigModule } from './shyp-chat/shyp-chat-config.module';
import { StripeConfigModule } from './stripe/stripe-config.module';
import { TwilioConfigModule } from './twilio/twilio-config.module';
import { WhatsappConfigModule } from './whatsapp/whatsapp-config.module';
import { EasyAppointmentsConfigModule } from '@/config/easy-appointments/easy-appointments-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      cache: true,
    }),
    DBConfigModule,
    RedisConfigModule,
    JwtConfigModule,
    WhatsappConfigModule,
    TwilioConfigModule,
    MailConfigModule,
    EasyAppointmentsConfigModule,
    StripeConfigModule,
    AWSConfigModule,
    SegmentConfigModule,
    FirebaseConfigModule,
    AppConfigModule,
    MailerSendConfigModule,
    LiveKitConfigModule,
    ShypChatConfigModule,
  ],
})
export class ConfigsModule {}
