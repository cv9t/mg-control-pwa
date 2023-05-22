import { Type } from "class-transformer";
import { IsNumber, ValidateNested } from "class-validator";

class Air {
  @IsNumber()
  public readonly humidity: number;

  @IsNumber()
  public readonly temp: number;
}

class Soil {
  @IsNumber()
  public readonly moisture: number;

  @IsNumber()
  public readonly temp: number;
}

export class SensorDataDto {
  @Type(() => Air)
  @ValidateNested()
  public readonly air: Air;

  @Type(() => Soil)
  @ValidateNested()
  public readonly soil: Soil;

  @IsNumber()
  public readonly liquid: number;
}
