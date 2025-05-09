export interface JobListing {
  jobId: string;
  jobTitle: JobTitle;
  company: CompanyInfo;
  wagePerHourInCents: number;
  milesToTravel: number;
  shifts: Shifts[];
  branch: string;
  branchPhoneNumber: string;
  requirements?: string[];
}

export interface JobTitle {
  name: string;
  imageUrl: string;
}

export interface CompanyInfo {
  name: string;
  address: CompanyAddress;
  reportTo: ReportToInfo;
}

export interface CompanyAddress {
  formattedAddress: string;
  zoneId: string;
}

export interface ReportToInfo {
  name: string;
  phone?: string;
}

export interface Shifts {
  startDate: string;
  endDate: string;
}
