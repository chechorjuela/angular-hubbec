export interface SignUpRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  typeId: string;
  numberId: string;
  birthDate: Date;
  expeditionDate: Date;
  password: string;
  rptPassword: string;
}
