import React from "react";

const Filter = ({persons, value,onChange}) => {
    return(
    <input value={value} onChange={onChange} />
    )
}
export default Filter;