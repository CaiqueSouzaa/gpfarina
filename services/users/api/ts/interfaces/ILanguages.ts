// Ilanguages
export default interface Ilanguages {
  server: Server;
  controllers: Controllers;
}

interface Controllers {
  users: Users;
}

interface Users {
  show: Show;
  find: Find;
  store: Store;
  index: Find;
  checkLogin: Store;
  resetPassword: ResetPassword;
  update: Update;
  destroy: Update;
}

interface Update {
}

interface ResetPassword {
  invalid_body: Error;
  user_not_found: Error;
  sucess: Error;
}

interface Store {
  invalid_body: Error;
  userlogin_in_use: Error;
  sucess: Error;
}

interface Find {
  invalid_body: Error;
  sucess: Error;
}

interface Show {
  invalid_body: Error;
  user_not_finded: Error;
  sucess: Error;
}

interface Server {
  error: Error;
}

interface Error {
  code: number;
  message: string;
}