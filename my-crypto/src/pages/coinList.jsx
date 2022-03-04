import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Search, Pagination } from "../components";
import Navbar from '../components/Navbar'

const CoinList = () => {
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const ITEMS_PER_PAGE = 10;

    const headers = [
        { name: "ID"},
        { name: "Name"},
        { name: "Symbol"},
        { name: "rank"},
        { name: "Type" },
        { name: "Active" }
    ];

    useEffect(() => {
        const getData = () => {
            

            fetch("https://api.coinpaprika.com/v1/coins/")
                .then(response => response.json())
                .then(json => {
                   
                    setComments(json);
                    console.log(json);
                });
        };

        getData();
    }, []);

    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.symbol.toLowerCase().includes(search.toLowerCase()) ||
                    comment.rank.toLowerCase().includes(search.toLowerCase()) ||
                    comment.type.toLowerCase().includes(search.toLowerCase()) ||
                    comment.Active.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search]);
    
    return (
        <>
            <Navbar />
            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                        <Search
                                dataSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-striped">
                    <TableHeader
                        headers={headers}
                    />
                        <tbody>
                            {commentsData.map((comment, index) => (
                                <tr key={comment.id}>
                                    <th scope="row" >
                                        {comment.id}
                                    </th>
                                    <td>{comment.name}</td>
                                    <td>{comment.symbol}</td>
                                    <td>{comment.rank}</td>
                                    <td>{comment.type}</td>
                                    <td>{comment.is_active ?'true':'false'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination
                        totalPage={totalItems}
                        pageSIze={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </div>
        </>
    )
}
 
export default CoinList;