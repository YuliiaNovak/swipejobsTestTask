import { JobListing } from "@/types/jobListing";

export const formatCentsToDollars = (
  cents: JobListing["wagePerHourInCents"]
) => {
  const dollars = cents / 100;
  return `$${dollars.toFixed(2)}`;
};
