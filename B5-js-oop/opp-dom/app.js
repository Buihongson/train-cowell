/* class form */

function classForm(id) {
    this.id = id;
    this.form;
    this.row;

    this.init = function() {
        this.form = document.getElementById(this.id);
        return this.form
    }

    this.createRow = function() {
        this.row = document.createElement('div');
    }

    this.createElement = function(label, input) {
        this.createRow();
        this.row.appendChild(label);
        this.row.appendChild(input);
        this.form.appendChild(this.row);
    }
}

function classInput(name, value) {
    this.name = name;
    this.label = name;
    this.value = value;
    this.type = 'text';
    this.el;
    
    this.build = function() {
        switch (this.type) {
            case 'button':
                break;
            case 'radio':
                break;
            default: // input text
                this.el = document.createElement('input');
                this.createAttr('type', 'text');
                this.createAttr('value', this.value);
        }
        return this.el;
    }

    this.createLabel = function() {
        var elLabel = document.createElement('label');
        elLabel.innerText = this.label;
        return elLabel;
    }

    // type => type = "text"
    this.createAttr = function(attrName, attrValue) {
        var attr = document.createAttribute(attrName);
        attr.value = attrValue;
        this.el.setAttributeNode(attr); 
    }
}

/* tao form */
var form = new classForm('form');
form.init();

/* click button */
var btn = document.getElementById('btnAdd');
btn.addEventListener('click', function() {
    var name = document.getElementById('editorName');
    var value = document.getElementById('editorValue');
    var input = new classInput(name.value, value.value);
    form.createElement(input.createLabel(), input.build());
});
