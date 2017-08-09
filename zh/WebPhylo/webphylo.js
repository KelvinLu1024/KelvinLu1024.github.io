/* usage:
   <NewickDescr> ::= {
   layout : <Layout>,
   newick : <String>
   }
   <PhyloXmlDescr> ::= {
   layout : <Layout>,
   phyloxml : <URL: path to xml file>
   }
   <Layout> ::= "unrooted" | "circular" | "rectangular"
*/

var WebPhylo = (function(){
  function sourceTypeToParser(srcType) {
    switch (srcType) {
      case "newick":
        return parseNewick;
      case "phyloxml":
        return parsePhyloXML;
      default:
        throw "Unknown source type: " + srcType;  
    }
  }
  function layoutXconfToConstructor(layout, raw_conf) {
    var conf = {};
    conf["extensions"] = [];
    if (raw_conf["enable_label"]) {
      conf["extensions"].push(WebTree.Extensions.LeafLabel);
    } else {
      // do nothing;
    }
    if (raw_conf["unit"] != undefined) {
      conf["branch_unit"] = raw_conf["unit"];
    } else {
      // do nothing;
    }
    var base = null;
    switch (layout) {
      case "unrooted":
        base = WebTree.unrooted;
        break;
      case "circular":
        base = WebTree.circular;
        conf["extensions"].push(WebTree.Extensions.ExtendBranch);
        break;
      case "rectangular":
        base = WebTree.rectangular;
        conf["leaf_size"] = raw_conf["leaf_height"] || 30;
        break;
      default:
        throw "miao";
    }
    return function (json) {
      return base(json, conf);
    }
  }
  function load(container, layout, sourceType, source, conf) {
    var confProto = {
      "enable_label": true
    }
    conf = Object.assign({}, confProto, conf);
    var parser = sourceTypeToParser(sourceType);
    var constructor = layoutXconfToConstructor(layout, conf);
    var json = parser(source);
    var tree = constructor(json);
    container.appendChild(tree["element"]);
    return tree;
  }
  return {
    "load": load
  };
})();
