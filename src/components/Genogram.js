// import '../App.css';
import React, { Component } from "react";

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";

var genoData;

function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  go.Diagram.licenseKey = "adsfewfwaefasdfdsfs";
  const diagram = $(go.Diagram, {
    initialDocumentSpot: go.Spot.Bottom,
    initialViewportSpot: go.Spot.Bottom,
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    initialAutoScale: go.Diagram.Uniform,
    "clickCreatingTool.archetypeNodeData": {
      text: "new node",
      color: "lightblue",
    },
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),

    nodeSelectionAdornmentTemplate: $(
      go.Adornment,
      "Auto",
      { layerName: "Grid" }, // the predefined layer that is behind everything else
      $(go.Shape, "Circle", { fill: "#c1cee3", stroke: null }),
      $(go.Placeholder, { margin: 2 })
    ),
    // use a custom layout, defined below
    layout: $(GenogramLayout, {
      direction: 90,
      layerSpacing: 30,
      columnSpacing: 10,
    }),
  });

  function attrFill(a) {
    switch (a) {
      case "A":
        return "#00af54"; // green
      case "B":
        return "#f27935"; // orange
      case "C":
        return "#d4071c"; // red
      case "D":
        return "#70bdc2"; // cyan
      case "E":
        return "#fcf384"; // gold
      case "F":
        return "#e69aaf"; // pink
      case "G":
        return "#08488f"; // blue
      case "H":
        return "#866310"; // brown
      case "I":
        return "#9270c2"; // purple
      case "J":
        return "#a3cf62"; // chartreuse
      case "K":
        return "#91a4c2"; // lightgray bluish
      case "L":
        return "#af70c2"; // magenta
      case "S":
        return "#000000"; // black
      case "M":
        return "#d4071c"; // red
      default:
        return "transparent";
    }
  }
  var tlsq = go.Geometry.parse("F M1 1 l19 0 0 19 -19 0z");
  var trsq = go.Geometry.parse("F M20 1 l19 0 0 19 -19 0z");
  var brsq = go.Geometry.parse("F M20 20 l19 0 0 19 -19 0z");
  var blsq = go.Geometry.parse("F M1 20 l19 0 0 19 -19 0z");
  var slash = go.Geometry.parse(
    "F M38 0 L40 0 40 2 2 40 0 40 0 38z" + "F M40 38 L40 40 38 40 0 2 0 0 2 0z"
  );
  var plus = go.Geometry.parse(
    "F M18 2 L20 0 22 2 22 38 20 40 18 38z" +
      "F M2 22 L0 20 2 18 38 18 40 20 38 22z"
  );
  function maleGeometry(a) {
    switch (a) {
      case "A":
        return tlsq;
      case "B":
        return tlsq;
      case "C":
        return tlsq;
      case "D":
        return trsq;
      case "E":
        return trsq;
      case "F":
        return trsq;
      case "G":
        return brsq;
      case "H":
        return brsq;
      case "I":
        return brsq;
      case "J":
        return blsq;
      case "K":
        return blsq;
      case "L":
        return blsq;
      case "S":
        return slash;
      case "M":
        return plus;
      default:
        return tlsq;
    }
  }
  var tlarc = go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
  var trarc = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z");
  var brarc = go.Geometry.parse("F M20 20 B 0 90 20 20 19 19 z");
  var blarc = go.Geometry.parse("F M20 20 B 90 90 20 20 19 19 z");
  function femaleGeometry(a) {
    switch (a) {
      case "A":
        return tlarc;
      case "B":
        return tlarc;
      case "C":
        return tlarc;
      case "D":
        return trarc;
      case "E":
        return trarc;
      case "F":
        return trarc;
      case "G":
        return brarc;
      case "H":
        return brarc;
      case "I":
        return brarc;
      case "J":
        return blarc;
      case "K":
        return blarc;
      case "L":
        return blarc;
      case "S":
        return slash;
      case "M":
        return plus;
      default:
        return tlarc;
    }
  }

  diagram.nodeTemplateMap.add(
    "M",
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        { name: "ICON" },
        $(go.Shape, "Square", {
          width: 40,
          height: 40,
          strokeWidth: 2,
          fill: "white",
          stroke: "#919191",
          portId: "",
        }),
        $(
          go.Panel,
          {
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", maleGeometry)
              )
            ),
            margin: 1,
          },
          new go.Binding("itemArray", "a")
        )
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      )
    )
  );

  diagram.nodeTemplateMap.add(
    "F", // female
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        { name: "ICON" },
        $(go.Shape, "Circle", {
          width: 40,
          height: 40,
          strokeWidth: 2,
          fill: "white",
          stroke: "#a1a1a1",
          portId: "",
        }),
        $(
          go.Panel,
          {
            // for each attribute show a Shape at a particular place in the overall circle
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", femaleGeometry)
              )
            ),
            margin: 1,
          },
          new go.Binding("itemArray", "a")
        )
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      )
    )
  );

  diagram.nodeTemplateMap.add(
    "N", // Miscarriage
    $(
      go.Node,
      "Vertical",
      {
        locationSpot: go.Spot.Center,
        locationObjectName: "ICON",
        selectionObjectName: "ICON",
      },
      $(
        go.Panel,
        { name: "ICON" },
        $(go.Shape, "Triangle", {
          width: 40,
          height: 40,
          strokeWidth: 2,
          fill: "white",
          stroke: "#a1a1a1",
          portId: "",
        }),
        $(
          go.Panel,
          {
            // for each attribute show a Shape at a particular place in the overall circle
            itemTemplate: $(
              go.Panel,
              $(
                go.Shape,
                { stroke: null, strokeWidth: 0 },
                new go.Binding("fill", "", attrFill),
                new go.Binding("geometry", "", femaleGeometry)
              )
            ),
            margin: 1,
          },
          new go.Binding("itemArray", "a")
        )
      ),
      $(
        go.TextBlock,
        { textAlign: "center", maxSize: new go.Size(80, NaN), editable: true },
        new go.Binding("text", "n")
      )
    )
  );

  diagram.nodeTemplateMap.add(
    "LinkLabel",
    $(go.Node, {
      selectable: false,
      width: 1,
      height: 1,
      fromEndSegmentLength: 20,
    })
  );

  setupDiagram(diagram, genoData, 4 /* focus on this person */);

  diagram.linkTemplate = // for parent-child relationships
    $(
      go.Link,
      new go.Binding("routing", "routing"),
      {
        corner: 5,
        layerName: "Background",
        selectable: false,
        fromSpot: go.Spot.Bottom,
        toSpot: go.Spot.Top,
      },
      $(go.Shape, { stroke: "#424242", strokeWidth: 2 })
    );

  diagram.linkTemplateMap.add(
    "Marriage", // for marriage relationships
    $(
      go.Link,
      { selectable: false },
      $(go.Shape, { strokeWidth: 2.5, stroke: "#5d8cc1" /* blue */ })
    )
  );

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Shape,
      "Rectangle",
      { name: "SHAPE", fill: "white", strokeWidth: 0 },
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 8, editable: true }, // some room around the text
      new go.Binding("text").makeTwoWay()
    )
  );

  return diagram;
}

