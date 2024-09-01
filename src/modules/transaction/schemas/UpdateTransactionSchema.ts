import Z from 'zod';

const UpdateTransactionSchema = Z.object({
  valueTransaction: Z.number().positive().optional(),
});

export default UpdateTransactionSchema;
