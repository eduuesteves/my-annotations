import './App.scss';
import { MyRoutes } from './MyRoutes';
import { Footer } from './components/Footer';

import { Header } from './components/Header';

export function App() {
  return (
    <>
      <Header />
      <main>
        <MyRoutes />
      </main>
      <Footer />
    </>
  );
}
