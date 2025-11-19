
import React from 'react';
import Footer from './Footer'; 

function Layout({ children }) {
    return (
        <>
            {/* children */}
            <main>
                {children}
            </main>
            
          
            <Footer />
        </>
    );
}

export default Layout;