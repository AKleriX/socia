import React from "react";

/*Презентационный компонент страницы, информирующей об отсутствии страницы по запрошенному URL*/
/*Presentation component of the page informing about the absence of a page at the requested URL*/
const NoPageError = () => {
    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
        </div>
    );
}

export default NoPageError;
