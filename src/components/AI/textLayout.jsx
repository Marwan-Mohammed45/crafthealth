import React from 'react';

function TextLayout({children}) {
    return (
        <div className='max-w-screen-lg p-3 mx-auto'>
            {children}
        </div>
    );
}

export default TextLayout;