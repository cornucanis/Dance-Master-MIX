var player = {
	testvar: 2,
	resources: 	{
		salt: {name: "Salt", amount: 0},
		cinnamon: {name: "Cinnamon", amount: 0},
		sugar: {name: "Sugar", amount: 0},
		sugarcubes: {name: "Sugar Cubes", amount: 0},
		syrup: {name: "Syrup", amount: 0},
	},

	stats: {
		axePower: 0,
		axeMod: 1,
		syrupConsumption: 2
	},
	
	inventory: {
		axe: "none",
		oven: "none",
		crafting: "none",
		items: []
	},
	
	ovenMax: 100,
	ovenTime: 60000,
	autoChopDelay: 3000,
	minimumChop: 1000,
	mineProd: 1,
	
	flags: {
		testvar: 2,
		forestLocale: "meadow",
		beggar:true,
		store:false,
		forest:false,
		exchange:false,
		mines:false,
	// Resource flags determine exchange availability
		salt: {visible:false, unlocked:false},
		cinnamon: {visible:true, unlocked:false},
		sugar: {visible:false, unlocked:false},
		sugarcubes: {visible:false, unlocked:false},
		syrup: {visible:false, unlocked:false},
		purchased: {
			testvar: 2,
			nohandle: false,
			rusty: false,
			dull: false,
			plain: false,
			basicoven:false,
			basiccrafting:false
		},
		unlStory: [],
		unlCraft: [],
		upgrades: [],
		story: {
			s1: false,
			s2: false,
			s3: false,
			s4: false,
			s5: false,
			s6: false,
			s7: false,
			s8: false,
			s8: false,
			s9: false,
			s10: false,
			s11: false
		}
	},
	
	mines: {
		rockgarden: {name:"Rock Garden", plural: "Rock Gardens", price:5000, yield:1, multi:1.2, amount:0},
		pebblebeach: {name:"Pebble Covered Beach", plural: "Pebble Covered Beaches", price:40000, yield:12, multi:1.1, amount:0}
	},
	
	options: {
		autosave: {name:"Autosave", status:true},
		autochop: {name:"Autochop", status:true},
		autofire: {name:"Autofire", status:false}
	},
	
	sTimers: {
		ovenSave: {time:0, amount:0},
		woodSave: {time:0, amount:0}
	}
}

var multiSelect = {
	exchange: 1,
	exchangeCustom: false,
	mine: 1,
	oven: 1
}

var exchange = {
	cinnamon: {
		name:"Cinnamon",
		buy:20,
		sell:10,
		unlock: {
			type:"cinnamon",
			amount:40
		}
	},
	
	sugar: {
		name:"Sugar",
		buy:4,
		sell:2,
		unlock: {
			type:"sugar",
			amount:150
		}
	},
	
	sugarcubes: {
		name:"Sugar cubes",
		buy:300,
		sell:150,
		unlock: {
			type:"sugarcubes",
			amount:10
		}
	}
}

var acTimer = 0;
var tmpOTimer = 0;
var tmpTreeTimer = 0;
var treeAni = 0;
var begTimer = 0;


var storeInv = {
	axes: {
		none: {name:"none", power:0},
		nohandle: {name:"a handle-less hatchet", power:1, cost:50, visible:false},
		rusty: {name:"a rusty hatchet", power:3, cost:700, visible:false},
		dull: {name:"a dull hatchet", power:5, cost:1500, visible:false},
		plain: {name:"an ordinary hatchet", power:10, cost:3500, visible:false}
	},
	oven: {
		basicoven: {name:"Basic Oven", description: "A quaint little oven", cost:10000, unlocked:false, visible:false}
	},
	crafting: {
		basiccrafting: {name:"Simple Crafting Station", description: "You can make your own axes with this!", cost:50000, unlocked:false, visible:false}
	},
}


