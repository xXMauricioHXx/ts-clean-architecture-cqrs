export namespace UserService {}

export interface UserService {
  checkUserExists(userId: number): Promise<void>;
}
