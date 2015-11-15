//------------------------------------------------------------------------------------------- BUBBLES
function showNotify(title, text, type, centered) {

  var bubble = $('#notify-bubble'),
    b_class = 'default';

  //text
  $('h4', bubble).html(title);
  $('.content', bubble).html(text);

  //class
  switch (type) {
    case 'success':
      b_class = 'suc';
      break;
    case 'error':
      b_class = 'err';
      break;
    case 'warning':
      b_class = 'warn';
      break;
    default:
      b_class = type;
  }
  bubble.removeClass().addClass(b_class);

  if (centered) {
    bubble.css({top:  "calc(50% - " + bubble.height() + "px)", right: "calc(50% - " + bubble.width()/2 + "px)"});
  }
  else {
    bubble.css({top: "10%", right: "50px"});
  }
  // show
  bubble.fadeIn();

  // hide 10s
  clearTimeout(window.tBubble);
  window.tBubble = setTimeout(function() {
    bubble.fadeOut();
    delete window.tBubble;
  }, 1000 * 3);
}

function showConfirm(title, text, callbackYes, callbackNo, centered) {

  var bubble = $('#confirm-bubble');

  //text
  $('h4', bubble).html(title);
  $('.content', bubble).html(text);

  // event disable
  $('#confirm-true, #confirm-false', bubble).off('click');

  // callbacks
  if (typeof callbackYes === 'function') {
    $('#confirm-true', bubble).on('click', callbackYes);
  }

  if (typeof callbackNo === 'function') {
    $('#confirm-false', bubble).on('click', callbackNo);
  }

  // show bubble
  bubble.fadeIn();
}

//------------------------------------------------------------------------------------------- MODAL, WIDGETS, MENU: open, close
// принимает класс модального окна, открывает его
function openModal(id) {
  // find and show
  var modal = $('.modal.' + id);
  modal.fadeIn(300);
  // content position
  var modalContent = modal.find('.modal-content');
  var modalHeight = modalContent.height();
  var modalMargin = modalHeight / 2;
  if (modalHeight < $(window).height()) {
    modalContent.css({
      'margin-top': '-' + modalMargin + 'px'
    });
  } else {
    modalContent.css({
      'margin-top': '0',
      'top': '0',
      'height': $(window).height()
    });
  }
  $(document).trigger('open-modal', [id]);
}

(function($) {
  $(function() {
    /*--------------- OPEN ---------------*/
    //modal opening
    // work if button #id === modal.id (e.g. button.#message show modal.message window)
    $('.summon-modal').click(function(e) {
      e.preventDefault();
      var curModalID = $(this).attr('id');
      openModal(curModalID);
    });

    /*--------------- CLOSE ---------------*/
    // button click
    $('button.modal-close, button.modal-close-big, button.close-widget').click(function() {
      // for modals
      $(this).parents('div.modal').fadeOut(300);
      $(this).parents('#notify-bubble, #confirm-bubble').fadeOut(300);
      // for widgets
      $(this).parents('div.submenu').removeClass('active');
    });

    // document click
    $(document).mouseup(function(e) {
      if (!$(e.target).parents('.submenu, .open-submenu, .modal-content, .ui-datepicker').length) {
        closeAllModals();
      }
    });

    // ESC
    $(document).on('keyup', function(e) {
      if (e.keyCode == 27) { //ESC keycode
        e.preventDefault();
        closeAllModals();
      }
    });

    /*--------------- TOGGLE ---------------*/
    // mobile menu open/close
    $('button.tcon').click(function() {
      $(this).parents('div.container').find('ul.topnav-mobile').toggleClass('active');
    });

    // widgets
    $('.open-submenu').click(function() {
      var cur_submenu = $(this).parent().find('.submenu');
      cur_submenu.toggleClass('active');
      $('.submenu').not(cur_submenu).each(function() {
        $(this).removeClass('active');
      });
    });

  }); // onload
})(jQuery); //anon

function closeAllModals() {
  // for modals
  $('div.modal').fadeOut(300);
  // for widgets
  $('div.submenu').removeClass('active');
}
