import React, { useState } from "react";

const Header = ({ headers, onSorting }) => {
    return (
        <thead>
            <tr>
                {headers.map(({ name, field, sortable }) => (
                    <th className="tableHader"
                        key={name}
                        
                    >
                        {name}

                        
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default Header;