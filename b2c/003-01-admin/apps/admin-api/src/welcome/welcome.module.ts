import { Module } from '@nestjs/common';

import { WelcomeController } from './interface/welcome.controller';

@Module({ controllers: [WelcomeController] })
export class WelcomeModule {}
