
$( document ).ready(function() {

    // class for init Form
    function classForm() {
        this.form;
        this.container;
        this.showBtnRemove;
        this.btnRemove = $('<a/>', {
            'href': 'javascript:void(0)',
            'class': 'btnRemoveExtra',
            text: 'X',
            click: function(e) {
                $(this).parent().remove();
            }
        });

        this.init = function(id, container) {
            this.form = $('#' + id);
            this.container = $('#' + container);
            return this.form;
        }

        this.createRow = function(label, input, showBtnRemove = true) {
            var row = $('<div/>', {
                'class': 'row'
            });
            row.append(label).append(input);
            if (showBtnRemove) row.append(this.btnRemove.clone(true));
            return row;
        }
        this.appendRow = function(label, input, showBtnRemove = true) {
            this.container.append(this.createRow(label, input, showBtnRemove));
        }

        this.createRowList = function(list, showBtnRemove) {
            var rowList = $('<div/>', {
                'class': 'extra-item'
            });
            rowList.append(list);
            if (showBtnRemove) rowList.append(this.btnRemove.clone(true));
            return rowList;
        }
        this.appendRowList = function(list, showBtnRemove = true) {
            this.container.append(this.createRowList(list, showBtnRemove));
        }

        this.changeStyle = function(style) {
            
        }

        this.submit = function() {

        }
    }

    // class for init Input
    function classInput() {
        this.name;
        this.label;
        this.elLabel;
        this.value;
        this.type;
        this.el;

        this.init = function(type, label, name, value) {
            this.name = name;
            this.label = label;
            this.value = value;
            this.type = type;
            this.build();
            this.buildLabel();
        }

        this.build = function() {
            switch (this.type) {
                case 'button':

                    break;
                case 'radio':
                    var checklist = $('<div/>', {
                        class: 'checklist'
                    });
                    if (this.name.length > 0) {
                        var thisClass = this;
                        for (var i=0; i<this.name.length; i++) {
                            checklist
                                .append($('<input/>', {
                                    type: 'radio',
                                    class: 'input-radio',
                                    name: thisClass.generateNameFromLabel(),
                                    value: $(thisClass.value[i]).val()
                                }))
                                .append($('<label/>', {
                                    class: 'label-radio',
                                    text: $(thisClass.name[i]).val()
                                }))
                            ;
                        }
                    }
                    this.el = checklist;
                    break;
                default: // input text
                    this.el = $('<input/>', {
                        type: 'text',
                        value: this.value,
                        name: this.name,
                        class: 'input-text'
                    });
            }
            return this.el;
        }
        this.buildLabel = function() {
            this.elLabel = $("<label/>", {
                text: this.label
            });;
        }
        this.generateNameFromLabel = function() {
            var str = this.label.replace(/\s/g, '');
            return str.toLowerCase();
        }
    }

    // init form
    var form = new classForm();
    form.init('form','ctnFrm');

    var exForm = new classForm();
    exForm.init('ctnExtra','frmExtra');

    // handle input type selection
    var inputType;
    $('#inputType').on('change', function(e) {
        inputType = $(this).val();

        // reset layout
        $('#inputLabel').val('');
        $('#inputName').val('');
        $('#inputValue').val('');
        $('#frmExtra').empty();
        $('#ctnExtra').hide();

        // ToDo: change layout for: radio, checkbox
        if (inputType == 'radio' || inputType == 'checkbox') {
            $('#ctnExtra').show();
            $('#btnAddRow').trigger('click');
        }

    })

    $('#btnAddRow').on('click', function(e) {
        // init Name, Value input
        var inputName = new classInput();
        inputName.init('text', 'Name', 'name', '');
        var inputValue = new classInput();
        inputValue.init('text', 'Value', 'value', '');
        
        // append into extra form
        var rowList = [
            exForm.createRow(inputName.elLabel, inputName.el),
            exForm.createRow(inputValue.elLabel, inputValue.el)
        ];
        exForm.appendRowList(rowList);
    });

    $('#btnAddToFrm').on('click', function(e) {

        if (inputType == 'radio' || inputType == 'checkbox') {
            // ToDo: validate first
            console.log('should validate');
            
            // add Input
            var itemNameList = $('.box input[name="name"]');
            var itemValueList = $('.box input[name="value"]');
            var input = new classInput();
            input.init(inputType, $('#inputLabel').val(), itemNameList, itemValueList);
            form.appendRow(input.elLabel, input.el);

        } else {
            var input = new classInput();
            input.init(inputType, $('#inputLabel').val(), $('#inputName').val(), $('#inputValue').val());
            form.appendRow(input.elLabel, input.el);
        }

    })

});