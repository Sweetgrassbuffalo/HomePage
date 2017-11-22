
<!-- Begin Functions Javascript

function isBlank(field) {
// THIS FUNCTION CHECKS FOR BLANK FIELDS AND RETURNS TRUE IF BLANK
  if ((field == "") || (field == " ") || (field == null)) {
    return true;
  }
  else {
    for (i=0; i<field.length; i++) {
      if (field.charAt(i) != " ") return false;
    }
  }

  return true;
}


function isNumeric(field) {
// THIS FUNCTION RETURNS TRUE IF A FIELD CONTAINS ONLY NUMBERS...
  for (var i = 0; i < field.length; i++) {
    if ((field.charAt(i) < "0") || (field.charAt(i) > "9")) {
      return false;
      break;
    }
  }
  return true;
}


function isAlphaNumeric(field) {
// THIS FUNCTION RETURNS TRUE IF INPUT IS ALPHANUMERIC
  var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i=0; i<field.length; i++) {
    var testchar = field.charAt(i);

    if ((testchar < "0") || (testchar > "9")) {  // check for characters
      if (alphabet.indexOf(testchar) == -1) {    // check for symbols
        return false;
      }
    }
  }

  return true;
}


function stripNonNumeric(strInput) {
// THIS FUNCTION WILL REMOVE ALL NON-NUMERIC CHARACTERS FROM A STRING (EXCEPT A PERIOD)
  var strResult = '';
  
  for (var i=0; i<strInput.length; i++) {
    var testchar = strInput.charAt(i);

    if (((testchar >= "0") && (testchar <= "9")) || (testchar == '.')) {
      strResult += testchar;
    }
  }

  return strResult;
}


function isValidPhone(field) {
// THIS FUNCTION TESTS FOR A VALID PHONE NUMBER AND RETURNS TRUE IF VALID
  var strPhone = stripNonNumeric(field);
  
  if ((strPhone.length != 7) && (strPhone.length != 10)) {
    return false;
  }
  else {
    return true;
  }
}


function isValidEmail(field) {
// THIS FUNCTION TESTS FOR A VALID EMAIL ADDRESS AND RETURNS TRUE IF VALID
  var email = field;
  var invalid = "~`|#$%&*()+={}!\"<>?/[]:; \\";
  var atCount = 0;
  var result = true;

  if (email.length < 5) {
    result = false;
  }
  if ((email.indexOf("@") == -1) || (email.indexOf("@") == 0)) {
    result = false;
  }
  if (email.indexOf(".") == -1) {
    result = false;
  }

  for (var i = 0; i < email.length; i++) {
    if ((invalid.indexOf(email.charAt(i)) != -1) && (result == true)){
      result = false;
    }

    if (email.charAt(i) == "@") {
      atCount++;
    }
  }

  if (atCount > 1) {
    result = false;
  }

  if (result == false) {
    return false;
  }
  else {
    return true;
  }
}


