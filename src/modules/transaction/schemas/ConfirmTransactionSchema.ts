import Z from 'zod';

const ConfirmTransactionSchema = Z.object({
  password: Z.string().min(6).max(255),
});

export default ConfirmTransactionSchema;
