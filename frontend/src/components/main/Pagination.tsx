import {Container, Pagination} from "react-bootstrap";

interface Props {
    totalPages: number
    currentPage: number
}

function AppPagination({totalPages, currentPage}: Props) {
    return (
        <Container className="p-3">
            <Pagination>
                {currentPage <= 1 ?
                    <>
                        <Pagination.First disabled/>
                        <Pagination.Prev disabled/>
                    </> :
                    <>
                        <Pagination.First href="?pageIndex=1"/>
                        <Pagination.Prev href={`?pageIndex=${currentPage - 1}`}/>
                    </>}
                {Array.from({length: totalPages}).map((_, i) => (
                    (currentPage === i + 1) ?
                        <Pagination.Item active activeLabel="">{i + 1}</Pagination.Item> :
                        <Pagination.Item href={`?pageIndex=${i + 1}`}>{i + 1}</Pagination.Item>
                ))}
                {currentPage >= totalPages ?
                    <>
                        <Pagination.Next disabled/>
                        <Pagination.Last disabled/>
                    </> :
                    <>
                        <Pagination.Next href={`?pageIndex=${currentPage + 1}`}/>
                        <Pagination.Last href={`?pageIndex=${totalPages}`}/>
                    </>}
            </Pagination>
        </Container>
    );
}

export default AppPagination;