function setupDiagram(diagram, array, focusId) {
  diagram.model = go.GraphObject.make(go.GraphLinksModel, {
    // declare support for link label nodes
    linkLabelKeysProperty: "labelKeys",
    // this property determines which template is used
    nodeCategoryProperty: "s",
    // if a node data object is copied, copy its data.a Array
    copiesArrays: true,
    // create all of the nodes for people
    nodeDataArray: array,
    linkKeyProperty: "key",
  });
  setupMarriages(diagram);
  setupParents(diagram);

  var node = diagram.findNodeForKey(focusId);
  if (node !== null) {
    diagram.select(node);
    // remove any spouse for the person under focus:
    //node.linksConnected.each(function(l) {
    //  if (!l.isLabeledLink) return;
    //  l.opacity = 0;
    //  var spouse = l.getOtherNode(node);
    //  spouse.opacity = 0;
    //  spouse.pickable = false;
    //});
  }
}

function findMarriage(diagram, a, b) {
  // A and B are node keys
  var nodeA = diagram.findNodeForKey(a);
  var nodeB = diagram.findNodeForKey(b);
  if (nodeA !== null && nodeB !== null) {
    var it = nodeA.findLinksBetween(nodeB); // in either direction
    while (it.next()) {
      var link = it.value;
      // Link.data.category === "Marriage" means it's a marriage relationship
      if (link.data !== null && link.data.category === "Marriage") return link;
    }
  }
  return null;
}

