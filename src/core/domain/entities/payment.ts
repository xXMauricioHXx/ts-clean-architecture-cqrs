import { env } from '@/main/env';
import { uuid } from '@/shared/helpers';
import {
  MaxLimitReachedError,
  OutSideOfWindowValueError,
  SameOriginError,
} from '@/core/domain/exceptions';

export class Payment {
  public readonly id: string;

  public readonly receiverId: number;

  public readonly payerId: number;

  public value: number;

  public description?: string;

  public valueInDate: number;

  public payedDate: Date;

  constructor(props: Partial<Payment>) {
    Object.assign(this, props);

    this.id = props.id || uuid();
    this.validate();
  }

  private validate(): void {
    if (this.isReachedLimit()) {
      throw new MaxLimitReachedError();
    }

    if (this.isOutSideFromWindowValue()) {
      throw new OutSideOfWindowValueError();
    }

    if (this.isSameOrigin()) {
      throw new SameOriginError();
    }
  }

  private isReachedLimit(): boolean {
    return this.valueInDate + this.value > env.maxAmountPerDay;
  }

  private isOutSideFromWindowValue(): boolean {
    const hour = this.payedDate.getUTCHours();
    if (
      hour > env.maxHourToTransferAmout &&
      this.value > env.maxValueToTransferAfterMaxHour
    ) {
      return true;
    }

    return false;
  }

  private isSameOrigin(): boolean {
    if (this.payerId === this.receiverId) {
      return true;
    }

    return false;
  }
}
