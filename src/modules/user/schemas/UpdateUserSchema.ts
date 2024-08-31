import Z from 'zod';

const CreateUserSchema = Z.object({
  fullname: Z.string().min(3).max(255).optional(),
  email: Z.string().email().optional(),
  password: Z.object({
    confirmPassword: Z.string().min(6).max(255),
    newPassword: Z.string().min(6).max(255),
  }).optional(),
  accountBalance: Z.number().min(0).negative().optional(),
});

export default CreateUserSchema;
