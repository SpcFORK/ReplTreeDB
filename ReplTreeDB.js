/*

    ,""""""""""""""""",^,"""""""""""",                  
  .l ?]]]]]]]]]]]]]]]].~.????????????.I                 
 ",!l]IIIIIIIIIIIIIIII,< ]]]]]]]]]]]] l                 
 l ]]]lllllllllllllIII:> ]]]]]]]]]]]] l                 
 l:iii>>>>>>>>>>>>>]]] ~ ]]]]]]]]]]]] l                 
 l`++++++++++++++++---.~ ]]]]]]]]]]]] l                 
 lIIIIIIIIIIIIIIIIIIII;~.??????----?? l                 
 lIlllllllllllllllllll:iI"""""",;:;''l;".               
 l;lllllllllllllllllll:l    '^,,Iii??]-i;".             
 `I,I:::::::::I,,,,,,,:`   ,;ii??]]]]]]]-i",            
   ,:iiiiiiiii:,          :IIii!!!!!!!?]]]I:"           
   l ]]]]]]]]] l           ^`````````l.]]]] i           
   l ]]]]]]]]] l                   .`l.]]]]?.I          
   l.?]]]]]]]] l         ,""""""""";!!?]]]]] l          
   `i ]]]]]]]] l        I.?????????-]]]]]]]I";          
    ;:I]]]]]]]l;""""""",! ]]]]]]]]]]]]]]]?!^;           
     I,i-]]]]]]-???????.~ ]]]]]]]]]]]]]?!,,^            
      ^IIi?-]]]]]]]]]]] ~ ]]]]]]]]]]??!,,^              
        ^I"I!!!!!!!!!!!">:!!!!!!!!!!,",^                
           ^```````````^ ^``````````^

> SPCFORK INTERACTIVE
> 2022 - 20XX

  "We we, y'all!"
  - tCOW/ICow

  Welcome to the SPCFORK INTERACTIVE! Embracing the spirit of innovation and collaboration, we're thrilled to have you here. We ask you to join us as we journey from 2022 to the uncharted future of 20XX and push the boundaries of innovation.

  We promote open discussion, idea exchange, and group problem-solving in this dynamic space. And if you're here, reading this, we dub you a real SPCFORK INTERACTIVE Member because you strive to grow learn and advance. You're just like us, and we are happy to have you in the informative, and bright future of the net!

  So let's start this adventure, prepared to build, motivate, and mold the future.

*/

const Database = require("@replit/database");

class TreeDB {
  constructor() {
    this.db = new Database();
    this.tree = {};
  }

  async set(path, value) {
    const segments = path.split(".");
    let current = this.tree;

    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i];
      if (!current[segment]) {
        current[segment] = {};
      }
      current = current[segment];
    }

    const leaf = segments[segments.length - 1];
    current[leaf] = value;

    await this.db.set("tree", this.tree);
  }

  async get(path) {
    const segments = path.split(".");
    let current = this.tree;

    for (const segment of segments) {
      if (!current[segment]) {
        return null;
      }
      current = current[segment];
    }

    return current;
  }

  async delete(path) {
    const segments = path.split(".");
    let current = this.tree;

    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i];
      if (!current[segment]) {
        return;
      }
      current = current[segment];
    }

    const leaf = segments[segments.length - 1];
    delete current[leaf];

    await this.db.set("tree", this.tree);
  }

  async list(prefix = "") {
    const matches = [];

    const traverse = (node, path) => {
      for (const key in node) {
        const currentPath = path ? `${path}.${key}` : key;
        if (currentPath.startsWith(prefix)) {
          matches.push(currentPath);
        }

        if (typeof node[key] === "object") {
          traverse(node[key], currentPath);
        }
      }
    };

    traverse(this.tree, "");

    return matches;
  }

  async update(path, updateFn) {
    const currentValue = await this.get(path);
    const updatedValue = updateFn(currentValue);
    await this.set(path, updatedValue);
  }

  async load() {
    this.tree = await this.db.get("tree") || {};
  }
}

module.exports = {
  TreeDB
}