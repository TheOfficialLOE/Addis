export interface UseCase<Payload, Result> {
  execute(payload: Payload): Promise<Result>;
}
