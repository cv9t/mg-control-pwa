import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, ValidateNested } from 'class-validator';

class AirDataDto {
  @IsNumber()
  public readonly temp: number;

  @IsNumber()
  public readonly humidity: number;
}

class SoilDataDto {
  @IsBoolean()
  public readonly isDry: boolean;
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
