$(document).ready(function(e) {
    $('.menu i').click(function(e) {
        $('nav ul').toggleClass('active');
    });

    // $('.btnDone').on('click', function(e) {
    //     var min = 1; 
    //     var max = 10;  
    //     var idTicket = Math.floor(Math.random() * (+max - +min)) + +min;
    //     var url = ' http://5c80f3ef02991c0014ed04cc.mockapi.io/tickets/' + idTicket;
    //     $.ajax({ 
    //         url:  url,
    //         type: 'PUT',
    //         success: function(data) {
    //             $('.box').first().remove();
    //             // console.log(url);
    //         }
    //     });
    // });

    function removeTicket() {
        $('body').on('click', '.btnDone' ,function(e) {
            var min = 1; 
            var max = 10;  
            var idTicket = Math.floor(Math.random() * (+max - +min)) + +min;
            var url = ' http://5c80f3ef02991c0014ed04cc.mockapi.io/tickets/' + idTicket;
            $.ajax({ 
                url:  url,
                type: 'PUT',
                success: function(data) {
                    $('.box').first().remove();
                    // console.log(url);
                }
            });
        });
    }

    removeTicket();

    $('#btnExtraArt').on('click', function(e) {
        var d = new Date();
        var month = d.getMonth()+1;
        var day = d.getDate();

        var curentDate =  ((''+day).length<2 ? '0' : '') + day+ '/' +((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear();

        $.ajax({
            url: 'http://5c80f3ef02991c0014ed04cc.mockapi.io/tickets',
            type: 'POST',
            data: {
                'title': 'Son Sample ticket ' + random(5),
                'due_date': '2019-08-17T03:37:32.993Z',
                'assignee': 'Son ' + random(5),
                'content': 'Internal Cotton Internal Cotton Internal Cotton Internal Cotton Internal Cotton Internal Cotton'
            },
            success: function(data) {
                var formatDate = new Date(data.due_date);
                var formatDateDone = ((''+formatDate.getDate()).length<2 ? '0' : '') + formatDate.getDate()+ '/' +((''+formatDate.getMonth()).length<2 ? '0' : '') + formatDate.getMonth() + '/' + formatDate.getFullYear();

                $('<article class="box"><div class="box__title"><h3>'+ data.title+'</h3></div><div class="box_body"><div class="box__body__row"><label>Create Date</label><p>'+curentDate+'</p></div> <div class="box__body__row"><label>Due Date</label><p>'+formatDateDone+'</p></div> <div class="box__body__row"><label>Assignee</label><p>'+data.assignee+'</p></div></div><div class="box__footer"><button class="box__footer__btn btnDone" onClick="removeTicket()">Done</button><a href="detail.html" class="box__footer__btn--active">View more</a></div></article>').insertBefore('#extraArt');
            }
        });
    });

    function random(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (var i = 0; i < length; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
});