function paneToggle(on) {
	switch (on) {
		case "options":
			$("#story").hide();
			$("#options").show();
			$("#storypb").removeClass("activepane");
			$("#optionspb").addClass("activepane");
			break;

		case "story":
			$("#options").hide();
			$("#story").show();
			$("#optionspb").removeClass("activepane");
			$("#storypb").addClass("activepane");
			break;

		case "forest":
			$("#mines").hide();
			$("#craft").hide();
			$("#trees").show();
			$("#minepb").removeClass("activepane");
			$("#craftpb").removeClass("activepane");
			$("#forestpb").addClass("activepane");			
			break;

		case "mine":
			$("#trees").hide();
			$("#craft").hide();
			$("#mines").show();
			$("#forestpb").removeClass("activepane");
			$("#craftpb").removeClass("activepane");
			$("#minepb").addClass("activepane");			
			break;
			
		case "craft":
			$("#trees").hide();
			$("#mines").hide();
			$("#craft").show();
			$("#minepb").removeClass("activepane");
			$("#forestpb").removeClass("activepane");
			$("#craftpb").addClass("activepane");
			break;

		case "store":
			$("#exchange").hide();
			$("#upgrades").hide();
			$("#store").show();
			$("#exchangepb").removeClass("activepane");
			$("#upgradepb").removeClass("activepane");
			$("#storepb").addClass("activepane");			
			break;

		case "exchange":
			$("#store").hide();
			$("#upgrades").hide();
			$("#exchange").show();
			$("#storepb").removeClass("activepane");
			$("#upgradepb").removeClass("activepane");
			$("#exchangepb").addClass("activepane");			
			break;
			
		case "upgrade":
			$("#store").hide();
			$("#exchange").hide();
			$("#upgrades").show();
			$("#storepb").removeClass("activepane");
			$("#exchangepb").removeClass("activepane");
			$("#upgradepb").addClass("activepane");
			break;
			
		default:
			break;
	}
}

function beg() {
	var begAmt = 5;
	if (player.flags.unlStory.indexOf("s3") != -1) {
		begAmt = 10;
	};
	$("#begbutton").hide();
	$("#beglessbutton").show();
	begTimer = setTimeout(function() {
		$("#beglessbutton").hide();
		$("#begbutton").show();
	}, 2000);
	$("#beglessbutton").animate(
		{width:"0%"},
		2000,
		function() {
			$(this).css("width","90%");
				player.resources.salt.amount += Math.ceil(Math.random() * begAmt);
				$("#saltamt").html(player.resources.salt.amount);
				flash("r_salt", "#411", "#966", 400);
				flash("salt_n", "#321", "#966", 400);
		})
}

function drawResource(res) {
	$("#resources").append(
		"<span id='r_" + res + "' class='resource'><span class='resname' id='" + res + "_n'>" + player.resources[res].name + ":</span><br><span id='" + res + "amt' class='resamt'>0</span></span>"
		)
}

function buyItem(type,id) {
	switch (type) {
		case "axe":
			if (player.resources.salt.amount >= storeInv.axes[id].cost) {
				player.resources.salt.amount -= storeInv.axes[id].cost;
				if (storeInv.axes[id].power >= player.stats.axePower) {
					player.stats.axePower = storeInv.axes[id].power;
					player.inventory.axe = id
				};
				player.flags.purchased[id] = true;
				$("#a_" + id).remove();
				axeHtml();
			};
			break;
		
		case "oven":
			if (player.resources.salt.amount >= storeInv.oven[id].cost) {
				player.resources.salt.amount -= storeInv.oven[id].cost;
				player.flags.purchased[id] = true;
				player.inventory.oven = id;
				$("#ot_" + id).remove();
			};
			break;
		
		case "crafting":
			if (player.resources.salt.amount >= storeInv.crafting[id].cost) {
				player.resources.salt.amount -= storeInv.crafting[id].cost;
				player.flags.purchased[id] = true;
				player.inventory.crafting = id;
				$("#cr_" + id).remove();
			};
			break;
			
		default:
			break;
	};
}

// function buyAxe(axe) {
	// if (player.resources.salt.amount >= storeInv.axes[axe].cost) {
		// player.resources.salt.amount -= storeInv.axes[axe].cost;
		// if (storeInv.axes[axe].power >= player.stats.axePower) {
			// player.stats.axePower = storeInv.axes[axe].power;
			// player.inventory.axe = axe
		// };
		// player.flags.purchased[axe] = true;
		// $("#a_" + axe).remove();
		// axeHtml();
	// }
// }

// function buyOven(id) {
	// if (player.resources.salt.amount >= storeInv.oven[id].cost) {
		// player.resources.salt.amount -= storeInv.oven[id].cost;
		// player.flags.purchased[id] = true;
		// player.inventory.oven = id;
		// $("#ot_" + id).remove();
	// }
// }

