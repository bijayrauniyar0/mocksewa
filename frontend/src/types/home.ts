import { User } from "@/store/auth";

export interface IMockTestDetails {
  id: number;
  title: string;
}
// testimonialsData.ts
export interface ReviewType {
  id: number;
  User: Omit<User, "email" | "number" | "bio">;
  rating: number;
  review?: string;
  MockTest: IMockTestDetails;
}
