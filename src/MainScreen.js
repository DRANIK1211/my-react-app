import React from "react";

const MainScreen = ({user}) => {
    console.log(user)
    return(
        <div className="content">
            <div className="main-text">Ваши меда</div>
            <div className="main-text-znak">
                <div className="p">Наименование</div>
                <div className="v">Кол-во, в кг</div>
            </div>
        </div>
    );
}

export default MainScreen;