function exchangeF(type, res) {
	switch (type) {
		case "buy":
			if (multiSelect.exchange == "max" && player.resources.salt.amount >= exchange[res].buy) {
				player.resources[res].amount += Math.floor(player.resources.salt.amount / exchange[res].buy);
				player.resources.salt.amount -= Math.floor(player.resources.salt.amount / exchange[res].buy) * exchange[res].buy;
				} else if (multiSelect.exchange != "max" && player.resources.salt.amount >= (exchange[res].buy * multiSelect.exchange)) {
				player.resources.salt.amount -= (exchange[res].buy * multiSelect.exchange);
				player.resources[res].amount += multiSelect.exchange;
			}
			break;
			
		case "sell":
			if (multiSelect.exchange == "max" && player.resources[res].amount >= 1) {
				player.resources.salt.amount += Math.floor(player.resources[res].amount) * exchange[res].sell;
				player.resources[res].amount = 0;
			} else if (multiSelect.exchange != "max" && player.resources[res].amount >= multiSelect.exchange) {
				player.resources[res].amount -= multiSelect.exchange;
				player.resources.salt.amount += (exchange[res].sell * multiSelect.exchange);
			}
			break;
		
		default:
			break;
	}
	excCheck();
}

function excUnlock(res) {
	if (player.resources[exchange[res].unlock.type].amount >= exchange[res].unlock.amount) {
		player.resources[exchange[res].unlock.type].amount -= exchange[res].unlock.amount;
		player.flags[res].unlocked = true;
		excCheck();
	}
}

function excUnlockHtml(res) {
		if (!$("#" + res + "unlock").html()) {
			$("#exchange").append(
				"<div id='" + res + "unlock' class='excunlock excdiv' onClick='excUnlock(\"" + res + "\")'><span id='" + res +
				"ubutton' class='excbutton'>Unlock " + player.resources[res].name + " Exchange</span><br> for <span id='" + res + "ucost' class='excucost'>"
				+ exchange[res].unlock.amount + " " + player.resources[exchange[res].unlock.type].name + "</span></div>"
			)
		}
}

function excMultiToggle(amt) {
	if (amt == 'custom') {
		if (multiSelect.exchangeCustom == false) {
			$("#excamt" + multiSelect.exchange).removeClass("actexcamt");
			$("#excamt" + multiSelect.exchange).addClass("inactexcamt");
		};
		if (isNaN(parseInt($("#excinput").val()))) {
			tmpMulti = 0;
		} else { tmpMulti = parseInt($("#excinput").val()) };
		multiSelect.exchange = tmpMulti;
		$("#excamtcustom").removeClass("inactexcamt");
		$("#excamtcustom").addClass("actexcamt");
		multiSelect.exchangeCustom = true;
	} else if (amt != 'custom' && multiSelect.exchange != amt) {
		if (multiSelect.exchangeCustom == true) {
			multiSelect.exchangeCustom = false;
			$("#excamtcustom").removeClass("actexcamt");
			$("#excamtcustom").addClass("inactexcamt");
		} else {
			$("#excamt" + multiSelect.exchange).removeClass("actexcamt");
			$("#excamt" + multiSelect.exchange).addClass("inactexcamt");
		};
		multiSelect.exchange = amt
		$("#excamt" + amt).removeClass("inactexcamt");
		$("#excamt" + amt).addClass("actexcamt");
	}
	excCheck();
}

function mineMultiToggle(amt) {
	if (multiSelect.mine != amt) {
		$("#mineamt" + multiSelect.mine).removeClass("actmineamt");
		$("#mineamt" + multiSelect.mine).addClass("inactmineamt");
		multiSelect.mine = amt
		$("#mineamt" + amt).removeClass("inactmineamt");
		$("#mineamt" + amt).addClass("actmineamt");
	}
	mineCheck();
}

function fireOven(amt, time) {
	var tmpOven = parseInt($("#ovenamt").val());
	var oTime = player.ovenTime;
	var sCost = tmpOven * 10;
	if (amt && amt > 0) {
		tmpOven = amt;
		oTime = time;
		sCost = 0;
	};
	if (player.resources.sugar.amount >= sCost && tmpOven > 0 && !$("#ovenbuttonoff").hasClass("firing")) {
		$("#ovenbuttonon").hide();
		$("#ovenbuttonoff").show();
		$("#ovenbuttonoff").addClass("firing");
		player.resources.sugar.amount -= sCost;
		player.sTimers.ovenSave.time = oTime
		player.sTimers.ovenSave.amount = tmpOven
		var oTimer = new Date().getTime();
		var oDone = oTimer + oTime;
		tmpOTimer = window.setInterval(
			function() {
				if ((oDone - (new Date().getTime())) >= 0) {
					if ((oDone - (new Date().getTime())) <= 1499) {
						$("#oventime").html("1 second left");
					} else {
						$("#oventime").html(Math.round((oDone - (new Date().getTime())) / 1000) + " seconds left");
						player.sTimers.ovenSave.time = oDone - (new Date().getTime());
					}
				} else {
					$("#oventime").html("");
					window.clearInterval(tmpOTimer);
				}
			}, 100
		);
		$("#ovenbar").animate(
			{width:"100%"},
			oTime,
			function() {
			$("#ovenbar").css("width","0%");
			player.resources.sugarcubes.amount += tmpOven;
			player.sTimers.ovenSave.time = 0;
			player.sTimers.ovenSave.amount = 0;
			flash("r_sugarcubes", "#411", "#966", 400);
			flash("sugarcubes_n", "#321", "#966", 400);
			$("#ovenbuttonoff").removeClass("firing");
			$("#ovenbuttonoff").hide();
			$("#ovenbuttonon").show();
			window.clearInterval(tmpOTimer);
			$("#oventime").html("");
		})
	};
}


