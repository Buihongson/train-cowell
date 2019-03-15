
$( document ).ready(function() {
// general class for helper
var util = {

    // generate only on word
    genSampleData: function(quantity) {
        var data = [];
        for (var i=0; i < quantity; i++) {
            var item = {
                "title":    util.getRandomWords(),
                "created_date": "20/3/2019",
                "due_date": "28/3/2019",
                "assignee": util.getRandomWords([2,3]),
                "content": util.getRandomWords([15, 20, 30])
            }
            data.push(item);
        }
        return data;
    },

    // generate only on word
    getRandomWord: function (wordLength = [2,3,5,7]) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < util.getRandomElement(wordLength); i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
        return text;
    },

    // generate paragraph
    getRandomWords: function(words = [2,3,5,7]) {
        var text = [];
        for (var i=0; i < util.getRandomElement(words); i++) {
            text.push(util.getRandomWord());
        }
        return text.join(' ');
    },

    // get random element
    getRandomElement: function(arr) {
        return arr[Math.floor(Math.random()*arr.length)]
    }
}

// class for ticket
    function Ticket(obj) {
        this.title          = obj.title;
        this.created_date   = obj.created_date;
        this.due_date       = obj.due_date;
        this.assignee       = obj.assignee;
        this.item;
        this.template = $('#tplTicket');

        this.init = function() {
            this.item           = this.template.clone(true, true);
            this.item.removeClass('ticket--template');
            
            // fill data
            this.fillData();

            // add event
            this.item.find('.button--done').click($.proxy( this, 'done'));
            this.item.find('.button--more').click(this.more);

            // return ticket in construction function
            return this.item;
        }

        this.fillData = function() {
            this.item.find('.ticket__title').text(this.title);
            this.item.find('.ticket__created-date').text(this.created_date);
            this.item.find('.ticket__due-date').text(this.due_date);
            this.item.find('.ticket__assignee').text(this.assignee);
        }

        this.done = function() {
            // console.log(this);
            console.log('call ajax then remove');
            this.item.remove();
        }

        this.more = function() {
            console.log('more');
        }

        return this.init();

    }

    var ticketCtn = $('#ticketCtn');
    var ticketBtnAdd = $('#btnTicketAdding');
    var ticketConfig = {
        quantity: 5
    }

    // generate sample ticket
    var sampleJSON = util.genSampleData(ticketConfig.quantity);
    $.each(sampleJSON, function() {
        ticketBtnAdd.before(new Ticket(this));
    })

    // add new sample ticket
    ticketBtnAdd.click(function(e) {
        e.preventDefault();
        var item = util.genSampleData(1);
        $(this).before(new Ticket(item[0]));
    })
});