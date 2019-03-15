$(document).ready(function () {
    $('#container .accordion').click(function() {
        $('#container .content').hide();
        $(this).next().show();
    });
});
