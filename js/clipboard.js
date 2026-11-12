document
    .getElementById("copyJiraBtn")
    .addEventListener("click", copyToJira);

function buildJiraMarkup() {

    let html = `
        <div style="
            font-family:Segoe UI, Arial, sans-serif;
            font-size:14px;
        ">
    `;

    findings.forEach(finding => {

        html += `
        <table
            style="
                border-collapse:collapse;
                width:100%;
                margin-bottom:25px;
                border:1px solid #cccccc;
            ">

            <tr>
                <th style="
                    border:1px solid #ccc;
                    padding:10px;
                    background:#f5f5f5;
                ">
                    Platform
                </th>

                <th style="
                    border:1px solid #ccc;
                    padding:10px;
                    background:#f5f5f5;
                ">
                    Testing Env
                </th>

                <th style="
                    border:1px solid #ccc;
                    padding:10px;
                    background:#f5f5f5;
                ">
                    Browser
                </th>

                <th style="
                    border:1px solid #ccc;
                    padding:10px;
                    background:#f5f5f5;
                ">
                    Screenshot
                </th>

                <th style="
                    border:1px solid #ccc;
                    padding:10px;
                    background:#f5f5f5;
                ">
                    Site Section
                </th>

                <th style="
                    border:1px solid #ccc;
                    padding:10px;
                    background:#f5f5f5;
                ">
                    Comments
                </th>
            </tr>

            <tr>

                <td style="
                    border:1px solid #ccc;
                    padding:10px;
                ">
                    ${finding.platform}
                </td>

                <td style="
                    border:1px solid #ccc;
                    padding:10px;
                ">
                    ${finding.environment}
                </td>

                <td style="
                    border:1px solid #ccc;
                    padding:10px;
                ">
                    ${finding.browser || ""}
                </td>

                <td style="
                    border:1px solid #ccc;
                    padding:10px;
                ">

                    <img
                        src="${finding.screenshot}"
                        style="
                            max-width:450px;
                            height:auto;
                            display:block;
                            border:1px solid #ddd;
                        ">

                </td>

                <td style="
                    border:1px solid #ccc;
                    padding:10px;
                ">
                    ${finding.siteSection}
                </td>

                <td style="
                    border:1px solid #ccc;
                    padding:10px;
                    white-space:pre-wrap;
                ">
                    ${finding.comments}
                </td>

            </tr>

        </table>
        `;
    });

    html += `</div>`;

    return html;
}

function copyToJira() {

    if (!findings.length) {

        alert(
            "Please add at least one finding."
        );

        return;
    }

    const exportContainer =
        document.createElement("div");

    exportContainer.id =
        "jira-copy-container";

    exportContainer.style.position =
        "fixed";

    exportContainer.style.left =
        "-99999px";

    exportContainer.style.top =
        "0";

    exportContainer.innerHTML =
        buildJiraMarkup();

    document.body.appendChild(
        exportContainer
    );

    const range =
        document.createRange();

    range.selectNodeContents(
        exportContainer
    );

    const selection =
        window.getSelection();

    selection.removeAllRanges();

    selection.addRange(range);

    const successful =
        document.execCommand(
            "copy"
        );

    selection.removeAllRanges();

    document.body.removeChild(
        exportContainer
    );

    if (successful) {

        alert(
            "Evidence copied. Open Jira and press CTRL+V."
        );

    } else {

        alert(
            "Copy failed."
        );
    }

}
document
    .getElementById("openExportBtn")
    .addEventListener(
        "click",
        openExportPreview
    );

function openExportPreview() {

    const html =
        buildJiraMarkup();

    const win =
        window.open(
            "",
            "_blank"
        );

    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>
                Jira Evidence
            </title>
        </head>
        <body>
            ${html}
        </body>
        </html>
    `);

    win.document.close();
}