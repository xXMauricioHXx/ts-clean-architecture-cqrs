import { query } from '@/shared/decorators';
import { Query } from '@/core/application/ports';

@query()
export class ListPaymentsQuery extends Query {}
