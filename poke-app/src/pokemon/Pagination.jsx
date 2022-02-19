import styles from './Pagination.module.css'

const Pagination = (props) => {
    let page = props.page

    const pageChangeAdd = () => {
        let newPage = page+1
        props.setPage(newPage)
    }

    const pageChangeDecrease = () => {
        let newPage = page-1
        props.setPage(newPage)
}

    return <div className={styles.PaginationContainer}>
        <div>Page: {props.page} of 57</div>
        {props.page === 1 ? '' : <button onClick={pageChangeDecrease}>⬅</button>}
        {props.page === 57 ? '' : <button onClick={pageChangeAdd}>➡</button>}
    </div>
}

export default Pagination;