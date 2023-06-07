import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

export class AirDto {
  @IsNumber()
  public readonly humidity: number;

  @IsNumber()
  public readonly temp: number;
}

export class SoilDto {
  @IsNumber()
  public readonly moisture: number;

  @IsNumber()
  public readonly temp: number;
}

export class SensorDataDto {
  @Type(() => AirDto)
  @ValidateNested()
  public readonly air: AirDto;

  @Type(() => SoilDto)
  @ValidateNested()
  public readonly soil: SoilDto;

  @IsNumber()
  public readonly liquid: number;
}