function stopCook() {
$("#ovenbar").stop();
clearInterval(tmpOTimer);
$("#ovenbar").css("width","0%");
$("#ovenbuttonoff").removeClass("firing");
$("#ovenbuttonoff").hide();
$("#ovenbuttonon").show();
$("#oventime").html("");
}


function buyMine(sel) {
	var tmpCost = 0;
	if (multiSelect.mine == 1) {
		tmpCost = Math.round(player.mines[sel].price * Math.pow(player.mines[sel].multi, player.mines[sel].amount));
	} else {
		tmpCost = Math.round(player.mines[sel].price * Math.pow(player.mines[sel].multi, player.mines[sel].amount) * (Math.pow(player.mines[sel].multi, multiSelect.mine) - 1) / (player.mines[sel].multi - 1));
	};
	if (player.resources.salt.amount >= tmpCost) {
		player.resources.salt.amount -= tmpCost;
		player.mines[sel].amount += multiSelect.mine;
	}
	mineCheck();
}

function variance(input, min, max) {
	tmin = input * min;
	tmax = input * max;
	rand = Math.floor(Math.random() * (tmax - tmin + 1)) + tmin;
	return rand
}

function save() {
	var saveData = JSON.stringify(player);
	window.localStorage.setItem("player", saveData);
	status("Game Saved!")
}

		// Object.keys(player).forEach(function(j) {
			// if (tmpPlayer[j] == "undefined") {
				// tmpPlayer[j] = $.extend({}, player[j])
			// }
		// });
		// Object.keys(player.flags).forEach(function(k) {
			// if (tmpPlayer.flags[k] == "undefined") {
				// $.extend(tmpPlayer.flags[k], player.flags[k])
			// }
		// });
		// Object.keys(player.flags.purchased).forEach(function(j) {
			// if (tmpPlayer.flags.purchased[j] == "undefined") {
				// $.extend(tmpPlayer.flags.purchased[j], player.flags.purchased[j])
			// }
		// });

function load() {
	if (window.localStorage.getItem("player")) {
		clearTimers();
		if (JSON.parse(window.localStorage.getItem("player")).flags.unlStory) {
			player.flags.unlStory = JSON.parse(window.localStorage.getItem("player")).flags.unlStory;
		};
		if (JSON.parse(window.localStorage.getItem("player")).flags.unlCraft) {
			player.flags.unlCraft = JSON.parse(window.localStorage.getItem("player")).flags.unlCraft;
		};
		if (JSON.parse(window.localStorage.getItem("player")).flags.upgrades) {
			player.flags.upgrades = JSON.parse(window.localStorage.getItem("player")).flags.upgrades;
		};
		$.extend(true, player, JSON.parse(window.localStorage.getItem("player")))
		if (player.flags.unlStory.indexOf("s9") == -1) {
			player.sTimers.ovenSave.time = 0;
			player.sTimers.ovenSave.amount = 0;
		};
		fSwap();
		Object.keys(storyText).forEach(function(q) {
			if (player.flags.unlStory.indexOf(q) != -1) {
				storyText[q].load();
			};
		});
		Object.keys(craftables).forEach(function(qx) {
			if (player.flags.unlCraft.indexOf(qx) != -1) {
				craftables[qx].onLoad();
			};
		});
		Object.keys(upgrades).forEach(function(qu) {
			if (player.flags.upgrades.indexOf(qu) != -1) {
				upgrades[qu].onLoad();
			};
			if ($("#u_" + qu).html() && upgrades[qu].cond() == false) {
				$("#u_" + qu).remove();
			};
		});
		storyNew(true);
		status("Game Loaded!")
	} else {
		status("No save data!")
	};
	axeHtml();
	if (player.sTimers.ovenSave.time > 0) {
		fireOven(player.sTimers.ovenSave.amount, player.sTimers.ovenSave.time);
	};
	if (player.flags.beggar == false) {$(".beg").remove()};
}

