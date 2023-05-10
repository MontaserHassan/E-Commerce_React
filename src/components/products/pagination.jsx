import{ React,Fragment }from 'react';
import "./style/pagination.css";

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
                    <i className="fas fa-angle-left"></i>
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
                    <i className="fas fa-angle-right"></i>
                </button>

            </div>

        </Fragment>
    );
}

export default Pagination;
