import React from 'react';

import SiteHeader from 'screens/app/SiteHeader';
import Navbar from 'screens/app/Navbar';
import SiteContent from 'screens/app/SiteContent';

const Layout = ({ children }) => (
  <>
    <SiteHeader>
      <Navbar />
    </SiteHeader>
    <SiteContent>{children}</SiteContent>
  </>
);

export default Layout;
