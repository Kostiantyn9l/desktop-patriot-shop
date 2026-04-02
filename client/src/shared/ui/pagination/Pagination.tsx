import styles from "./Pagination.module.scss";
import type React from "react";

interface PaginationProps {
    totalCount: number;
    limit: number;
    page: number;
    onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (
    ({ totalCount, limit, page, onChange }) => {
        const pageCount = Math.ceil(totalCount / limit);
        const pages: number[] = [];

        for(let i: number = 0; i < pageCount; i++) {
            pages.push(i + 1);
        }
        console.log({
            totalCount,
            limit,
            page,
            pageCount,
            pages
        });
        
        return (
            <div className={styles.pagination}>
                {pages.map(p => (
                    <button
                        key={p}
                        className={`${styles.pageItem} ${
                            page === p ? styles.active : ""
                        }`}
                        onClick={() => onChange(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>
        )
    }
)

export default Pagination;