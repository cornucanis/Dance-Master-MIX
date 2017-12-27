
var storyText = {
	s1: {
		text: "<p>I awoke on the side of the road reeking of bodily fluids. Ugh. Piercing headache. I really shouldn't have gotten so wasted last night. I have to lay off the syrup.</p>I can't keep living like this. <br><br>Something has to change.<p>It's already hard enough to get by as a begger when you're not hungover and reeking. Well, I guess it's time to see how generous the citizens are feeling today.</p>",
		cond: function() { return true },
		get: function() {
		},
		load: function() {
		},
	},
	s2: {
		text: "<p>Well, thanks to the generosity of the city's denizens I've managed to amass 30 salt. That's enough to buy a couple pints down at the pub! I start heading down the street to the pub, but on the way I pass through the market district and begin to reconsider my priorities..</p><p>Perhaps it's time to begin investing my salt in wiser ventures that don't leave me feeling miserable the next morning . . .</p>",
		cond: function() { return player.resources.salt.amount >= 30 && player.flags.unlStory.indexOf("s1") != -1},
		get: function() {
			$("#pane1").show();
			flash("pane1", "#DDF", "#FFF", 400);
			var flt = setInterval (
				function() {
				flash("pane1", "#DDF", "#FFF", 400);
				}, 800
			);
			setTimeout(function() {
				clearInterval(flt);
			}, 2400)
		},
		load: function() {
			$("#pane1").show();
		},	
	},
	s3: {
		text: "<p>A weapon! Perfect! Now I can start mugging people for pub money! Wait.. That's the old way of thinking. I'm better than that now. I'm sure there are better uses for this hatchet. After using my new weapon as an aid to \"consult\" with a few people I eventually determine that I can use it to chop down the cinnamon trees that grow on the outskirts of town.</p><p>That's great news! A big ol' stick will be a great aid for future consultations! For some reason just having this weapon already seems to make people more generous when I'm begging.</p>",
		cond: function() { return player.flags.purchased.nohandle && player.flags.unlStory.indexOf("s2") != -1},
		get: function() {
			$("#pane2").show();
			flash("pane2", "#DDF", "#FFF", 400);
			var flt = setInterval (
				function() {
				flash("pane2", "#DDF", "#FFF", 400);
				}, 800
			);
			setTimeout(function() {
				clearInterval(flt);
			}, 2400)
		},	
		load: function() {
			$("#pane2").show();
		},
	},
	s4: {
		text: "<p>This is pretty fun! I don't know why I didn't start gathering sticks sooner! Nobody gives you any trouble when you pull out a big stick. Things are starting to look up for me, but I'm still not satisfied. Surely there must be a way for me to amass even more power.</p><p>After using my big stick to consult with a few more people I finally learn that I can sell these sticks for salt! My latest cowering friend points me towards the exchange and I give him a big whack with my stick as thanks.</p><p>I arrive at the exchange ready to do some work with my stick, but I'm dismayed to find that everyone here has their own sticks. A guy with a very big stick asks me what I'm doing here and I explain to him that I'm just looking around.</p><p>He tells me that nothing is free here and if I can't afford the entry fee I'll have to either leave or come back with a much bigger stick. I guess I'll have to pay for my entry like everyone else... It's enough to make a guy want to just head down to the pub.</p>",
		cond: function() { return player.resources.cinnamon.amount >= 30 && player.flags.unlStory.indexOf("s3") != -1 },
		get: function() {
			$("#exchangepb").show();
			flash("exchangepb", "#CEC", "#FFF", 400);
			var flt = setInterval (
				function() {
				flash("exchangepb", "#CEC", "#FFF", 400);
				}, 800
			);
			setTimeout(function() {
				clearInterval(flt);
			}, 2400)
		},	
		load: function() {
			$("#exchangepb").show();
		},
	},
	s5: {
		text: "<p>Now we're talking! I can really earn some salt at this exchange. Who needs begging with this kind of payoff? Of course it still doesn't hurt to beg on my way around town...</p><p>I'm getting tired of this hatchet, though. I should really get one with a handle. I should easily be able to afford a better axe now which will make chopping these trees easier.</p>",
		cond: function() { return player.flags.cinnamon.unlocked && player.flags.unlStory.indexOf("s4") != -1 },
		get: function() {},	
		load: function() {
		},
	},
	s6: {
		text: "<p>I'm feeling pretty wealthy now. I don't think I really need to beg any more.</p><p>I've been spending a lot of time at the cinnamon exchange lately. There are a lot of people coming and going here, but I can't help noticing that the business here pales in comparison to the volume of business received by the sugar exchange next door.</p>I need to find out more about this \"sugar\" stuff.<p>I watch one of the patrons exit the exchange and follow him into an alley before brandishing my hatchet. He seems to be a friendly guy as he is quick to explain this substance.</p><p>Apparently \"sugar\" is a very spicy seasoning that it can be obtained by finding and breaking up sugar rocks. I give him a whack on the noggin with my hatchet to thank him for being so helpful.</p><p>I've seen a lot of people with rock gardens around town. I bet if I pay the guards some salt to look the other way I can gather my sugar from these gardens.</p>",
		cond: function() { return player.flags.purchased.plain && player.flags.unlStory.indexOf("s5") != -1 },
		get: function() {
			$("#minepb").show();
			flash("minepb", "#CEC", "#FFF", 400);
			var flt = setInterval (
				function() {
				flash("minepb", "#CEC", "#FFF", 400);
				}, 800
			);
			setTimeout(function() {
				clearInterval(flt);
			}, 2400)
		},
		load: function() {
			$("#minepb").show();
		},	
	},
	s7: {
		text: "<p>This isn't so hard after all! I've only had to thank a few people with my hatchet for letting me make use of their gardens. I'd already paid the guards so they used their axes to help me thank the citizens too! How thoughtful!</p><p> I can almost afford to enter the sugar exchange now. I'm so excited; judging by the volume of activity at the sugar exchange I know this stuff must be worth a fortune!</p>",
		cond: function() { return player.resources.sugar.amount >= 100  && player.flags.unlStory.indexOf("s6") != -1},
		get: function() {excUnlockHtml("sugar")},	
		load: function() {excUnlockHtml("sugar")},
	},
	s8: {
		text: "<p>At last, the day has arrived. I have amassed enough sugar to finally enter the much anticipated sugar exchange.</p><p>Unfortunately, things are not always so simple in life. I enter the exchange with resounding disappointment.</p><p>This stuff is almost worthless! Why could there possibly be so many people doing business here? Thankfully I know how to get information by now.</p><p>With my hatchet in tow, I follow an unsuspecting exchange patron into an alley. By the time I get an explanation from him there's a puddle under him that I didn't notice before. Huh. I wonder where that came from. I thank him over the head with my axe and move on.</p><p>It turns out, he explained, that sugar is far too spicy of a seasoning for anybody to enjoy in its natural state. The people at the sugar exchange are there to buy sugar for processing into cubes.</p><p>The sugar cubes are produced by putting sugar into an oven, and people use the sugar cubes as a seasoning to make stews spicier. I guess I should head down to the market and buy myself an oven.</p>",
		cond: function() { return player.flags.sugar.unlocked  && player.flags.unlStory.indexOf("s7") != -1},
		get: function() {storeInv.oven.basicoven.visible = true;},
		load: function() {storeInv.oven.basicoven.visible = true;},	
	},
	s9: {
		text: "<p>According to the instruction manual for this oven each sugar cube requires 10 sugar to produce, and the oven can produce up to 100 cubes in a batch. Furthermore, each batch takes 60 seconds to cook. Thankfully the sugar cube exchange only costs 10 cubes for entry so I should be able to find out if this was all worth it very soon.</p>",
		cond: function() { return player.flags.purchased.basicoven  && player.flags.unlStory.indexOf("s8") != -1},
		get: function() {
			excUnlockHtml("sugarcubes");
			$("#craftpb").show();
			flash("craftpb", "#CEC", "#FFF", 400);
			var flt = setInterval (
				function() {
				flash("craftpb", "#CEC", "#FFF", 400);
				}, 800
			);
			setTimeout(function() {
				clearInterval(flt);
			}, 2400)
		},	
		load: function() {excUnlockHtml("sugarcubes"); $("#craftpb").show();},
	},
	s10: {
		text: "<p>I'm really starting to see some payoff from my hard work. I can earn more money than ever before with this sugar cube exchange. I'm still not satisfied, though. I still see people with bigger sticks than mine and that just can't be ignored.</p><p>My crafting room is feeling pretty empty with only an oven. Perhaps I should purchase something else to give it some company...</p>",
		cond: function() { return player.flags.sugarcubes.unlocked  && player.flags.unlStory.indexOf("s9") != -1},
		get: function() {storeInv.crafting.basiccrafting.visible = true},	
		load: function() {storeInv.crafting.basiccrafting.visible = true},
	},
	s11: {
		text: "<p>No rest for the wicked. I have my crafting station set up, and I don't intend to let it gather dust. The problem is that I'm not sure what to use it for.</p><p>While out chopping trees I notice a grove of trees with red leaves. I walk up to a bystander with my hatchet resting on my shoulder and he hastily explains that these are maple trees, famous for their syrup production.</p><p>I should know better by now... But I just can't help myself.. I need some of that syrup..</p><p>After much effort, I found that my current hatchet is quite ineffective against these dense trees. I guess I know what I should build first with my crafting station!</p>",
		cond: function() { return player.flags.purchased.basiccrafting == true && player.flags.unlStory.indexOf("s10") != -1 },
		get: function() {
			$("#f_smallmaple").show();
			flash("f_smallmaple", "#5A8", "#6F9", 400);
			var flt = setInterval (
				function() {
				flash("f_smallmaple", "#5A8", "#6F9", 400);
				}, 800
			);
			setTimeout(function() {
				clearInterval(flt);
			}, 2400)
			$("#craftingbox").show();
		},	
		load: function() {
			$("#f_smallmaple").show();
			$("#craftingbox").show();
		},
	},
		s12: {
		text: "<p>Excellent! Now I can finally harvest the sticky stuff fresh from the source myself. No more going through middlemen. This is just what I've always wanted... What could possibly go wrong?</p>.......<br><br>...",
		cond: function() { return player.flags.unlCraft.indexOf("sturdyaxe") != -1 && player.flags.unlStory.indexOf("s11") != -1 },
		get: function() {
			$("#treedatasyrup").show()
		},	
		load: function() {
			$("#treedatasyrup").show()
		},
	},
}

function storyNew(load) {
	Object.keys(storyText).forEach(function(t) {
		if (storyText[t].cond() && player.flags.unlStory.indexOf(t) == -1) {
			player.flags.unlStory.push(t);
			storyText[t].get();
		};
		if (!$("#story" + t).html() && player.flags.unlStory.indexOf(t) != -1 && storyText[t].text) {
			$("#storybox").prepend('<div id="story' + t + '" class="story">' + storyText[t].text + '</div><br><hr><br>');
			if (load == false) {
				flash("story" + t, "#D5D5DD", "#F0F0FF", 500);
				setTimeout(function() {flash("story" + t, "#D5D5DD", "#F0F0FF", 500)}, 1000)
			};
		};	
	});
	if (player.flags.unlStory.indexOf("s6") != -1 && player.flags.beggar == true) {
		player.flags.beggar = false;
	};
	if (player.flags.beggar == false) {$(".beg").remove()};
}