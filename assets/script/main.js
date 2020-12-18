var data = [];
var example = null;
$(function () {
    Papa.parse("./assets/file/Game-data.csv", {
        "download": true,
        "header": true,
        "dynamicTyping": true,
        "complete": results => {
            if ($.fn.DataTable.isDataTable("#gameList")) {
                example.destroy();
                $('#gameList').empty();
            }
            example = $("#gameList").DataTable({
                "responsive": true,
                "columns": results.meta.fields.map(c => ({
                    "title": c,
                    "data": c,
                    "visible": c.toLowerCase() !== "id",
                    "default": ""
                })),
                "data": results.data,
                "deferRender": true,
                "scrollY": 550,
                "pageLength": 25,
                "select": true,
                "columnDefs": [{
                    "width": "0%",
                    "targets": 0
                }],
                "buttons": [{
                    "text": 'My button',
                    action: function (e, dt, node, config) {
                        alert('Button activated');
                    }
                }]

            }).columns.adjust().responsive.recalc();
        }
    });
});


// Filter button
$("#btn").click(function () {

    $('#gameList_filter input').focus().val("7.02");
    simulateMouseClick(document.querySelector("#gameList_filter input"));
});


// Simulate mouse press function,
// because the search field has to be active
// due to it being a live search box
function simulateMouseClick(targetNode) {
    function triggerMouseEvent(targetNode, eventType) {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        targetNode.dispatchEvent(clickEvent);
    }
    ["mouseover", "mousedown", "mouseup", "click"].forEach(function (eventType) {
        triggerMouseEvent(targetNode, eventType);
    });
}