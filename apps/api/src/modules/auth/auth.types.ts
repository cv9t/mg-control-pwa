export type GeneratedTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = Omit<GeneratedTokens, "refreshToken">;
