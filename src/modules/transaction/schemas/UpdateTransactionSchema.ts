import Z from 'zod';

const UpdateTransactionSchema = Z.object({
  valueTransaction: Z.number().positive().optional(),
  schedule: Z.date().nullable().optional(),
});

export default UpdateTransactionSchema;