// now process the node data to determine marriages
function setupMarriages(diagram) {
  var model = diagram.model;
  var nodeDataArray = model.nodeDataArray;
  for (var i = 0; i < nodeDataArray.length; i++) {
    var data = nodeDataArray[i];
    var key = data.key;
    var spouse = data.spouse;
    if (spouse !== undefined) {
      if (!Array.isArray(spouse)) spouse = [spouse];
      for (var j = 0; j < spouse.length; j++) {
        var wife = spouse[j];
        if (key === wife) {
          // or warn no reflexive marriages
          continue;
        }
        var link = findMarriage(diagram, key, wife);
        if (link === null) {
          // add a label node for the marriage link
          var mlab = { s: "LinkLabel" };
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          var mdata = {
            from: key,
            to: wife,
            labelKeys: [mlab.key],
            category: "Marriage",
          };
          model.addLinkData(mdata);
        }
      }
    }
    var spouse = data.spouse;
    if (spouse !== undefined) {
      if (!Array.isArray(spouse)) spouse = [spouse];
      for (var j = 0; j < spouse.length; j++) {
        var husband = spouse[j];
        if (key === husband) {
          // or warn no reflexive marriages
          continue;
        }
        var link = findMarriage(diagram, key, husband);
        if (link === null) {
          // add a label node for the marriage link
          var mlab = { s: "LinkLabel" };
          model.addNodeData(mlab);
          // add the marriage link itself, also referring to the label node
          var mdata = {
            from: key,
            to: husband,
            labelKeys: [mlab.key],
            category: "Marriage",
          };
          model.addLinkData(mdata);
        }
      }
    }
  }
}

// process parent-child relationships once all marriages are known
function setupParents(diagram) {
  var model = diagram.model;
  var nodeDataArray = model.nodeDataArray;
  for (var i = 0; i < nodeDataArray.length; i++) {
    var data = nodeDataArray[i];
    var key = data.key;
    var mother = data.m;
    var father = data.f;
    var twin = data.t;
    if (mother !== undefined && father !== undefined) {
      var link = findMarriage(diagram, mother, father);
      if (link === null) {
        // or warn no known mother or no known father or no known marriage between them
        if (window.console)
          window.console.log("unknown marriage: " + mother + " & " + father);
        continue;
      }
      var mdata = link.data;
      var mlabkey = mdata.labelKeys[0];
      if (twin !== undefined) {
        var cdata = { from: mlabkey, to: key, routing: go.Link.Normal };
      } else {
        var cdata = { from: mlabkey, to: key, routing: go.Link.Orthogonal };
      }
      diagram.model.addLinkData(cdata);
      // diagram.model.addLinkDataCollection(cdata);
    }
  }
}

function GenogramLayout() {
  go.LayeredDigraphLayout.call(this);
  this.initializeOption = go.LayeredDigraphLayout.InitDepthFirstIn;
  this.spouseSpacing = 30; // minimum space between spouses
}
go.Diagram.inherit(GenogramLayout, go.LayeredDigraphLayout);

GenogramLayout.prototype.makeNetwork = function (coll) {
  // generate LayoutEdges for each parent-child Link
  var net = this.createNetwork();
  if (coll instanceof go.Diagram) {
    this.add(net, coll.nodes, true);
    this.add(net, coll.links, true);
  } else if (coll instanceof go.Group) {
    this.add(net, coll.memberParts, false);
  } else if (coll.iterator) {
    this.add(net, coll.iterator, false);
  }
  return net;
};

