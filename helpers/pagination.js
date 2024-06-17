module.exports = (objectPagination, quantityProduct, query) => {
    objectPagination.totalPage = Math.ceil(quantityProduct/4);
    if(query.page) {
        objectPagination.pageNumber = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.pageNumber - 1) * objectPagination.limit;
    return objectPagination;

}