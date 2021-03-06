import React from "react";
import ReactPaginate from 'react-paginate';
import style from './Paginator.module.css';
import cn from 'classnames';

/*Компонент отрисовки списка выбора страницы с пользователями*/
/*Component of rendering the list of selection of the page with users*/
const Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize}) => {

    return (
        <div className={style.paginatorContainer}>
            <ReactPaginate pageCount={Math.ceil(totalUsersCount / pageSize)}
                           previousLabel={'<-'}
                           nextLabel={'->'}
                           breakLabel={'...'}
                           marginPagesDisplayed={2}
                           pageRangeDisplayed={5}
                           onPageChange={onPageChanged}
                           initialPage={currentPage - 1}
                           containerClassName={style.pagination}
                           subContainerClassName={cn(style.pagination, style.pages)}
                           activeClassName={cn(style.active)}
            />
        </div>
    );
}

export default Paginator;