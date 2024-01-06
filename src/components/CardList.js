
function CardList(maxColumn, cardStyle, items){


    const createMatrixFromArray = function (array, n) {
        const matrix = [];
        for (let i = 0; i < array.length; i += n) {
            matrix.push(array.slice(i, i + n));
        }
        return matrix;
    }

    const matrix = createMatrixFromArray(items, maxColumn)

}