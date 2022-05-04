import 'reflect-metadata';
import sinon, { SinonFakeTimers } from 'sinon';
import { expect } from 'chai';
import {
  CreatePaymentIntentionUseCase,
  CreatePaymentIntention,
} from '@/core/usecases';
import { PaymentInMemoryRepository } from '@/infra/repositories/in-memory/payment';
import {
  MaxLimitReachedError,
  OutSideOfWindowValueError,
} from '@/core/exceptions';

describe('CratePaymentIntention', () => {
  const sandbox = sinon.createSandbox();
  const tenMinutesInMiliSeconds = 600000;
  const defaultUuid = 'b9fc2816-bb76-4209-90ac-7430aac7cb37';

  let fakeNow = new Date('2022-04-26T18:50:54.058Z');
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = sandbox.useFakeTimers(fakeNow.getTime());
  });

  afterEach(() => {
    sandbox.restore();
    clock.restore();
  });

  describe('#create', () => {
    it('should create a valid payment.', async () => {
      const data: CreatePaymentIntention.Params = {
        id: defaultUuid,
        payerId: '1',
        receiverId: '2',
        value: 100,
        description: 'Test',
      };

      const paymentRepository = new PaymentInMemoryRepository();
      const useCase = new CreatePaymentIntentionUseCase(paymentRepository);

      const result = await useCase.create(data);

      expect(result).to.be.eql({
        id: defaultUuid,
        payerId: data.payerId,
        receiverId: data.receiverId,
        description: data.description,
        value: data.value,
        createdAt: fakeNow,
        updatedAt: fakeNow,
      });
    });
    it('should try create a payment greater than R$100 and throw error OutSideOfWindowValueError', async () => {
      clock.tick(tenMinutesInMiliSeconds);

      const data: CreatePaymentIntention.Params = {
        id: defaultUuid,
        payerId: '1',
        receiverId: '2',
        value: 700,
        description: 'Test',
      };

      const paymentRepository = new PaymentInMemoryRepository();
      const useCase = new CreatePaymentIntentionUseCase(paymentRepository);

      let error;
      try {
        await useCase.create(data);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(OutSideOfWindowValueError);
    });
    it('should try create a payment with value greater than R$5.000 and throw error MaxLimitReachedError', async () => {
      const data: CreatePaymentIntention.Params = {
        id: defaultUuid,
        payerId: '1',
        receiverId: '2',
        value: 4901,
        description: 'Test',
      };

      const paymentRepository = new PaymentInMemoryRepository();
      const useCase = new CreatePaymentIntentionUseCase(paymentRepository);

      let error;
      try {
        await useCase.create(data);
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(MaxLimitReachedError);
    });
  });
});
