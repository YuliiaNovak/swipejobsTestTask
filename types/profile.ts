export interface ProfileData {
  address: Address;
  email: string;
  firstName: string;
  lastName: string;
  maxJobDistance: number;
  phoneNumber: string;
  workerId: string;
}

interface Address {
  formattedAddress: string;
  zoneId: string;
}
