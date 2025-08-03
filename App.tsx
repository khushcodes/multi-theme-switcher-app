
import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Layout from './components/Layout';
import ProductDetailPage from './pages/ProductDetailPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
