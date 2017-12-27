var trees = {
	none: {
		name:"nothing",
		health:0,
		yield:0,
		syield:0
	},
	
	se: {
		name:"a seedling",
		health:3,
		yield:3,
		syield:0
	},
	
	sa: {
		name:"a sapling",
		health:7,
		yield:6,
		syield:0
	},
	
	tt: {
		name:"a tiny tree",
		health:13,
		yield:10,
		syield: 0
	},
	
	st: {
		name:"a small tree",
		health:32,
		yield:22,
		syield: 1
	},
	
	nt: {
		name:"a normal tree",
		health:60,
		yield:38,
		syield: 2
	},
	
	m1: {
		name:"a maple seedling",
		health:100,
		yield:3,
		syield:10,
	},
	
	m2: {
		name:"a maple sapling",
		health:230,
		yield:7,
		syield: 15 
	},
	
	m3: {
		name:"a tiny maple",
		health:500,
		yield:12,
		syield: 22
	}
}

var currentTree = {
		name:"nothing",
		health:0,
		yield:0,
		syield:0
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
	smallmaple: {
		name:"Maple Grove", 
		l: 16, 
		a:{name:"nt", cap:2},
		b:{name:"m1", cap:9},
		c:{name:"m2", cap:13},
		d:{name:"m3", cap:15}
	},
}


function fSwap(frst) {
	if (frst) {
	player.flags.forestLocale = frst;
	};
	$("#fname").html(forests[player.flags.forestLocale].name)
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
			$.extend(currentTree, trees[forests[selFor].b.name])
		} else if (forests[selFor].c && rnd <= forests[selFor].c.cap) {
			$.extend(currentTree, trees[forests[selFor].c.name])
		} else if (forests[selFor].d && rnd <= forests[selFor].d.cap) {
			$.extend(currentTree, trees[forests[selFor].d.name])
		}
		tmpMod = (variance(10,0.8,1.2) / 10);
		currentTree.health = Math.round(tmpMod * currentTree.health);
		currentTree.yield  = Math.round(tmpMod * currentTree.yield);
		currentTree.syield = Math.round(tmpMod * currentTree.syield);
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
			if (player.stats.axePower >= 50) {player.resources.syrup.amount += currentTree.syield};
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
				acTimer = window.setTimeout(function() {chopTree();}, player.autoChopDelay);
			};
		})
	}
}

function treeHtml() {
	$("#treename").html(currentTree.name);
	$("#treehealth").html(currentTree.health);
	$("#treeyield").html(currentTree.yield);
	$("#treesyield").html(currentTree.syield);
}

function stopChop() {
$("#treebar").stop();
clearInterval(tmpTreeTimer);
$("#treebar").css("width","0%");
$("#choplessbutton").removeClass("chopping");
$("#choplessbutton").hide();
$("#chopbutton").show();
$("#treetime").html("");
$.extend(currentTree, trees.none);
treeHtml();
clearTimeout(acTimer);
}
