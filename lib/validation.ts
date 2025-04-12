import z from "zod";

const requiredString = z.string().trim().min(1, "Required");
const optionalString = z.string().optional();
const requiredNumber = z.coerce
	.number()
	.positive("Value must be a positive number") // Ensures the value is greater than 0
	.refine(val => val >= 0.001, {
		message: "Value must be at least 0.001",
	});

export const LoginSchema = z.object({
	email: requiredString.email().toLowerCase(),
	password: requiredString,
});

export type LoginValues = z.infer<typeof LoginSchema>;

export const SignUpSchema = z.object({
	name: requiredString,
	email: requiredString.email().toLowerCase(),
	password: requiredString.min(8, { message: "must be at least 8 characters" }),
});

export type SignUpValues = z.infer<typeof SignUpSchema>;

export const VolumeSchema = z.object({
	perCreditPrice: requiredNumber,
	credit: requiredNumber,
	paddlePriceId: requiredString,
	type: z.enum(["SUBSCRIPTION", "PURCHASE"]),
});

export type VolumeValues = z.infer<typeof VolumeSchema>;

export const BlogSchema = z.object({
	image: requiredString,
	title: requiredString,
	category: optionalString,
	tags: z.array(requiredString).optional(),
	description: requiredString,
	htmlContent: requiredString,
});

export type BlogValues = z.infer<typeof BlogSchema>;

export const UserProfileUpdateSchema = z.object({
	image: optionalString,
	name: optionalString,
	mobile: optionalString,
	country: optionalString,
	address: optionalString,
	city: optionalString,
	state: optionalString,
});

export type UserProfileUpdateValues = z.infer<typeof UserProfileUpdateSchema>;

export const ChangePasswordSchema = z.object({
	password: requiredString.min(8, { message: "must be at least 8 characters" }),
	confirmPassword: requiredString.min(8, {
		message: "must be at least 8 characters",
	}),
	oldPassword: requiredString,
});

export type ChangePasswordValues = z.infer<typeof ChangePasswordSchema>;

export const ForgotPasswordSchema = z.object({
	password: requiredString.min(8, { message: "must be at least 8 characters" }),
	confirmPassword: requiredString.min(8, {
		message: "must be at least 8 characters",
	}),
});

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

export const DownloadEmailSchema = z.object({
	type: z.enum(["pdf", "xlsx", "csv"]),
	fileName: requiredString,
	filter: z.enum(["all", "deliverable", "undeliverable", "disposable"]),
});

export type DownloadEmailValues = z.infer<typeof DownloadEmailSchema>;

export const ApiTokenSchema = z.object({
	apiName: requiredString,
	apiRequestLimit: z.coerce
		.number()
		.positive("Value must be a positive number")
		.optional(),
});

export type ApiTokenValue = z.infer<typeof ApiTokenSchema>;
