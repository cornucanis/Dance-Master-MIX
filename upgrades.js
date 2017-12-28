var upgrades = {
	powerfularm: {
		name:"Powerful Arm",
		description:"All this syrup helps you to swing your axe more forcefully.",
		cost: {
			syrup:50
		},
		cond: function() {return player.resources.syrup.amount >= 20},
		onBuy: function() {player.stats.axeMod = 1.5; axeHtml()},
		onLoad: function() {}		
	}
}

function buyUpgrade(id) {
	Object.keys(upgrades[id].cost).forEach(function(u) {
		if (player.resources[u].amount < upgrades[id].cost[u]) {
			throw console.log("Not enough " + player.resources[u].name + " to purchase " + upgrades[id].name + "!");
		}
	});
	Object.keys(upgrades[id].cost).forEach(function(v) {
		player.resources[v].amount -= upgrades[id].cost[v];
	});
	upgrades[id].onBuy();
	player.flags.upgrades.push(id);
	$("#u_" + id).remove();
}

function upgradeCheck() {
	Object.keys(upgrades).forEach(function(u) {
		if ((upgrades[u].cond()) && !$("#u_" + u).html() && player.flags.upgrades.indexOf(u) == -1) {
			$("#upgrades").append('<div id="u_' + u + '" class="upgrade tooltipparent" onClick="buyUpgrade(\'' + u + '\')">' + upgrades[u].name + '<span id="' + u + 'tt" class="tooltiptext upgradett"></span></div>')
		};
		if ($("#u_" + u).html() && player.flags.upgrades.indexOf(u) != -1) {
			$("#u_" + u).remove();
		};
		var costcheck = false;
		Object.keys(upgrades[u].cost).forEach(function(uu) {
			if (player.resources[uu].amount < upgrades[u].cost[uu]) {
				costcheck = true;
			}
		});
		if (costcheck == true) {
			$("#u_" + u).addClass("upgradeexpensive");
		} else {
			$("#u_" + u).removeClass("upgradeexpensive");
		}
	});
}