import { Router } from 'express';
import catchErrors from './app/middlewares/catchErrors';
import { body, param, query } from 'express-validator';
import UsersControllers from './app/controllers/UsersControllers';

const routes: Router = Router();

routes.post('/users/create/', body(['name', 'surname', 'login', 'password', 'reset_password', 'email', 'telephone']).escape(), UsersControllers.store);
routes.get('/users/', query(['start_in', 'end_in']).escape(), UsersControllers.index);
routes.get('/users/search', query(['term']).escape(), UsersControllers.find);
routes.get('/users/get/:uuid4', param('uuid4').escape(), UsersControllers.show);
routes.get('/users/check-login/:login', param(['login']).escape(), UsersControllers.checkLogin);
routes.put('/users/update/password/:uuid4', param(['uuid4']).escape(), body(['password']).escape(), UsersControllers.updatePassword);

routes.use(catchErrors);

export default routes;
