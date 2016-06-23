"use strict";

$(document).ready(loadBlogList);

function loadBlogList() {
  var listLoc = "./article/.list.json";
  var contElem = document.getElementById("blog-list");
  $.ajax({
    "url": listLoc,
    "dataType": "json",
    "success": function (ls) {
      for (var fname of ls) {
        var artElem = document.createElement("article");
        var linkElem = document.createElement("a");
        var h1Elem = document.createElement("h1");
        var sumElem = document.createElement("p");
        contElem.appendChild(artElem);
        artElem.appendChild(linkElem);
        artElem.appendChild(sumElem)
        linkElem.appendChild(h1Elem);
        console.log(h1Elem, sumElem);
        var floc = "./article/" + fname;
        queryArticle(floc, function (title, sum) {
          linkElem.setAttribute("href", floc);
          h1Elem.appendChild(title);
          sumElem.appendChild(sum);
        });
      }
    }
  })
}

var xml;
function queryArticle(floc, callback) {
  $.ajax({
    "url": floc,
    "dataType": "xml",
    "success": function (doc) {
      console.log(doc, doc.querySelector);
      xml = doc;
      var title = doc.querySelector("h2:first-of-type").firstChild;
      var summ = doc.querySelector("h2:first-of-type + *");
      callback(title, summ);
    }
  })
}
