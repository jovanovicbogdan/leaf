type NormalUser = {
  mockDataId: string;
  username: string;
  password: string;
  role: 'user';
};

type EnterpriseUser = {
  mockDataId: string;
  username: string;
  password: string;
  role: 'enterprise_admin' | 'enterprise_user';
  company: string;
  features: string[];
};

type Users = {
  normal: NormalUser[];
  enterprise: EnterpriseUser[];
};

export type TestUserData = {
  users: Users;
};
