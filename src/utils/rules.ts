export const rules = {
  required: (v: any) => !!v || "This field is required",
  minZero: (v: number) => v >= 0 || "Cannot be negative",
  minOne: (v: number) => v >= 1 || "Must be at least 1",
};