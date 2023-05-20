export default class UpdateUserDto {
  public readonly device?: string;

  public readonly email?: string;

  public readonly password?: string;

  public readonly refresh_token?: string | null;
}
