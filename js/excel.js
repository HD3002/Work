document
.getElementById("exportExcelBtn")
.addEventListener(
    "click",
    exportExcel
);

function exportExcel(){

    const data =
    findings.map(f=>({

        Platform:
        f.platform,

        Environment:
        f.environment,

        Browser:
        f.browser,

        SiteSection:
        f.siteSection,

        Comments:
        f.comments

    }));

    const workbook =
    XLSX.utils.book_new();

    const worksheet =
    XLSX.utils.json_to_sheet(
        data
    );

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Evidence"
    );

    const ticket =
    document.getElementById(
        "ticketNumber"
    ).value || "Evidence";

    XLSX.writeFile(
        workbook,
        `${ticket}.xlsx`
    );

}