function deleteSave() {
	if (window.localStorage.getItem("player")) {
		var confirm = prompt("Please type CONFIRM (case sensitive) to delete your save.");
		if (confirm == "CONFIRM") { 
			window.localStorage.removeItem("player");
			location.reload()
		} else {
			status("CONFIRMATION FAILED")
		}
	}
}

function eatShit() {
	if (player.resources.salt.amount >= 0 && $("#debughidden").hasClass("hidden")) {
		$("#debughidden").show();
		console.log("Enjoy the secret debug mode!");
		player.resources.salt.amount += 100000;
	}
	updateResources();
}

function optionToggle(opt) {
	if (player.options[opt].status) {
		player.options[opt].status = false;
		status(player.options[opt].name + " disabled!")
	} else {
		player.options[opt].status = true;
		status(player.options[opt].name + " enabled!")
	};
	optionCheck();
}

function credits(bool) {
	if (bool) {
		$("#creditbox").show();
	} else {
		$("#creditbox").hide();
	}
}

function mineCheck() {
	Object.keys(player.mines).forEach(function(sel) {
		if ((!$("#" + sel).html() && player.resources.salt.amount * 1.3 >= player.mines[sel].price) || (!$("#" + sel).html() && player.mines[sel].amount >= 1)) {
			$("#mines").append('<div id="' + sel + '" class="minearea" onClick="buyMine(\'' + sel + '\')"><span id="' + sel + 'amt" class="mineqty">' + player.mines[sel].amount + '</span> <span id="'+ sel +'name" class="minename">' + player.mines[sel].plural + '</span> Owned.<br><div class="minecost minesub">Cost: <span id="' + sel + 'cost">' + player.mines[sel].cost + '</span></div><div class="mineprod minesub"><span id="' + sel + 'prod">' + player.mines[sel].yield + '</span> Sugar /s</div>')
		};			
		if ($("#" + sel).html()) {
			if (!$("#" + sel + "name").hasClass("singular") && player.mines[sel].amount == 1) {
				var tmpName = $("#" + sel + "name").html();
				var newName = tmpName.slice(0,-1);
				$("#" + sel + "name").addClass("singular");
				$("#" + sel + "name").html(newName);
			};
			if ($("#" + sel + "name").hasClass("singular") && player.mines[sel].amount > 1) {
				$("#" + sel + "name").removeClass("singular");
				$("#" + sel + "name").append("s")
			};
			var tmpCost = 0;
			if (multiSelect.mine == 1) {
				tmpCost = Math.round(player.mines[sel].price * Math.pow(player.mines[sel].multi, player.mines[sel].amount));
			} else {
				tmpCost = Math.round(player.mines[sel].price * Math.pow(player.mines[sel].multi, player.mines[sel].amount) * (Math.pow(player.mines[sel].multi, multiSelect.mine) - 1) / (player.mines[sel].multi - 1));
			};
			$("#" + sel + "cost").html(numberformat.formatShort(tmpCost));
			$("#" + sel + "amt").html(player.mines[sel].amount);
			if (multiSelect.mine == 1 && player.resources.salt.amount <= Math.round(player.mines[sel].price * Math.pow(player.mines[sel].multi, player.mines[sel].amount))) {
				$("#" + sel).addClass("minenobuy");			
			} else if (multiSelect.mine != 1 && player.resources.salt.amount <= Math.round(player.mines[sel].price * Math.pow(player.mines[sel].multi, player.mines[sel].amount) * (Math.pow(player.mines[sel].multi, multiSelect.mine) - 1) / (player.mines[sel].multi - 1))) {
				$("#" + sel).addClass("minenobuy");
			};
			if ($("#" + sel).hasClass("minenobuy") && multiSelect.mine == 1 && player.resources.salt.amount >= Math.round(player.mines[sel].price * Math.pow(player.mines[sel].multi, player.mines[sel].amount))) {
				$("#" + sel).removeClass("minenobuy");
			} else if ($("#" + sel).hasClass("minenobuy") && multiSelect.mine != 1 && player.resources.salt.amount >= Math.round(player.mines[sel].price * Math.pow(player.mines[sel].multi, player.mines[sel].amount) * (Math.pow(player.mines[sel].multi, multiSelect.mine) - 1) / (player.mines[sel].multi - 1))) {
				$("#" + sel).removeClass("minenobuy");
			}
		}
	})
}

function resCheck() {
	Object.keys(player.resources).forEach(function(res) {
		if (player.resources[res].amount > 0 && $("#r_" + res).html() == undefined) {
			drawResource(res);
		}
		if ($("#r_" + res).html()) $("#" + res + "amt").html(numberformat.format(player.resources[res].amount));
	})
}

