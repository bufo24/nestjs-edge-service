import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdgeService } from './edge/edge.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: EdgeService,
          useValue: {
            update: () => null,
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should run', async () => {
      expect(
        await appController.handleEdgeCreated({
          id: 'id',
          capacity: 500000,
          node1_alias: 'alias1',
          node2_alias: 'alias2',
          created_at: new Date(),
          updated_at: new Date(),
        }),
      ).toBe(undefined);
    });
  });
});
