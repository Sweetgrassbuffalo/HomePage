<!--

/****** ADMIN FUNCTIONS ******/

function checkSearch()
{
    var obj_form   = document.forms['view'];
    var obj_search = obj_form.elements['search'];
    var obj_page   = obj_form.elements['page'];

    if (obj_search.value != '') {
        obj_page.value = 1; // reset pager
        return true;
    } else {
        alert('What would you like to search for?');
        return false;
    }
}


function sortResults(str_sort)
{
    var obj_form = document.forms['view'];
    var obj_sort = obj_form.elements['sort'];
    var obj_sdir = obj_form.elements['sdir'];

    if (obj_sort.value == str_sort) {
        obj_sdir.value = (obj_sdir.value.toUpperCase() == 'ASC') ? 'DESC' :  'ASC';
    } else {
        obj_sort.value = str_sort;
        obj_sdir.value = 'ASC';
    }

    obj_form.submit();
}


function viewPage(int_page)
{
    var obj_form = document.forms['view'];
    var obj_page = obj_form.elements['page'];

    if (parseInt(int_page) > 0) {
        obj_page.value = int_page;
    } else {
        obj_page.value = 1;
    }

    obj_form.submit();
}


function deleteRecord(int_id)
{
    if (confirm('Delete this record?')) {
        document.forms['view'].elements['id'].value = int_id;
        document.forms['view'].elements['action'].value = 'delete';
        document.forms['view'].submit();
    }
}


function deleteChecked()
{
    if (confirm('Delete all checked rows?')) {
        document.forms['view'].elements['action'].value = 'delete';
        document.forms['view'].submit();
    }
}


function testLink(str_url)
{
    if (str_url) {
        if (str_url.indexOf('http') != 0) str_url = "http://www.bestop.com/" + str_url;
        day = new Date();
        id  = day.getTime();
        eval("page" + id + " = window.open(str_url, '" + id + "', 'toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=1,resizable=1,width=640,height=480,left=0,top=0');");
    } else {
        alert("No link to test.");
    }
}


/****** POPUP ******/

var popupWindow = null;
var openwin = null;
var num = 1;

function popup(myTarget, myWidth, myHeight, myScroll)
{
  // quick check for parameters...
  if (!myTarget || !myWidth || !myHeight) {
    alert("JAVASCRIPT ERROR: the popup() function is missing parameters.");
    return;
  }

  // internet explorer can close the open window (windows only)...
  isMac = (navigator.appVersion.indexOf("Mac") != -1);
  if (popupWindow && document.all && !isMac) {
    popupWindow.close();
    popupWindow = null;
  }

  // set the width and height based on myWidth and myHeight...
  var winwidth  = myWidth;
  var winheight = myHeight;

  // determine how to position the window based on myHeight and myWidth...
  if (window.screen) {
    var wintop  = eval((screen.availHeight - winheight)/2);  // calculated top value
    var winleft = eval((screen.availWidth - winwidth)/2);    // calculated left value
  }
  else  {
    var wintop  = 100;
    var winleft = 100;
  }

  // take care of window naming...
  var myName = "gr_popup_" + num + "";
  openwin = myName;

  // set attributes...
  var myAttributes = "";
  myAttributes += "top=" + wintop + ",left=" + winleft + ",width=" + winwidth + ",height=" + winheight + ",";
  if (myScroll == "no") {
    myAttributes += "scrollbars=no,resizable=no,status=no";
  }
  else {
    myAttributes += "scrollbars=yes,resizable=no,status=no";
  }

  // open the window...
  popupWindow = window.open(myTarget,myName,myAttributes);

  // update the counter...
  num++;

  // focus on window...
  if (parseInt(navigator.appVersion) >= 4) {
    // delay a bit here because of IE4 bug...
    setTimeout('popupWindow.focus();', 250);
  }
}


function printPage()
{
    if (window.print) {
        setTimeout('window.print();', 50);
    } else if (navigator.platform.indexOf('Win') != -1) {
        alert("Press 'Ctrl+P' on your keyboard to print.");
    } else {
        alert("Press 'Cmd+P' on your keyboard to print.");
    }
}

// -->