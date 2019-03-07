// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });




document.getElementById('btn').addEventListener('click', changeDiv);

function changeDiv() {
    var backgroundColor = document.getElementById('color').value;
    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;
    var result = document.getElementById('result');

    result.style.backgroundColor= backgroundColor;
    result.style.height = "50px";
    result.style.width = "200px";
}