import Z from 'zod';

const CreateTransactionSchema = Z.object({
  valueTransaction: Z.number().positive(),
  type: Z.enum(['PAYMENT', 'RECEIPT']),
  schedule: Z.date().nullable().optional(),
  paying: Z.number().positive(),
  receiving: Z.number().positive(),
});

export default CreateTransactionSchema;
