import { Injectable } from '@nestjs/common';

import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class DbConfig {
  @IsString()
  public readonly host: string;

  @IsNumber()
  public readonly port: number;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly username: string;

  @IsString()
  public readonly password: string;
}

class JwtConfig {
  @IsString()
  public readonly access_secret: string;

  @IsString()
  public readonly refresh_secret: string;
}

class MqttConfig {
  @IsString()
  public readonly broker_url: string;

  @IsString()
  public readonly primary_topic: string;
}

class FrontendConfig {
  @IsString()
  public readonly url: string;

  @IsString()
  public readonly domain: string;
}

@Injectable()
export class Config {
  @IsNumber()
  public readonly port: number;

  @Type(() => DbConfig)
  @ValidateNested()
  public readonly db: DbConfig;

  @Type(() => JwtConfig)
  @ValidateNested()
  public readonly jwt: JwtConfig;

  @Type(() => MqttConfig)
  @ValidateNested()
  public readonly mqtt: MqttConfig;

  @Type(() => FrontendConfig)
  @ValidateNested()
  public readonly frontend: FrontendConfig;
}
