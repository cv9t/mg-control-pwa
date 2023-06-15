import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';

class AirDataDto {
  @IsNumber()
  public readonly temp: number;
}

class SoilDataDto {
  @IsNumber()
  public readonly moisture: number;

  @IsNumber()
  public readonly temp: number;
}

export class DeviceDataDto {
  @Type(() => AirDataDto)
  @ValidateNested()
  public readonly air: AirDataDto;

  @Type(() => SoilDataDto)
  @ValidateNested()
  public readonly soil: SoilDataDto;

  @IsBoolean()
  public readonly isLightOn: boolean;
}
