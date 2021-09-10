function sort(el, col, dataType) {
    let table = el.closest("table");
    let tbody = table.tBodies[0];

    let asc = getSortDirection(el, table);

    let placeholder = document.createElement('tbody');

    table.replaceChild(placeholder, tbody);
    tbody = sortRows(tbody, col, dataType, asc);
    table.replaceChild(tbody, placeholder);
}

function getSortDirection(el,table){
    let asc = true;

    if (el.hasAttribute("data-sort")) {
        let sortDir = el.getAttribute("data-sort");
        if (sortDir == "asc") {
            asc = false;
        } else if (sortDir == "desc") {
            asc = true;
        }
    }

    let sortedCols = table.querySelectorAll("[data-sort]");
    for (const sortedCol of sortedCols) {
        sortedCol.removeAttribute("data-sort")
    }

    el.setAttribute("data-sort", (asc ? "asc" : "desc"));

    return asc;
}

function sortRows(tbody, col, dataType, ascending) {
    const rows = Array.from(tbody.rows);

    rows.sort(
        (x, y) => {
            let xVal = value(x.cells[col].attributes["data-value"].value, dataType);
            let yVal = value(y.cells[col].attributes["data-value"].value, dataType);

            return xVal == yVal ? 0 : xVal < yVal ? (ascending ? -1 : 1) : (ascending ? 1 : -1);
        }
    )

    for (let row of rows) {
        tbody.appendChild(row);
    }

    return tbody;
}

function value(val, type) {
    switch (type) {
        case "number":
            return Number(val);
        default:
            return val;
    }
}