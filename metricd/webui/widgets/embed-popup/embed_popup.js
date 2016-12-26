/**
 * This file is part of the "FnordMetric" project
 *   Copyright (c) 2016 Laura Schlimmer
 *
 * FnordMetric is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License v3.0. You should have received a
 * copy of the GNU General Public License along with this program. If not, see
 * <http://www.gnu.org/licenses/>.
 */
fEmbedPopup = function(elem, query) {
  var popup;
  var background;
  var inner_window;

  function close() {
    if (popup.parentNode == elem) {
      elem.removeChild(popup);
    }
    if (background.parentNode == elem) {
      elem.removeChild(background);
    }
  }

  function render() {
    var tpl = templateUtil.getTemplate("fnordmetric-embed-popup");
    var popup = tpl.querySelector("f-popup");
    elem.appendChild(tpl);
    popup.show();
    //background = document.createElement("div");
    //background.className = "popup_ui background";

    //popup = document.createElement("div");
    //popup.className = "popup_ui";

    //var tabbar = document.createElement("div");
    //tabbar.className = "metric_preview_secondary_controls";

    //var close_btn = FnordMetric.createButton(
    //  "#", "close_btn btn", "<i class='fa fa-close'></i>");

    //var iframe_tab = FnordMetric.createButton(
    //  "#", "tab btn", "IFrame");

    //var url_tab = FnordMetric.createButton(
    //  "#", "tab btn", "URL");

    //var html_tab = FnordMetric.createButton(
    //  "#", "tab btn", "HTML5");

    //inner_window = document.createElement("div");
    //inner_window.className = "inner";

    //elem.appendChild(background);
    //popup.appendChild(close_btn);
    //tabbar.appendChild(iframe_tab);
    //tabbar.appendChild(url_tab);
    //tabbar.appendChild(html_tab);
    //popup.appendChild(tabbar);
    //popup.appendChild(inner_window);
    //elem.appendChild(popup);


    //background.addEventListener('click', function(e) {
    //  e.preventDefault();
    //  close();
    //}, false);

    //close_btn.addEventListener('click', function(e) {
    //  e.preventDefault();
    //  close();
    //}, false);

    //iframe_tab.addEventListener('click', function(e) {
    //  e.preventDefault();
    //  embedIFrame();
    //}, false);

    //url_tab.addEventListener('click', function(e) {
    //  e.preventDefault();
    //  embedURL();
    //}, false);

    //html_tab.addEventListener('click', function(e) {
    //  e.preventDefault();
    //  embedHTML();
    //}, false);

    //embedIFrame();
  }

  function embedIFrame() {
    //code.innerHTML = '&lt;iframe<br />&nbsp;&nbsp;&nbsp;&nbsp;width="800"<br />&nbsp;&nbsp;&nbsp;&nbsp;height="400"<br />&nbsp;&nbsp;&nbsp;&nbsp;frameBorder="0"<br />&nbsp;&nbsp;&nbsp;&nbsp;src="' + queryUrl() + '"&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;/iframe&gt;';
  }

  function embedURL() {
    inner_window.innerHTML = "Embed URL:";
    var code = document.createElement("code");
    code.innerHTML = queryUrl();
    inner_window.appendChild(code);
  }

  function embedHTML() {
    var code1 = document.createElement("code");
   // code1.innerHTML = '&lt;script href="http://' + document.location.host + '/s/fnordmetric.js" type="text/javascript"&gt;&lt;script&gt;';
    var code2 = document.createElement("code");
   // code2.innerHTML = '&lt;fm-chart&gt;<br />' + query + '<br />&lt;/fm-chart&gt;';
  }

  function queryUrl() {
    return "http://" + document.location.host + "/query?width=800&height=400&format=svg&q=" + encodeURIComponent(query);
  }

  return {
    "render" : render,
  }
}