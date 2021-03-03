
ajax = document.body.querySelector("#ajax");
banner_height_init(ajax);

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

on('body', 'click', '.ajax', function(event) {
  event.preventDefault();
  var url = this.getAttribute('href');
  if (url != window.location.pathname){
    ajax_get_reload(url)
  } else {toast_info("Вы уже на этой странице")}
})

on('body', 'mouseover', '.mn-has-sub', function(event) {
  this.nextElementSibling.style.display = "block"
});
on('body', 'mouseover', '.mn-sub', function(event) {
  this.style.display = "block"
});
on('body', 'mouseout', '.mn-has-sub', function(event) {
  this.nextElementSibling.style.display = "none"
})
