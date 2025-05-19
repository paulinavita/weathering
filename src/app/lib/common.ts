export const formatDate = (date: number) => {
  return new Date(date * 1000).toISOString().split("T")[0];
};

export const sanitise = (str: string) => {
  return str.replace(/[<>]/g, "").trim();
};
