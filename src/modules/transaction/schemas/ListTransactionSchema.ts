import Z from 'zod';

const ListTransactionSchema = Z.object({
  limit: Z.number().optional().default(50),
  offset: Z.number().optional().default(0),
  status: Z.enum([
    'PENDING',
    'COMPLETED',
    'CANCELLED',
    'REVERSED',
    'NOT_AUTHORIZED',
  ]).optional(),
  type: Z.enum(['PAYMENT', 'RECEIPT']).optional(),
});

export default ListTransactionSchema;
