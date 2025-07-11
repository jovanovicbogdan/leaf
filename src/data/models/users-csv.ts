type NormalUser = {
  mockDataId: string;
  username: string;
  password: string;
};

type Users = {
  normal: NormalUser[];
};

export type TestUserData = {
  users: Users;
};
