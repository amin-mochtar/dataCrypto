import React, { useState } from "react";

const Search = ({ dataSearch }) => {
    const [search, setCommentSearch] = useState("");

    const onChangeInput = value => {
        setCommentSearch(value);
        dataSearch(value);
    };
    return (
        <input
            type="text"
            className="form-control"
            style={{ width: "240px" }}
            placeholder="Search"
            value={search}
            onChange={e => onChangeInput(e.target.value)}
        />
    );
};

export default Search;