function storeCheck() {
	Object.keys(storeInv.axes).forEach(function (axe) {
		if (player.flags.purchased[axe] == false  && !$("#a_" + axe).html() && (3 * player.resources.salt.amount) >= storeInv.axes[axe].cost) {
			$("#store").append(
				"<div id='a_" + axe + "' class='storeitem' onclick='buyItem(\"axe\", \"" + axe + "\")'>" + storeInv.axes[axe].name + "<br>Cost:" + numberformat.formatShort(storeInv.axes[axe].cost) + "<br>Power:" + storeInv.axes[axe].power + "</div>"
			)
		};
		if ($("a_" + axe).html() && (3 * player.resources.salt.amount) < storeInv.axes[axe].cost) {
			$("#a_" + axe).remove();
		}
		if ($("#a_" + axe).html() && player.resources.salt.amount < storeInv.axes[axe].cost) {
			$("#a_" + axe).addClass("storenobuy");
		}
		if ($("#a_" + axe).hasClass("storenobuy") && player.resources.salt.amount >= storeInv.axes[axe].cost) {
			$("#a_" + axe).removeClass("storenobuy");
		}
	});	
	Object.keys(storeInv.oven).forEach(function (item) {
		if (storeInv.oven[item].visible == true && !$("#ot_" + item).html() && (3 * player.resources.salt.amount) >= storeInv.oven[item].cost && player.flags.purchased[item] == false) {
			$("#store").append(
				"<div id=\"ot_" + item + "\" class=\"storeitem\" onclick=\"buyItem('oven', '" + item + "')\">" + storeInv.oven[item].name + "<br>Cost:" + numberformat.formatShort(storeInv.oven[item].cost) + "<hr>" + storeInv.oven[item].description + "</div>"
			);
		};
		if ($("#ot_" + item).html() && (3 * player.resources.salt.amount) < storeInv.oven[item].cost) {
			$("#ot_" + item).remove();
		};
		if ($("#ot_" + item).html() && player.resources.salt.amount < storeInv.oven[item].cost) {
			$("#ot_" + item).addClass("storenobuy");
		};
		if ($("#ot_" + item).hasClass("storenobuy") && player.resources.salt.amount >= storeInv.oven[item].cost) {
			$("#ot_" + item).removeClass("storenobuy");
		}
	});	
	Object.keys(storeInv.crafting).forEach(function (item) {
		if (storeInv.crafting[item].visible == true && !$("#cr_" + item).html() && (3 * player.resources.salt.amount) >= storeInv.crafting[item].cost && player.flags.purchased[item] == false) {
			$("#store").append(
				"<div id='cr_" + item + "' class='storeitem' onclick='buyItem(\"crafting\", \"" + item + "\")'>" + storeInv.crafting[item].name + "<br>Cost:" + numberformat.formatShort(storeInv.crafting[item].cost) + "<hr>" + storeInv.crafting[item].description + "</div>"
			);
		};
		if ($("#cr_" + item).html() && (3 * player.resources.salt.amount) < storeInv.crafting[item].cost) {
			$("#cr_" + item).remove();
		};
		if ($("#cr_" + item).html() && player.resources.salt.amount < storeInv.crafting[item].cost) {
			$("#cr_" + item).addClass("storenobuy");
		};
		if ($("#cr_" + item).hasClass("storenobuy") && player.resources.salt.amount >= storeInv.crafting[item].cost) {
			$("#cr_" + item).removeClass("storenobuy");
		}
	});		
}