// internal method for creating LayeredDigraphNetwork where husband/wife pairs are represented
// by a single LayeredDigraphVertex corresponding to the label Node on the marriage Link
GenogramLayout.prototype.add = function (net, coll, nonmemberonly) {
  var multiSpousePeople = new go.Set();
  // consider all Nodes in the given collection
  var it = coll.iterator;
  while (it.next()) {
    var node = it.value;
    if (!(node instanceof go.Node)) continue;
    if (!node.isLayoutPositioned || !node.isVisible()) continue;
    if (nonmemberonly && node.containingGroup !== null) continue;
    // if it's an unmarried Node, or if it's a Link Label Node, create a LayoutVertex for it
    if (node.isLinkLabel) {
      // get marriage Link
      var link = node.labeledLink;
      var spouseA = link.fromNode;
      var spouseB = link.toNode;
      // create vertex representing both husband and wife
      var vertex = net.addNode(node);
      // now define the vertex size to be big enough to hold both spouses
      vertex.width =
        spouseA.actualBounds.width +
        this.spouseSpacing +
        spouseB.actualBounds.width;
      vertex.height = Math.max(
        spouseA.actualBounds.height,
        spouseB.actualBounds.height
      );
      vertex.focus = new go.Point(
        spouseA.actualBounds.width + this.spouseSpacing / 2,
        vertex.height / 2
      );
    } else {
      // don't add a vertex for any married person!
      // instead, code above adds label node for marriage link
      // assume a marriage Link has a label Node
      var marriages = 0;
      node.linksConnected.each(function (l) {
        if (l.isLabeledLink) marriages++;
      });
      if (marriages === 0) {
        var vertex = net.addNode(node);
      } else if (marriages > 1) {
        multiSpousePeople.add(node);
      }
    }
  }
  // now do all Links
  it.reset();
  while (it.next()) {
    var link = it.value;
    if (!(link instanceof go.Link)) continue;
    if (!link.isLayoutPositioned || !link.isVisible()) continue;
    if (nonmemberonly && link.containingGroup !== null) continue;
    // if it's a parent-child link, add a LayoutEdge for it
    if (!link.isLabeledLink) {
      var parent = net.findVertex(link.fromNode); // should be a label node
      var child = net.findVertex(link.toNode);
      if (child !== null) {
        // an unmarried child
        net.linkVertexes(parent, child, link);
      } else {
        // a married child
        link.toNode.linksConnected.each(function (l) {
          if (!l.isLabeledLink) return; // if it has no label node, it's a parent-child link
          // found the Marriage Link, now get its label Node
          var mlab = l.labelNodes.first();
          // parent-child link should connect with the label node,
          // so the LayoutEdge should connect with the LayoutVertex representing the label node
          var mlabvert = net.findVertex(mlab);
          if (mlabvert !== null) {
            net.linkVertexes(parent, mlabvert, link);
          }
        });
      }
    }
  }

  while (multiSpousePeople.count > 0) {
    // find all collections of people that are indirectly married to each other
    var node = multiSpousePeople.first();
    var cohort = new go.Set();
    this.extendCohort(cohort, node);
    // then encourage them all to be the same generation by connecting them all with a common vertex
    var dummyvert = net.createVertex();
    net.addVertex(dummyvert);
    var marriages = new go.Set();
    cohort.each(function (n) {
      n.linksConnected.each(function (l) {
        marriages.add(l);
      });
    });
    marriages.each(function (link) {
      // find the vertex for the marriage link (i.e. for the label node)
      var mlab = link.labelNodes.first();
      var v = net.findVertex(mlab);
      if (v !== null) {
        net.linkVertexes(dummyvert, v, null);
      }
    });
    // done with these people, now see if there are any other multiple-married people
    multiSpousePeople.removeAll(cohort);
  }
};

// collect all of the people indirectly married with a person
GenogramLayout.prototype.extendCohort = function (coll, node) {
  if (coll.has(node)) return;
  coll.add(node);
  var lay = this;
  node.linksConnected.each(function (l) {
    if (l.isLabeledLink) {
      // if it's a marriage link, continue with both spouses
      lay.extendCohort(coll, l.fromNode);
      lay.extendCohort(coll, l.toNode);
    }
  });
};

