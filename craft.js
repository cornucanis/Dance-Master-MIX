var craftables = {
	sturdyaxe: {
		name: "Sturdy Axe",
		description: "A nice, sturdy axe!",
		cost:{
			cinnamon: 1000,
			sugarcubes: 150
		},
		cond: function() { return true },
		onBuy: function() {
			if (player.stats.axePower < 50) { player.stats.axePower = 50; player.inventory.axe = "sturdyaxe" };
			axeHtml();
		},
		onLoad: function() {}
	}
}

var axeTable = {
		none: {name:"none", power:0},
		nohandle: {name:"a handle-less hatchet", power:1},
		rusty: {name:"a rusty hatchet", power:3},
		dull: {name:"a dull hatchet", power:5},
		plain: {name:"an ordinary hatchet", power:10},
		sturdyaxe: {name:"a sturdy axe", power:50}
}

function axeHtml() {
	$("#axename").html(axeTable[player.inventory.axe].name);
	$("#axepower").html(player.stats.axePower * player.stats.axeMod);
}

function craftItem(id) {
	Object.keys(craftables[id].cost).forEach(function(u) {
		if (player.resources[u].amount < craftables[id].cost[u]) {
			throw console.log("Not enough " + player.resources[u].name + " to purchase " + craftables[id].name + "!");
		}
	});
	Object.keys(craftables[id].cost).forEach(function(v) {
		player.resources[v].amount -= craftables[id].cost[v];
	});
	craftables[id].onBuy();
	player.flags.unlCraft.push(id);
	$("#" + id).remove();
}


function craftCheck() {
	Object.keys(craftables).forEach(function(cq) {
		if ((craftables[cq].cond()) && !$("#" + cq).html() && player.flags.unlCraft.indexOf(cq) == -1) {
			$("#craftingbox").append('<div id="' + cq + '" class="craftitem tooltipparent" onClick="craftItem(\'' + cq + '\')">' + craftables[cq].name + '<span id="' + cq + 'tt" class="tooltiptext crafttooltip"></span></div>');
		};
		if ($("#" + cq).html && ( craftables[cq].cond() == false || player.flags.unlCraft.indexOf(cq) != -1 )) {
			$("#" + cq).remove();
		};
		var costcheck = false;
		Object.keys(craftables[cq].cost).forEach(function(qc) {
			if (player.resources[qc].amount < craftables[cq].cost[qc]) {
				costcheck = true;
			}
		});
		if (costcheck == true) {
		$("#" + cq).addClass("craftexpensive");
		} else {
		$("#" + cq).removeClass("craftexpensive");
		};		
	});
	axeHtml();
}

