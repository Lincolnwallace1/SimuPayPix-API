import Z from 'zod';

const CreateUserSchema = Z.object({
  fullName: Z.string().min(3).max(255),
  email: Z.string().email(),
  password: Z.string().min(6).max(255),
  accountBalance: Z.number().min(0).nonnegative(),
});

export default CreateUserSchema;
