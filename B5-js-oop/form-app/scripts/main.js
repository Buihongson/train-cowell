
$( document ).ready(function() {

    // class for init Form
    function classForm() {
        this.form;
        this.container;
        this.row;

        this.init = function(id, container) {
            this.form = $('#' + id);
            this.container = $('#' + container);
            return this.form;
        }

        this.createRow = function(label, input) {
            this.row = $('<div/>', {
                'class': 'row'
            });
            this.row.append(label).append(input);
        }

        this.appendRow = function(label, input) {
            this.createRow(label, input);
            this.container.append(this.row);
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
    }

    // init form
    var form = new classForm('form');
    form.init('form','ctnFrm');

    // handle input type selection
    var inputType;
    $('#inputType').on('change', function(e) {
        inputType = $(this).val();

        // ToDo: change layout for: radio, checkbox

        
    })

    $('#btnAddToFrm').on('click', function(e) {
        var input = new classInput();
        input.init(inputType, $('#inputLabel').val(), $('#inputName').val(), $('#inputValue').val());
        form.appendRow(input.elLabel, input.el);
    })

});