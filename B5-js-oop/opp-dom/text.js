function classForm(id) {
  this.id = id;
  this.form;
  this.row;
  
  this.init = function() {
    this.form = document.getElementById(this.id);
    return this.form;
  }
  
  this.createRow = function() {
    this.row = document.createElement('div')
  }
  
  this.append = function(label, input) {
    this.createRow();
    this.row.appendChild(label);
    this.row.appendChild(input);
    this.form.appendChild(this.row);
  }
}

function classInput(name, value) {
  this.name = name;
  this.value = value;
  this.label = name;
  this.type = "text";
  this.el;
  
  this.createAttInput = function(attName, attValue) {
    var att = document.createAttribute(attName);
    attValue.value = att;
    this.el.setAttributeNode(att);
  }
  
  // tao label
  this.createLabel = function() {
    // tao label moi
    var elLabel = document.createElement('label');
    // gan ten cho label
    elLabel.innerText = this.label;
    return elLabel;
  }
  
  this.build = function() {
    // tao input moi
    this.el = document.createElement('input');
    // gan type cho input
    this.createAttInput('type', 'text');
    // gan value cho input
    this.createAttInput('value', this.value);
    
    return this.el
  }
}

/* tao form */
var form = new classForm(form);
form.init();

var btn = document.getElementById('btnAdd');
btn.addEventListener('click', function() {
  var name = document.getElementById('editorName');
  var value = document.getElementById('editorValue');
  var input = new classInput(name.value, value.value);
  form.append(input.createLabel(), input.build());
});