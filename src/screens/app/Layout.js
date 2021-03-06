import React from 'react';
import { hot } from 'react-hot-loader/root';

import SiteHeader from 'screens/app/layout/SiteHeader';
import Navbar from 'screens/app/layout/Navbar';
import SiteContent from 'screens/app/layout/SiteContent';

const Layout = ({ children }) => (
  <>
    <SiteHeader>
      <Navbar />
    </SiteHeader>
    <SiteContent>{children}</SiteContent>
  </>
);

export default hot(Layout);
