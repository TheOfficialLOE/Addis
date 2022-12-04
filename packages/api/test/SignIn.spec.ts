import { Test, TestingModule } from "@nestjs/testing";
import { SignInUseCaseImpl } from "@api/modules/auth/usecases/sign-in/SignInUseCaseImpl";
import { UserRepository } from "@api/modules/auth/database/user/UserRepository";
import { UserMapper } from "@api/modules/auth/database/user/UserMapper";
import { getModelToken } from "@nestjs/mongoose";
import { UserSchema } from "@api/modules/auth/database/user/UserSchema";
import { EventEmitter2, EventEmitterModule } from "@nestjs/event-emitter";
import { UserEntity } from "@api/modules/auth/domain/user/UserEntity";
import { UserSignedInEvent } from "@api/modules/auth/domain/events/UserSignedInEvent";

describe("SignIn", () => {
  let signInUseCase: SignInUseCaseImpl;
  let userRepository: UserRepository;
  let eventEmitter: EventEmitter2;

  const mockUser = UserEntity.new({
    email: "john.doe@example.com",
    name: "John Doe",
    isVerified: true
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot()
      ],
      providers: [
        SignInUseCaseImpl,
        UserRepository,
        UserMapper,
        {
          provide: getModelToken(UserSchema.name),
          useValue: {}
        }
      ]
    }).compile();

    signInUseCase = module.get(SignInUseCaseImpl);
    userRepository = module.get(UserRepository);
    eventEmitter = module.get(EventEmitter2);
  })

  it("should mark an existing user as unverified", async () => {
    jest.spyOn(userRepository, "findOne").mockImplementation(async () => mockUser);
    jest.spyOn(userRepository, "updateOne").mockImplementationOnce(async () => {});
    await signInUseCase.execute({
      email: "john.doe@example.com",
      name: "John Doe",
    });
    expect(mockUser.isVerified).toBeFalsy();
  });

  it("should create a new unverified user if can't find any", async () => {
    jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(undefined);
    jest.spyOn(userRepository, "create").mockResolvedValueOnce(void undefined);
    await signInUseCase.execute({
      email: "john.doe@example.com",
      name: "John Doe",
    });
    expect(userRepository.create).toBeCalled();
  });

  it("should emit an event", async () => {
    const spy = jest.fn();
    eventEmitter.on("user.signed-in", spy);
    jest.spyOn(userRepository, "findOne").mockResolvedValueOnce(undefined);
    jest.spyOn(userRepository, "create").mockResolvedValueOnce(void undefined);
    await signInUseCase.execute({
      email: "john.doe@example.com",
      name: "John Doe",
    });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(new UserSignedInEvent("john.doe@example.com"))
  });
});
