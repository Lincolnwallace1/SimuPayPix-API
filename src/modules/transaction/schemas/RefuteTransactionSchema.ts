import Z from 'zod';

const RefuseTransactionSchema = Z.object({
  password: Z.string().min(6).max(1024),
  reversalReason: Z.string().min(6).max(1024),
});

export default RefuseTransactionSchema;
