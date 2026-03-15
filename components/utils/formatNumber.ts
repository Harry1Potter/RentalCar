export const formatNumber = (value: string) => {
  if (!value) return "";

  const number = value.replace(/\D/g, "");

  return Number(number).toLocaleString("en-US");
};