function isValidDate(str_month, str_day, str_year, boolCheckExpired) {
  if ((str_month == "00") || (str_day == "00") || (str_year == "0000")) {
    alert("The date you entered is incomplete.");
    return false;
  }

  // Chop leading zero off of 2-digit values...
  if (str_day.length == 2) str_day = (str_day.indexOf("0") == 0) ? str_day.charAt(1) : str_day;
  if (str_month.length == 2) str_month = (str_month.indexOf("0") == 0) ? str_month.charAt(1) : str_month;

  // Format as type integer...
  var day   = parseInt(str_day);
  var month = parseInt(str_month);
  var year  = parseInt(str_year);

  // Check for valid dates...
  if ((month == 2) && (day > 29) && ((year % 4) == 0)) {
    alert("The date you entered is incorrect.\nFebruary, " + year + " has only 29 days");
    return false;
  }
  else if ((month == 2) && (day > 28) && ((year % 4) != 0)) {
    alert("The date you entered is incorrect.\nFebruary, " + year + " has only 28 days");
    return false;
  }
  else if (((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) {
    switch (month) {
      case 4: month = "April"; break;
      case 6: month = "June"; break;
      case 9: month = "September"; break;
      case 11: month = "November"; break;
    }
    alert("The date you entered is incorrect.\n" + month + " has only 30 days.");
    return false;
  }

  // Check for expired dates...
  if (boolCheckExpired == 1) {
    var today = new Date();
    js_month  = today.getMonth()+1;
    js_day    = today.getDate();
    js_year   = today.getFullYear();

    if ((year < js_year) || ((month < js_month) && (year <= js_year)) || ((day < js_day) && (month <= js_month) && (year <= js_year))) {
      alert("The date you entered has already passed.");
      return false;
    }
  }

  return true;
}


function wordCount(field) {
// THIS FUNCTION RETURNS THE NUMBER OF WORDS IN A PHRASE
  var arrWords = field.split(" ");
  var intCount = arrWords.length;
  return(intCount);
}


function jsChop(strInput) {
// THIS FUNCTION REMOVES TRAILING WHITESPACE FROM A STRING AND RETURNS THE RESULT
  var intLength = strInput.length - 1;
  var strWhitespace = " \n\r\t";

  for (i=intLength; i>=0; i--) {
    strChar = strInput.charAt(i);
    if (strWhitespace.indexOf(strChar) != -1) strInput = strInput.substring(0,i);
    else break;
  }

  return strInput;
}


function checkAll(str_form, str_element, bln_checked) {
  obj_form = document.forms[str_form];
  bln_checked = (bln_checked == 1) ? true : false;
  
  for (i = 0; i < obj_form.length; i++) {
    var obj_element = obj_form.elements[i];

    if ((obj_element.type.toLowerCase() == "checkbox") && (obj_element.name == str_element)) {
        obj_element.checked = bln_checked;
    }
  }

  return;
}


function isCheckboxSelected(strForm, strElement) {
  var objForm = document.forms[strForm];

  for (i=0; i<objForm.length; i++) {
    var objTemp = objForm.elements[i];

    if ((objTemp.type.toLowerCase() == "checkbox") && (objTemp.name == strElement)) {
      if (objTemp.checked) return true;
    }
  }

  return false;
}


function isRadioChecked(whichForm, whichElement) {
// THIS FUNCTION CHECKS TO SEE IF A RADIO BUTTON HAS BEEN CHECKED
  var objFormElement = document.forms[whichForm].elements[whichElement];

  for (i=0; i<objFormElement.length; i++) {
    if (objFormElement[i].checked) return true;
  }

  return false;
}


function trimAll(strForm) {
// THIS FUNCTION WILL TRIM WHITESPACE FROM ALL TEXT AND PASSWORD FIELDS
  var obj_form = document.forms[strForm];
  
  for (j=0; j<obj_form.length; j++) {
    var obj_element = obj_form.elements[j];

    if ((obj_element.type.toLowerCase() == "text") || (obj_element.type.toLowerCase() == "password")  || (obj_element.type.toLowerCase() == "textarea")) {
      obj_element.value = jsChop(obj_element.value);
    }
  }
}

function Querystring(qs) {
    this.params = new Object()
    this.get = Querystring_get
    
    if (qs == null) {
        qs = location.search.substring(1,location.search.length);
    }

    if (qs.length == 0) {
        return;
    }
    
    qs = qs.replace(/\+/g, ' ')
    var args = qs.split('&') // parse out name/value pairs separated via &
    
    for (var i=0;i<args.length;i++) {
        var value;
        var pair = args[i].split('=');
        var name = unescape(pair[0]);

        if (pair.length == 2) {
            value = unescape(pair[1]);
        } else {
            value = name;
        }
        
        this.params[name] = value;
    }
}

function Querystring_get(key, default_) {
    if (default_ == null) {
        default_ = null;
    }
    
    var value = this.params[key];
    
    if (value==null) {
        value = default_;
    }
    
    return value;
}

// End Functions Javascript -->
