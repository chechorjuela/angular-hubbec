export interface AuthResponseDto {
  id:        string;
  firstname: string;
  email:     string;
  lastname:  string;
  token:     Token;
}

export interface Token {
  expiresIn: number;
  token:     string;
}
