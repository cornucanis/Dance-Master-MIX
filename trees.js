var trees = {
	none: {
		name:"nothing",
		health:0,
		yield:0
	},
	
	se: {
		name:"a seedling",
		health:3,
		yield:3
	},
	
	sa: {
		name:"a sapling",
		health:7,
		yield:6
	},
	
	tt: {
		name:"a tiny tree",
		health:13,
		yield:10
	},
	
	st: {
		name:"a small tree",
		health:32,
		yield:22
	},
	
	nt: {
		name:"a normal tree",
		health:60,
		yield:38
	}
}

var currentTree = {
		name:"no tree",
		health:0,
		yield:0
}

var forests = {
	meadow: {
		name:"Meadow", 
		l: 10, 
		a:{name:"se", cap:7},
		b:{name:"sa", cap:10}
	},
	
	edge: {
		name:"Forest Edge", 
		l:10, 
		a:{name:"sa", cap:2}, 
		b:{name:"tt", cap:7},
		c:{name:"st", cap:9},
		d:{name:"nt", cap:10}
	},
}


function fSwap(frst) {
	player.flags.forestLocale = frst;
	$("#fname").html(forests[frst].name)
}

function updateResources() {
	window.alert("Hah! I can't believe you actually typed that.");
}

function chopTree() {
	if (player.stats.axePower > 0 && !$("#choplessbutton").hasClass("chopping")) {
		clearTimeout(acTimer);
		acTimer = 0;
		$("#chopbutton").hide();
		$("#choplessbutton").show();
		$("#choplessbutton").addClass("chopping");
		var selFor = player.flags.forestLocale;
		var rnd = Math.ceil(forests[selFor].l * Math.random());
		if (forests[selFor].a && rnd <= forests[selFor].a.cap) {
			$.extend(currentTree, trees[forests[selFor].a.name])
		} else if (forests[selFor].b && rnd <= forests[selFor].b.cap) {
			$.extend(currentTree, trees[forests[selFor].a.name])
		} else if (forests[selFor].c && rnd <= forests[selFor].c.cap) {
			$.extend(currentTree, trees[forests[selFor].a.name])
		} else if (forests[selFor].d && rnd <= forests[selFor].d.cap) {
			$.extend(currentTree, trees[forests[selFor].a.name])
		}
		tmpMod = (variance(10,0.8,1.2) / 10);
		currentTree.health = Math.round(tmpMod * currentTree.health);
		currentTree.yield  = Math.round(tmpMod * currentTree.yield);
		treeHtml();
		var treeTime = Math.max(1000, (currentTree.health / (player.stats.axePower * player.stats.axeMod)) * 1000);
		var treeTimer = new Date().getTime();
		var treeDone = treeTimer + treeTime;
		tmpTreeTimer = window.setInterval(
			function() {
				if ((treeDone - (new Date().getTime())) >= 0) {
					if ((treeDone - (new Date().getTime())) <= 1499) {
						$("#treetime").html("1 second left");
					} else {
						$("#treetime").html(Math.round((treeDone - (new Date().getTime())) / 1000) + " seconds left");
					}
				} else {
					$("#treetime").html("");
					window.clearInterval(tmpTreeTimer);
				}
			}, 100
		);
		$("#treebar").animate(
			{width:"100%"},
			treeTime,
			function() {
			$("#treebar").css("width","0%");
			player.resources.cinnamon.amount += currentTree.yield;
			flash("r_cinnamon", "#411", "#966", 400);
			flash("cinnamon_n", "#321", "#966", 400);
			$.extend(currentTree, trees.none)
			$("#choplessbutton").removeClass("chopping");
			$("#choplessbutton").hide();
			$("#chopbutton").show();
			$("#treetime").html("");
			window.clearInterval(tmpTreeTimer);
			treeHtml();
			if (player.options.autochop.status == true) {
				acTimer = window.setTimeout(function() {chopTree();}, 3000);
			};
		})
	}
}

function stopChop() {
$("#treebar").stop();
clearInterval(tmpTreeTimer);
$("#treebar").css("width","0%");
$("#choplessbutton").removeClass("chopping");
$("#choplessbutton").hide();
$("#chopbutton").show();
$("#treetime").html("");
currentTree = trees.none;
treeHtml();
clearTimeout(acTimer);
}
