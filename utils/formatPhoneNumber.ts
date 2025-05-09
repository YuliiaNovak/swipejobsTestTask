export const formatPhoneNumber = (phone: string) => {
  if (phone.length < 3) return phone;
  return `(${phone.slice(0, 3)})${phone.slice(3)}`;
};
