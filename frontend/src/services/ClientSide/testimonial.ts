import { api } from ".";

export const createTestimonial = (payload: Record<string, any>) => {
  return api.post("/review", payload);
};
