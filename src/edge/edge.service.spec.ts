import { Test, TestingModule } from '@nestjs/testing';
import { EdgeService } from './edge.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EdgeService', () => {
  let service: EdgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EdgeService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: 'EDGE_SERVICE',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<EdgeService>(EdgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
