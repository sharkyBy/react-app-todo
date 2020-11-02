import React from 'react';

import './ItemAddForm.css';

const ItemAddform = (props) => {
    return (
        <div className="item-add-form">

            <button 
            className="btn btn-outline-secondary"
            onClick={()=>props.onItemAdded('Hello world')}> Add task </button>
        </div>
    )
};
export default ItemAddform