function tooltipCheck() {
	$("#autochoptooltip").html("Current delay:<br>" + player.autoChopDelay + " ms.");
	if (player.flags.beggar == true) {
		var begAmt = 5;
		if (player.flags.unlStory.indexOf("s3") != -1) {
			begAmt = 10;
		};
		$("#begtooltip").html("Gain 1-" + begAmt + " salt.<br>Takes 2 seconds.")
	};
	if (player.flags.unlStory.indexOf("s9") != -1) {
		var tmpOven = parseInt($("#ovenamt").val());
		if (tmpOven == "undefined" || isNaN(tmpOven)) {
			tmpOven = 0;
		};
		$("#ovenbuttontooltip").html("Cooking:<br>" + tmpOven + " cubes.<br><br>Costs:<br>" + tmpOven * 10 + " sugar.<br><br>Delay:<br>" + player.ovenTime / 1000 + " seconds.");
	};
	if (player.flags.purchased.basiccrafting == true) {
		Object.keys(craftables).forEach(function(id) {
			if ($("#" + id).html()) {
				var costHtml = "";
				Object.keys(craftables[id].cost).forEach(function(iq) {
					if (player.resources[iq].amount < craftables[id].cost[iq]) {
						costHtml += "<span class='highcost'>" + craftables[id].cost[iq] + " " + player.resources[iq].name + "</span><br>"
					} else {
						costHtml += "<span class='lowcost'>" + craftables[id].cost[iq] + " " + player.resources[iq].name + "</span><br>"
					}
				});
				$("#" + id + "tt").html(craftables[id].description + "<hr><span class='craftcost'>Costs:<hr></span>" + costHtml)
			}
		});
	};
	if (player.stats.axePower >= 50) {
		Object.keys(upgrades).forEach(function(uq) {
			if ($("#u_" + uq).html()) {
				var costHtml = "";
				Object.keys(upgrades[uq].cost).forEach(function(ux) {
					if (player.resources[ux].amount < upgrades[uq].cost[ux]) {
						costHtml += "<span class='highcost'>" + upgrades[uq].cost[ux] + " " + player.resources[ux].name + "</span><br>"
					} else {
						costHtml += "<span class='lowcost'>" + upgrades[uq].cost[ux] + " " + player.resources[ux].name + "</span><br>";
					};
				});
				$("#" + uq + "tt").html(upgrades[uq].description + "<hr><span class='upgradecost'>Costs:<hr></span>" + costHtml);
			}
		});
	};
}

function optionCheck() {
	Object.keys(player.options).forEach(function(opt) {
		if (player.options[opt].status && $("#o_" + opt).hasClass("optionoff")) {
			$("#o_" + opt).removeClass("optionoff")
		}
		if (!player.options[opt].status && !$("#o_" + opt).hasClass("optionoff")) {
			$("#o_" + opt).addClass("optionoff")
		}
	})
}

function excCheck() {
	Object.keys(player.resources).forEach(function(res) {
		if (!player.flags[res].unlocked && $("#" + res + "exchange").html()) {
			$("#" + res + "exchange").remove();
		};
		if (player.flags[res].visible && !player.flags[res].unlocked && !$("#" + res + "unlock").html()) {
			excUnlockHtml(res);
		};
		if (player.flags[res].unlocked && $("#" + res + "unlock").html()) {
			$("#" + res + "unlock").remove();
		};
		if ($("#" + res + "unlock").html()) {
			if (player.resources[exchange[res].unlock.type].amount < exchange[res].unlock.amount) {
				$("#" + res + "unlock").addClass("excnounlock");
			};
			if ($("#" + res + "unlock").hasClass("excnounlock") && player.resources[exchange[res].unlock.type].amount >= exchange[res].unlock.amount) {
				$("#" + res + "unlock").removeClass("excnounlock");
			};
		};
		if (multiSelect.exchangeCustom == true) {
			var tmpMulti = parseInt($("#excinput").val());
			if (isNaN(tmpMulti)) {
				tmpMulti = 0;
			};
			multiSelect.exchange = tmpMulti;
		}
		if (player.flags[res].unlocked && !$("#" + res + "exchange").html()) {
			$("#exchange").append(
				"<div id='" + res + "exchange' class='excdiv'><span id='" + res + "excname' class='excname'>" + player.resources[res].name + "</span><br>" +
				"<div id='buy" + res + "' class='excbuy exctrade tooltipparent' onClick='exchangeF(\"buy\",\"" + res + "\")'>Buy:<br><span class='" + res + "buy'>" + 
				exchange[res].buy * multiSelect.exchange + "</span> Salt<span id='" + res + "buytooltip' class='tooltiptext' onclick='event.stopPropagation()'>Buy <span class='buymulti" + res + "'>" + multiSelect.exchange + "</span> " + player.resources[res].name + " for <span class='" + res + "buy'>" + exchange[res].buy * multiSelect.exchange + "</span> Salt.</span></div>" + 
				"<div id='sell" + res + "' class='excsell exctrade tooltipparent' onClick='exchangeF(\"sell\",\"" + res + "\")'>Sell:<br><span class='" + res + "sell'>" +
				exchange[res].sell * multiSelect.exchange + "</span> Salt<span id='" + res + "selltooltip' class='tooltiptext'>Sell <span class='sellmulti" + res + "'>" + multiSelect.exchange + "</span> " + player.resources[res].name + " for <span class='" + res + "sell'>" + exchange[res].sell * multiSelect.exchange + "</span> Salt.</span></div></div>"
			)
		};
		if ($("#" + res + "exchange").html() && multiSelect.exchange == "max") {
			$("." + res + "buy").html(numberformat.formatShort(Math.floor(player.resources.salt.amount / exchange[res].buy) * exchange[res].buy));
			$("." + res + "sell").html(numberformat.formatShort(Math.floor(player.resources[res].amount) * exchange[res].sell));
			$(".sellmulti" + res).html(Math.floor(player.resources[res].amount));
			$(".buymulti" + res).html(Math.floor(player.resources.salt.amount / exchange[res].buy));
			if (player.resources.salt.amount < exchange[res].buy) {
				$("#buy" + res).addClass("excnotrade");
			} 
			if (player.resources[res].amount < 1) {
				$("#sell" + res).addClass("excnotrade");
			}
			if ($("#buy" + res).hasClass("excnotrade") && player.resources.salt.amount >= exchange[res].buy) {
				$("#buy" + res).removeClass("excnotrade");
			} 
			if ($("#sell" + res).hasClass("excnotrade") && player.resources[res].amount >= 1) {
				$("#sell" + res).removeClass("excnotrade")
			}
		} else if ($("#" + res + "exchange").html()) {
			$("." + res + "buy").html(numberformat.formatShort(multiSelect.exchange * exchange[res].buy));
			$("." + res + "sell").html(numberformat.formatShort(multiSelect.exchange * exchange[res].sell));
			$(".sellmulti" + res).html(multiSelect.exchange);
			$(".buymulti" + res).html(multiSelect.exchange);
			if (player.resources.salt.amount < multiSelect.exchange * exchange[res].buy) {
				$("#buy" + res).addClass("excnotrade");
			}
			if (player.resources[res].amount < multiSelect.exchange) {
				$("#sell" + res).addClass("excnotrade");
			}
			if ($("#buy" + res).hasClass("excnotrade") && player.resources.salt.amount >= multiSelect.exchange * exchange[res].buy) {
				$("#buy" + res).removeClass("excnotrade");
			}
			if ($("#sell" + res).hasClass("excnotrade") && player.resources[res].amount >= multiSelect.exchange) {
				$("#sell" + res).removeClass("excnotrade");
			}
		}
	})
}

