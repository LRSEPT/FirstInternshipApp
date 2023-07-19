import React from "react";

export const ButtonPagination = ({page,setPage,isSearchOn}) => {
    return(  
        <div className='pagination' >
            <button onClick={() => {page===1 ? setPage(100):setPage(page-1);}}>&larr;</button>
            <h3>{page}</h3>
            <button onClick={() => {page===100 ? setPage(1):setPage(page+1);}}>&rarr;</button>
        </div>
    )
}