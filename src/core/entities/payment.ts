import { env } from '@/main/env';
import { uuid } from '@/shared/helpers';

export class Payment {
  public readonly id: string;

  public readonly receiverId: string;

  public value: number;

  public description?: string;

  public valueInDate: number;

  public payedDate: Date;

  constructor(props: Partial<Payment>) {
    Object.assign(this, props);

    this.id = props.id || uuid();
  }

  isReachedLimit(): boolean {
    return this.valueInDate + this.value > env.maxAmountPerDay;
  }

  isOutSideFromWindowValue(): boolean {
    const hour = this.payedDate.getUTCHours();
    if (
      hour > env.maxHourToTransferAmout &&
      this.value > env.maxValueToTransferAfterMaxHour
    ) {
      return true;
    }

    return false;
  }
}