function ovenCheck() {
	$("#ovenamt").attr("max", Math.min(player.ovenMax, Math.floor(player.resources.sugar.amount / 10)));
	if (player.options.autofire.status == true && !$("#ovenbuttonoff").hasClass("firing")) {fireOven()};
}


function clearTimers() {
	stopCook();
	stopChop();
	clearTimeout(begTimer);
}

function hack(inp) {
	switch (inp) {
		case "salt":
			player.resources.salt.amount+=100000;
			break;
		
		case "display":
			$("#pane1").show();
			$("#pane2").show();
			$("#exchangepb").show();
			$("#minepb").show();
			$("#ovendiv").show();
			Object.keys(exchange).forEach(function(ei) {
				excUnlockHtml(ei);
			});
			break;
	
		default:
			alert("Stop cheating if you don't know what you're doing!");
			break;
	}
}

function ovenMaxButton() {
	$("#ovenamt").val(Math.floor($("#ovenamt").attr("max")));
}

function status(mes) {
	$("#savestatus").stop(true, true);
	$("#savestatus").html(mes);
	$("#savestatus").animate(
		{color:"#BBD"},
		2000,
		function() {
		$("#savestatus").html("");
		$("#savestatus").css("color","#662")}
	);
}

function flash(id, start, end, ms) {
	$("#" + id).animate(
		{backgroundColor:end},
		ms,
		function() {
			$("#" + id).animate(
				{backgroundColor:start},
				ms,
				function() {
				$("#" + id).css("background-color","");
				}
			)
		}
	)
}

var tick = function() {
	storeCheck();
	resCheck();
	optionCheck();
	excCheck();
	mineCheck();
	ovenCheck();
	craftCheck();
	upgradeCheck();
	// storyCheck();
	storyNew(false);
	tooltipCheck();
	Object.keys(player.mines).forEach(function(sel) {
		player.resources.sugar.amount += player.mineProd * player.mines[sel].yield * player.mines[sel].amount / 10
	});
	if (player.resources.syrup.amount > 0) {player.resources.syrup.amount -= (player.stats.syrupConsumption / 10)};
	if (player.resources.syrup.amount < 0) {player.resources.syrup.amount = 0};
}

var asave = function() {
	if (player.options.autosave.status) {
		save();
		status("Game Autosaved!");
	}
}

function init() {
	$(".hiders").css("display","inline-block");
	$(".hiders").hide();
}

window.onload=function() {
	init();
	load();
	var tTimer = window.setInterval(tick, 100);
	var aTimer = window.setInterval(asave, 60000);
}


// > general cleanup:
// > offline production
// > add color highlighting for certain items in story text

// > long term:
// > mobile styling?