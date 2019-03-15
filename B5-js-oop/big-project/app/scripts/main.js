$(document).ready(function () {
    // class for init form
    function classForm() {
        this.form; // form editor
        this.container; // form
        this.row;
        this.showBtnRomve;
        this.btnRomve = $('<a/>', {
            'href': 'javasrcipt:void(0)',
            'class': 'btnRomveExtra',
            text: 'X',
            click: function(e) {
                $(this).parent().remove();
            }
        });

        this.init = function (id, container) {
            // id is form editor when post data
            // container when click add and data will add this form
            this.form = $('#' + id);
            this.container = $('#' + container);
            return this.form;
        }

        // function create row
        this.createRow = function (label, input, showBtnRomve = true) {
            var row = $('<div/>', {
                'class': 'row'
            });
            row.append(label).append(input);
            // check for btn remove
            if(showBtnRomve) row.append(this.btnRomve.clone(true));
            return row;
        }

        // function add 1 row into form when type === 'text', 'textarea', 'button'
        this.appendRow = function (label, input, showBtnRomve = true) {
            this.container.append(this.createRow(label, input, showBtnRomve));
        }

        // function create row list for extra form
        this.createRowList = function(list, showBtnRomve) {
            var rowList = $('<div/>', {
                'class': 'extra-item'
            });
            rowList.append(list);
            if(showBtnRomve) rowList.append(this.btnRomve).clone(true);
            return rowList;
        }

        // function append rowlist when type = 'radio', 'checkbox'
        this.appendRowList = function(list, showBtnRomve = true) {
            this.container.append(this.createRowList(list, showBtnRomve));
        }

        // this.changeStyleForm = function() {
        //     $('label, input').addClass('.change .change--label')
        // }
    }

    function classInput() {
        this.name;
        this.label;
        this.elLabel;
        this.value;
        this.type;
        this.el;

        this.init = function (type, label, name, value) {
            this.type = type;
            this.label = label;
            this.name = name;
            this.value = value;
            this.build();
            this.buildLabel();
        }

        this.build = function () {
            switch (this.type) {
                case 'textarea':
                    this.el = $('<textarea/>', {
                        type: 'textarea',
                        name: this.name,
                        class: "input-text input-text--area"
                    }).text(this.value);
                    break;

                case 'button':
                    this.el = $('<button/>', {
                        type: 'button',
                        name: this.name,
                        class: 'button button--touch'
                    }).text(this.value);
                    break;

                case 'radio':
                    var checklist = $('<div/>', {
                        class: 'chescklist'
                    });
                    if(this.name.length > 0) {
                        var thisClass = this;
                        for(var i=0; i < this.name.length; i++) {
                            checklist.append($('<input/>', {
                                type: 'radio',
                                class: 'input-type',
                                name: thisClass.generateNameFromLabel(),
                                value: $(thisClass.value(i).val())
                            })).append($('<label/>', {
                                class: 'label-radio',
                                text: $(thisClass.name[i]).val()
                            }));
                        }
                    }
                    break;

                case 'checkbox':

                    break;
                case 'weather':

                    break;
                default:
                    this.el = $('<input/>', {
                        type: 'text',
                        value: this.value,
                        name: this.name,
                        class: "input-text"
                    });
            }
            return this.el
        }

        this.buildLabel = function () {
            this.elLabel = $('<label/>', {
                text: this.label
            });
        }

        this.generateNameFromLabel = function() {
            var str = this.label.replace(/\s/g, '');
            return str.toLowerCase();
        }
    }


    // init form
    var form = new classForm();
    form.init('form', 'ctnFrm');
    var exForm = new classForm();
    exForm.init('extra', 'frmExtra');

    // change style form
    // $('#frmStyle').on('click', function() {
    //     form.changeStyleForm(); 
    // });

    // handle input type is radio, check box
    var inputType;
    $('#inputType').on('change', function (e) {
        inputType = $(this).val();
        if (inputType == 'text' || inputType == 'button' || inputType == 'textarea') {
            $('#extra').hide();
        }
        if (inputType == 'radio' || inputType == 'checkbox') {
            $('#extra').show();
            $('#btnAddRow').trigger('click');
        }
    });

    $('#btnAddRow').on('click', function(e) {
        // init name, value input
        var inputName = new classInput();
        inputName.init('text', 'Name', 'name', '');
        var inputValue = new classInput();
        inputValue.init('text', 'Value', 'value', '');

        var rowList = [
            exForm.createRow(inputName.elLabel, inputName.el),
            exForm.createRow(inputValue.elLabel, inputValue.el)
        ];
        exForm.appendRowList(rowList);
    });

    // handle when click add to form
    $('#btnAddForm').on('click', function (e) {
        var input = new classInput();
        input.init(inputType, $('#inputLabel').val(), $('#name').val(), $('#value').val());
        // console.log(input.el);
        if(inputType == 'text' || inputType == 'button' || inputType == 'textarea') {
            form.appendRow(input.elLabel, input.el);
        } else {
            if(input == 'radio') {
                var listName = [];
                var listValue = [];
                var lengthName = $('#container #name').length;

                for(let i = 0; i < lengthName; i++) {
                    listName.push($('#container #name').val());
                    listValue.push($('#container #value').val());
                }

                form.appendRow(input.elLabel, input.el);
            }
        }
    });

});