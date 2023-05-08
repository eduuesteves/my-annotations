import { Route, Router, Routes } from 'react-router-dom';

import { Login } from '../components/Login';
import { AddUser } from '../components/AddUser';
import { Annotations } from '../components/Annotations';
import { EditUser } from '../components/EditUser';
import { AddAnnotation } from '../components/AddAnnotation';
import { EditAnnotations } from '../components/EdtiAnnotation';

export function MyRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Annotations />} />
      <Route path='/login' element={<Login />} />
      <Route path='/add-user' element={<AddUser />} />
      <Route path='/add-annotation' element={<AddAnnotation />} />
      <Route path='/edit-user' element={<EditUser />} />
      <Route path='/edit-annotation' element={<EditAnnotations />} />
    </Routes>
  );
}
