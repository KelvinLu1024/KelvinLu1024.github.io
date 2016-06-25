"use strict";

$(document).ready(loadBlogList);

function loadBlogList() {
  var listLoc = "./article/list.json";
  var lsele = document.getElementById("blog-list");
  $.ajax({
    "url": listLoc,
    "dataType": "json",
    "success": function (ls) {
      for (var fname of ls) {
        (function () {
          var floc = "./article/" + fname;
          queryArticle(floc, function (title, sum) {
            var arele = document.createElement("article");
            lsele.appendChild(arele);
            // insert <a>title</a>
            var aele = document.createElement("a");
            arele.appendChild(aele);
            aele.setAttribute("href", floc);
            aele.appendChild(title);
            // insert summary
            arele.appendChild(sum);
          });
        })();
      }
    }
  });
}

var xml;
function queryArticle(floc, callback) {
  $.ajax({
    "url": floc,
    "dataType": "xml",
    "success": function (doc) {
      xml = doc;
      var title = doc.querySelector("h1:first-of-type");
      var summ = doc.querySelector("h1:first-of-type + *");
      callback(title, summ);
    }
  })
}
