import React from 'react';
import TextLayout from './textLayout';
function UserInput({ input }) {
    return (
        <>
            <TextLayout>
                <div className="flex justify-end mb-2">
                    <div className="bg-[#257122] text-white px-4 py-2 rounded-lg max-w-xs shadow-md break-words whitespace-pre-line">
                        {input}
                    </div>
                </div>
            </TextLayout>
        </>
    );
}

export default UserInput;