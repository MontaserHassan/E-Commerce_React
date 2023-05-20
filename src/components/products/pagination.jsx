import{ React,Fragment }from 'react';
import "./style/pagination.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ pages, currentPage, setCurrentPage }) => {

    const allPages = [];
    for(let i = 1; i <= pages; i++){
        allPages.push(i);
    };

    return (
        <Fragment>
        
            <div className="pagination">
                
                <button
                disabled={currentPage===1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="btn btn-secondary me-1">
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                {allPages.map(page =>

                    <div
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={ currentPage === page ?  "page isActive" : "page"}>
                            { page }              
                    </div>
                
                )}

                <button
                disabled={currentPage === pages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="btn btn-secondary ms-1">
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>

            </div>

        </Fragment>
    );
}

export default Pagination;
