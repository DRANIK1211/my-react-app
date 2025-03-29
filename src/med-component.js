import React from "react";

const medComponent = (med) => {
    return (
        <div className="med">
            <div className="med-component">
                <div className="component-name">{med.name}</div>
                <div className="component-count">{med.amount}</div>
            </div>
            <div className="med-btn">
                <div className="btn-red">Редактировать</div>
                <div className="btn-del">Удалить</div>
            </div>
        </div>
    )
}

export default medComponent