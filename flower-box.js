var _newbox_p = .40;
var _vbox_p   = .40;
var flower_update_time = 100;
var max_flowers = 10

var min_width = 50, min_height = 50;

/*
var color_list = ["rgb(114,90,158)",
                  "rgb(148,24,42)",
                  "rgb(227,95,126)",
                  "rgb(255,145,169)",];
*/                


var color_list = ["rgb(66,176,52)",
                  "rgb(214,223,21)",
                  "rgb(89,167,204)",
                  "rgb(213,54,29)",];
                


// http://stackoverflow.com/a/9614662/249341
jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};


var loaded_flowers = 0;
var svg_list  = ["images/flower_1.svg", 
                 "images/flower_2.svg", 
                 "images/flower_3.svg", 
                 "images/flower_4.svg", 
                 "images/flower_5.svg", 
                 "images/flower_6.svg", ];
var garden_man;


$(document).ready(function() {

    flower_storage = $('<div>', 
                       {id:"flower_storage",});
    flower_storage.hide();
    $("body").append(flower_storage);
    
    svg_list.forEach(function(entry) {
        flr  = $('<svg>');
        vase = $('<div>');
        vase.attr("id", "vase"+loaded_flowers);
        vase.attr("class", "vase");
        flr.load(entry);
        vase.append(flr[0]);
        $("#flower_storage").append(vase);
        console.log("Loading SVG",entry);
        loaded_flowers += 1;
    });

    flower_storage.ready(function() {
        console.log("Starting garden_man");
        garden_man = setInterval(cycle_flowers,flower_update_time);
    });

});

$(window).click(function(){
    location.reload();
    
//    $(this).remove();
//    solve_all_artboxes();
//solve_all_artboxes();
});





/*
$(document).ready(function() {
//    $(".flowerbox").on("ready", garden);
    $(".flowerbox").on("click", garden);
}); 

$(window).on("load", function() { 
    garden_man = setInterval(cycle_flowers,flower_update_time);
});
*/

var flower_builds=0;
function cycle_flowers() {
    flower_builds += 1;
    $(".flowerbox").each(garden);

    if(flower_builds > max_flowers) {
        clearInterval(garden_man);
        flower_builds = 0;
    }
};




// Random number between min and max INCLUSIVE
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Randomly inserts an item into the objects, e.g.
// *|*|*|* are all valid locations for three objects
function append_between(objs, item) {
    var n = objs.length;
    var idx = randInt(0, n);  // Grab one larger
    if(idx==0) { return item.prependTo(objs.eq(0)); };
    return item.appendTo(objs.eq(idx-1));
};

function insert_between(objs, item) {
    var n = objs.length;
    var idx = randInt(0, n);  // Grab one larger
    if(idx==0) { return objs.eq(0).before(item); };
    return objs.eq(idx-1).after(item);
};

function new_random_nest() {

    var flowers = $("#flower_storage .vase");
    var select_flower = flowers.eq(randInt(0,flowers.length-1)).clone();
    var g_box = select_flower.find('svg g');

    var color = color_list[randInt(0,color_list.length-1)];
    g_box.css("fill",color);

    //var color = color_list[randInt(0,color_list.length-1)];
    //g_box.css("stroke",color);
    //console.log(g_box);

    node = $('<div>', {"class":"node",html:select_flower});
      
    if(Math.random() < _vbox_p) { className = "vbox"; }
    else { className = "hbox"; };

    new_box = $('<div>',{"class":className,html:node});

    return new_box;
};

function garden() {

    var info = new_random_nest();
    var boxes       = $(this).find(".hbox, .vbox");
    var select_box  = boxes.eq(randInt(0,boxes.length-1));    

    // Grow a new nest
    if(Math.random() < _newbox_p) {

        var kids = select_box.children(".hbox, .vbox");       
        
        if(kids.length==0) {
            select_box.append(info); 
        }
        else {
            append_between(kids, info);
        };
    }

    // Add a flower in a nest already grown
    else {
        var boxes = $(this).find(".hbox, .vbox");
        var select_box  = boxes.eq(randInt(0,boxes.length-1));
        var kids = select_box.children(".node, .hbox, .vbox");

        if(kids.length==0) {
            //console.log("Strange, empty nest...");
            //select_box.remove();
        }
        else {
            insert_between(kids, info);      
        };
    }


    select_box.ready(function(){
        //console.log("SIZING",$(this));
        solve_all_artboxes();
    });

};

/*
function load_when_ready(item,func) {
    console.log("HI!");
    if(img.data("loaded")==false) {
        setTimeout(load_when_ready, 5, item,func);
            console.log("NOT!");
    }
    else {
        func();
        item.visible();
    };
};
*/