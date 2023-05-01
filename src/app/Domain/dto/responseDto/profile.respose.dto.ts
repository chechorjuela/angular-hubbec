export interface ProfileRequestDto {
  address?: string;
  id: string;
  firstname: string;
  country?: string;
  city?: string;
  lastname: string;
  phonenumber: string;
  email: string;
  typeId: string;
  numberId: string;
  birthDate: Date;
  expeditionDate: Date;
  password: string;
  rptPassword: string;
  profile_image: string;
}
