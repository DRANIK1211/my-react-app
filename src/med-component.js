import React from "react";
import UserService from "./data";

const medComponent = ( { med, clearComponent } ) => {

    const del = () => {
        clearComponent(med.number)
    }

    return (
        <div className="med">
            <div className="med-component">
                <div className="component-name">{med.name}</div>
                <div className="component-count">{med.amount}</div>
            </div>
            <div className="med-btn">
                <div className="btn-red">Редактировать</div>
                <div className="btn-del" onClick={del}>Удалить</div>
            </div>
        </div>
    )
}

export default medComponent