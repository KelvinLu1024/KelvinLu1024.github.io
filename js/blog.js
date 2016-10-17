"use strict";

$(document).ready(loadBlogList);

function loadBlogList() {
    var listLoc = ".mayfly/page.list";
    var lsele = document.getElementById("blog-list");
    $.ajax({
	"url": listLoc,
	"dataType": "text",
	"success": function (txt) {
	    var ls = txt.split('\n').filter(function(x){return x});
	    console.log(ls);
	    for (var fname of ls) {
		if (fname != "index") {
		    (function () {
			var floc = "./" + fname + ".html";
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
	}
    });
}

var xml;
function queryArticle(floc, callback) {
    console.log(floc);
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
