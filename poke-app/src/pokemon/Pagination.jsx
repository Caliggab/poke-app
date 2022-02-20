import styles from './Pagination.module.css'

const Pagination = (props) => {
    let page = props.page

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const pageChangeAdd = () => {
        let newPage = page+1
        props.setPage(newPage)
        scrollToTop()
    }

    const pageChangeDecrease = () => {
        let newPage = page-1
        props.setPage(newPage)
        scrollToTop()

}

    return <div className={styles.PaginationContainer}>
        <div>Page: {props.page} of 57</div>
        {props.page === 1 ? '' : <button onClick={pageChangeDecrease}>&#60;</button>}
        {props.page === 57 ? '' : <button onClick={pageChangeAdd}>&#62;</button>}
    </div>
}

export default Pagination;