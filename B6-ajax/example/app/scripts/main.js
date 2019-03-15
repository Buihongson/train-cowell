$(document).ready(function () {
    function loadData(page) {
        var url = 'https://reqres.in/api/users?page=' + page;
        $.get(url, function (returnJson) {
            // console.log(returnJson.data);
            $.each(returnJson.data, function (i, user) {
                $('#box').append('<div class="row"><img src = "' + user.avatar + '"> <div class="row__firstName">' + user.first_name + '</div><div class="row__lastName"> ' + user.last_name + '</div> </div>');
            });

            if(page < returnJson.total_pages) {
                $('#btnLoadMore').data('page', Number(page) + 1);
            } else {
                $('#btnLoadMore').remove();
            }
        });
    }

    $('#btnLoadMore').on('click', function() {
        var getPage = $(this).data('page');
        loadData(getPage);
    });

    loadData(1);

});

