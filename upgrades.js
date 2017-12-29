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
	},
	sugarrush: {
		name:"Sugar Rush",
		description:"Drinking this syrup makes you want some sugar to go with it. Doubles mine production.",
		cost: {
			syrup:50
		},
		cond: function() {return player.resources.syrup.amount >= 20},
		onBuy: function() {player.minimumChop = 500},
		onLoad: function() {}
	},
	impstamina: {
		name:"Improved Stamina",
		description:"Improve your stamina which allows you to autochop more quickly!",
		cost: {
			syrup:100
		
		},
		cond: function() {return player.resources.syrup.amount >= 45},
		onBuy: function() {player.autoChopDelay = 1500},
		onLoad: function() {}
	},
	hackandslash: {
		name:"Hack and Slash",
		description:"Decrease the minimum time required to chop weak trees!",
		cost: {
			syrup:100
		},
		cond: function() {return player.flags.upgrades.indexOf("powerfularm") != -1},
		onBuy: function() {player.minimumChop = 500},
		onLoad: function() {}
	},

	defacebeaches: {
		name:"Deface Beaches",
		description:"Get wasted on syrup sugar then go deface some beaches! Decreases the base cost of pebble beaches.",
		cost: {
			syrup:200,
			sugar:10000
		},
		cond: function() {return player.flags.upgrades.indexOf("sugarrush") != -1 && player.mines.pebblebeach.amount >= 3},
		onBuy: function() {player.mines.pebblebeach.price = 35000},
		onLoad: function() {}
	},
	impulsecontrol: {
		name:"Impulse Control",
		description:"With a little bit of willpower you can consume less syrup.",
		cost: {
			syrup:200
		},
		cond: function() {return player.resources.syrup.amount >= 90},
		onBuy: function() {player.stats.syrupConsumption = 1},
		onLoad: function() {}
	},
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