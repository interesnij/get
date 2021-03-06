
ajax = document.body.querySelector("#ajax");
init_wow();
get_active_button();
loader_hide(ajax);

on('#ajax', 'click', '.s_1', function() {
  service_tab_action(this, ".tab_1")
});
on('#ajax', 'click', '.s_2', function() {
  service_tab_action(this, ".tab_2")
});
on('#ajax', 'click', '.s_3', function() {
  service_tab_action(this, ".tab_3")
});
on('#ajax', 'click', '.s_4', function() {
  service_tab_action(this, ".tab_4")
});
on('#ajax', 'click', '.s_5', function() {
  service_tab_action(this, ".tab_5")
});

on('#ajax', 'click', '.a_1', function() {
  auth_tab_action(this, ".auth_tab_1")
});
on('#ajax', 'click', '.a_2', function() {
  auth_tab_action(this, ".auth_tab_2")
});

on('body', 'click', '.ajax', function(event) {
  event.preventDefault();
  var url = this.getAttribute('href');
  if (url != window.location.pathname){
    ajax_get_reload(url);
  } else {toast_info("Вы уже на этой странице")}
})

on('body', 'click', '.apps_btn', function() {
  toggle_nav_first_span();
});
on('body', 'click', '.pages_btn', function() {
  toggle_nav_second_span();
});

on('body', 'click', '#register_ajax', function() {
  if (!document.body.querySelector("#username").value){
    document.body.querySelector("#username").style.border = "1px #FF0000 solid";
    toast_error("Придумайте логин!");
  } else if (!document.body.querySelector("#email").value){
    document.body.querySelector("#email").style.border = "1px #FF0000 solid";
    toast_error("Введите Вашу почту!")
  } else if (!document.body.querySelector("#password1").value){
    document.body.querySelector("#password1").style.border = "1px #FF0000 solid";
    toast_error("Пароль - обязательное поле!")
  } else if (!document.body.querySelector("#password2").value){
    document.body.querySelector("#password2").style.border = "1px #FF0000 solid";
    toast_error("Введите пароль еще раз!")
  }
  form_data = new FormData(document.querySelector("#signup"));
  reg_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  reg_link.open( 'POST', "/rest-auth/registration/", true );
  reg_link.onreadystatechange = function () {
  if ( reg_link.readyState == 4 && reg_link.status == 201 ) {
    if (window.location.href == "http://getnetwork.site/signup/"){window.location.href = "/";}
    else {window.location.href=window.location.href}
    }};
  reg_link.send(form_data);
})
on('body', 'click', '#logg', function() {
  if (!document.body.querySelector("#username").value){
    document.body.querySelector(".#username").style.border = "1px #FF0000 solid";
    toast_error("Введите логин!")}
  else if (!document.body.querySelector("#password").value){
    document.body.querySelector("#password").style.border = "1px #FF0000 solid";
    toast_error("Введите пароль!")}
  if (document.body.querySelector("#username").value){document.body.querySelector("#username").style.border = "rgba(0, 0, 0, 0.2)";}
  if (document.body.querySelector("#password").value){document.body.querySelector("#password").style.border = "rgba(0, 0, 0, 0.2)";}

  form_data = new FormData(document.querySelector("#login_form"));
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'POST', "/rest-auth/login/", true );
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    if (window.location.href == "http://getnetwork.site/login/"){window.location.href = "/";}
    else {window.location.href=window.location.href}
    }};
  link.send(form_data);
});