GenogramLayout.prototype.assignLayers = function () {
  go.LayeredDigraphLayout.prototype.assignLayers.call(this);
  var horiz = this.direction === 0.0 || this.direction === 180.0;
  // for every vertex, record the maximum vertex width or height for the vertex's layer
  var maxsizes = [];
  this.network.vertexes.each(function (v) {
    var lay = v.layer;
    var max = maxsizes[lay];
    if (max === undefined) max = 0;
    var sz = horiz ? v.width : v.height;
    if (sz > max) maxsizes[lay] = sz;
  });
  // now make sure every vertex has the maximum width or height according to which layer it is in,
  // and aligned on the left (if horizontal) or the top (if vertical)
  this.network.vertexes.each(function (v) {
    var lay = v.layer;
    var max = maxsizes[lay];
    if (horiz) {
      v.focus = new go.Point(0, v.height / 2);
      v.width = max;
    } else {
      v.focus = new go.Point(v.width / 2, 0);
      v.height = max;
    }
  });
  // from now on, the LayeredDigraphLayout will think that the Node is bigger than it really is
  // (other than the ones that are the widest or tallest in their respective layer).
};

GenogramLayout.prototype.commitNodes = function () {
  go.LayeredDigraphLayout.prototype.commitNodes.call(this);
  // position regular nodes
  this.network.vertexes.each(function (v) {
    if (v.node !== null && !v.node.isLinkLabel) {
      v.node.position = new go.Point(v.x, v.y);
    }
  });
  // position the spouses of each marriage vertex
  var layout = this;
  this.network.vertexes.each(function (v) {
    if (v.node === null) return;
    if (!v.node.isLinkLabel) return;
    var labnode = v.node;
    var lablink = labnode.labeledLink;
    // In case the spouses are not actually moved, we need to have the marriage link
    // position the label node, because LayoutVertex.commit() was called above on these vertexes.
    // Alternatively we could override LayoutVetex.commit to be a no-op for label node vertexes.
    lablink.invalidateRoute();
    var spouseA = lablink.fromNode;
    var spouseB = lablink.toNode;
    // prefer fathers on the left, mothers on the right
    if (spouseA.data.s === "F") {
      // sex is female
      var temp = spouseA;
      spouseA = spouseB;
      spouseB = temp;
    }
    // see if the parents are on the desired sides, to avoid a link crossing
    var aParentsNode = layout.findParentsMarriageLabelNode(spouseA);
    var bParentsNode = layout.findParentsMarriageLabelNode(spouseB);
    if (
      aParentsNode !== null &&
      bParentsNode !== null &&
      aParentsNode.position.x > bParentsNode.position.x
    ) {
      // swap the spouses
      var temp = spouseA;
      spouseA = spouseB;
      spouseB = temp;
    }
    spouseA.position = new go.Point(v.x, v.y);
    spouseB.position = new go.Point(
      v.x + spouseA.actualBounds.width + layout.spouseSpacing,
      v.y
    );
    if (spouseA.opacity === 0) {
      var pos = new go.Point(v.centerX - spouseA.actualBounds.width / 2, v.y);
      spouseA.position = pos;
      spouseB.position = pos;
    } else if (spouseB.opacity === 0) {
      var pos = new go.Point(v.centerX - spouseB.actualBounds.width / 2, v.y);
      spouseA.position = pos;
      spouseB.position = pos;
    }
  });
  // position only-child nodes to be under the marriage label node
  this.network.vertexes.each(function (v) {
    if (v.node === null || v.node.linksConnected.count > 1) return;
    var mnode = layout.findParentsMarriageLabelNode(v.node);
    if (mnode !== null && mnode.linksConnected.count === 1) {
      // if only one child
      var mvert = layout.network.findVertex(mnode);
      var newbnds = v.node.actualBounds.copy();
      newbnds.x = mvert.centerX - v.node.actualBounds.width / 2;
      // see if there's any empty space at the horizontal mid-point in that layer
      var overlaps = layout.diagram.findObjectsIn(
        newbnds,
        function (x) {
          return x.part;
        },
        function (p) {
          return p !== v.node;
        },
        true
      );
      if (overlaps.count === 0) {
        v.node.move(newbnds.position);
      }
    }
  });
};

GenogramLayout.prototype.findParentsMarriageLabelNode = function (node) {
  var it = node.findNodesInto();
  while (it.next()) {
    var n = it.value;
    if (n.isLinkLabel) return n;
  }
  return null;
};

function handleModelChange(e) {
  console.log(e);
}

const Genogram = (props) => {
  genoData = props.Genogram;

  return (
    <div id="genogram">
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName="diagram-component"
        onModelChange={handleModelChange}
      />
    </div>
  );
};

export default Genogram;
