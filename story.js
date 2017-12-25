
var storyText = {
	s1: {
		text: "<p>I awoke on the side of the road reeking of bodily fluids. Ugh. Piercing headache. I really shouldn't have gotten so wasted last night. I have to lay off the syrup.</p>I can't keep living like this. <br><br>Something has to change.<p>It's already hard enough to get by as a begger when you're not hungover and reeking. Well, I guess it's time to see how generous the citizens are feeling today.</p>",
		price: {
			type:"resource",
			res:"salt",
			value:0
		},
		unlock: {
			type:"none"
		},
	},
	s2: {
		text: "<p>Well, thanks to the generosity of the city's denizens I've managed to amass 30 salt. That's enough to buy a couple pints down at the pub! I start heading down the street to the pub, but on the way I pass through the market district and begin to reconsider my priorities..</p><p>Perhaps it's time to begin investing my salt in wiser ventures that don't leave me feeling miserable the next morning . . .</p>",
		price: {
			type:"resource",
			res:"salt",
			value:30
		},
		unlock: {
			type:"showdiv",
			value:"pane1",
			bg:"#DDF",
			flash:"#FFF"
		},
	},
	s3: {
		text: "<p>A weapon! Perfect! Now I can start mugging people for pub money! Wait.. That's the old way of thinking. I'm better than that now. I'm sure there are better uses for this hatchet. After using my new weapon as an aid to \"consult\" with a few people I eventually determine that I can use it to chop down the cinnamon trees that grow on the outskirts of town.</p><p>That's great news! A big ol' stick will be a great aid for future consultations! For some reason just having this weapon already seems to make people more generous when I'm begging.</p>",
		price: {
			type:"item",
			value:"nohandle"
		},
		unlock: {
			type:"showdiv",
			value:"pane2",
			bg:"#DDF",
			flash:"#FFF"
		},
	},
	s4: {
		text: "<p>This is pretty fun! I don't know why I didn't start gathering sticks sooner! Nobody gives you any trouble when you pull out a big stick. Things are starting to look up for me, but I'm still not satisfied. Surely there must be a way for me to amass even more power.</p><p>After using my big stick to consult with a few more people I finally learn that I can sell these sticks for salt! My latest cowering friend points me towards the exchange and I give him a big whack with my stick as thanks.</p><p>I arrive at the exchange ready to do some work with my stick, but I'm dismayed to find that everyone here has their own sticks. A guy with a very big stick asks me what I'm doing here and I explain to him that I'm just looking around.</p><p>He tells me that nothing is free here and if I can't afford the entry fee I'll have to either leave or come back with a much bigger stick. I guess I'll have to pay for my entry like everyone else... It's enough to make a guy want to just head down to the pub.</p>",
		price: {
			type:"resource",
			res:"cinnamon",
			value:30
		},
		unlock: {
			type:"showdiv",
			value:"exchangepb",
			flash:"#FFF",
			bg:"#CEC"
		},
	},
	s5: {
		text: "<p>Now we're talking! I can really earn some salt at this exchange. Who needs begging with this kind of payoff? Of course it still doesn't hurt to beg on my way around town...</p><p>I'm getting tired of this hatchet, though. I should really get one with a handle. I should easily be able to afford a better axe now which will make chopping these trees easier.</p>",
		price: {
			type:"exchange",
			value:"cinnamon"
		},
		unlock: {
			type:"none"
		},
	},
	s6: {
		text: "<p>I'm feeling pretty wealthy now. I don't think I really need to beg any more.</p><p>I've been spending a lot of time at the cinnamon exchange lately. There are a lot of people coming and going here, but I can't help noticing that the business here pales in comparison to the volume of business received by the sugar exchange next door.</p>I need to find out more about this \"sugar\" stuff.<p>I watch one of the patrons exit the exchange and follow him into an alley before brandishing my hatchet. He seems to be a friendly guy as he is quick to explain this substance.</p><p>Apparently \"sugar\" is a very spicy seasoning that it can be obtained by finding and breaking up sugar rocks. I give him a whack on the noggin with my hatchet to thank him for being so helpful.</p><p>I've seen a lot of people with rock gardens around town. I bet if I pay the guards some salt to look the other way I can gather my sugar from these gardens.</p>",
		price: {
			type:"item",
			value:"plain"
		},
		unlock: {
			type:"showdiv",
			value:"minepb",
			flash:"#FFF",
			bg:"#CEC"
		},
	},
	s7: {
		text: "<p>This isn't so hard after all! I've only had to thank a few people with my hatchet for letting me make use of their gardens. I'd already paid the guards so they used their axes to help me thank the citizens too! How thoughtful!</p><p> I can almost afford to enter the sugar exchange now. I'm so excited; judging by the volume of activity at the sugar exchange I know this stuff must be worth a fortune!</p>",
		price: {
			type:"resource",
			res:"sugar",
			value:100
		},
		unlock: {
			type:"exchange",
			value:"sugar"
		},
	},
	s8: {
		text: "<p>At last, the day has arrived. I have amassed enough sugar to finally enter the much anticipated sugar exchange.</p><p>Unfortunately, things are not always so simple in life. I enter the exchange with resounding disappointment.</p><p>This stuff is almost worthless! Why could there possibly be so many people doing business here? Thankfully I know how to get information by now.</p><p>With my hatchet in tow, I follow an unsuspecting exchange patron into an alley. By the time I get an explanation from him there's a puddle under him that I didn't notice before. Huh. I wonder where that came from. I thank him over the head with my axe and move on.</p><p>It turns out, he explained, that sugar is far too spicy of a seasoning for anybody to enjoy in its natural state. The people at the sugar exchange are there to buy sugar for processing into cubes.</p><p>The sugar cubes are produced by putting sugar into an oven, and people use the sugar cubes as a seasoning to make stews spicier. I guess I should head down to the market and buy myself an oven.</p>",
		price: {
			type:"exchange",
			value:"sugar"
		},
		unlock: {
			type:"item",
			category:"oven",
			value:"basicoven"
		},
	},
	s9: {
		text: "<p>According to the instruction manual for this oven each sugar cube requires 10 sugar to produce, and the oven can produce up to 100 cubes in a batch. Furthermore, each batch takes 60 seconds to cook. Thankfully the sugar cube exchange only costs 10 cubes for entry so I should be able to find out if this was all worth it very soon.</p>",
		price: {
			type:"item",
			value:"basicoven"
		},
		unlock: {
			type:"exchange",
			value:"sugarcubes"
		},
	},
	s10: {
		// text: "Tenth story test text.",
		price: {
			type:"exchange",
			value:"sugarcubes",
		},
		unlock: {
			type:"none"
		},
	},
}

function storyCheck() {
	Object.keys(storyText).forEach(function(q) {
		switch (storyText[q].price.type) {
			case "resource":
				if (player.resources[storyText[q].price.res].amount >= storyText[q].price.value && player.flags.story[q] == false) {
					player.flags.story[q] = true;
					storyUnlock(q);
				};
				break;
				
			case "exchange":
				if (player.flags[storyText[q].price.value].unlocked == true && player.flags.story[q] == false) {
					player.flags.story[q] = true;
					storyUnlock(q);
				};
				break;
				
			case "item":
				if (player.flags.purchased[storyText[q].price.value] == true && player.flags.story[q] == false) {
					player.flags.story[q] = true;
					storyUnlock(q);
				};
				break;
				
			default:
				console.log("No valid story price type detected for " + q)
				break;
		};
		
		if (!$("#story" + q).html() && player.flags.story[q] == true && storyText[q].text) {
			$("#storybox").prepend('<div id="story' + q + '" class="story">' + storyText[q].text + '</div><br><hr><br>');
			flash("story" + q, "#D5D5DD", "#F0F0FF", 500);
			setTimeout(function() {flash("story" + q, "#D5D5DD", "#F0F0FF", 500)}, 1000)
		}			
	});
	if (player.flags.story.s6 == true && player.flags.beggar == true) {
		player.flags.beggar = false;
	};
	if (player.flags.beggar == false) {$(".beg").remove()};
}

function storyUnlock(qq, noflash) {
			switch (storyText[qq].unlock.type) {
				case "none":
					break;
					
				case "showdiv":
					$("#" + storyText[qq].unlock.value).show();
					if (!noflash && storyText[qq].unlock.flash) {
						flash(storyText[qq].unlock.value, storyText[qq].unlock.bg, storyText[qq].unlock.flash, 400);
						var flt = setInterval (
							function() {
							flash(storyText[qq].unlock.value, storyText[qq].unlock.bg, storyText[qq].unlock.flash, 400);
							}, 800
						);
						setTimeout(function() {
							clearInterval(flt);
						}, 2400)
					};
					break;
				
				case "exchange":
					excUnlockHtml(storyText[qq].unlock.value);
					break;
					
				case "item":
					storeInv[storyText[qq].unlock.category][storyText[qq].unlock.value].visible = true;
					break;
					
				default:
					console.log("No valid story unlock type detected for " + qq)
					break;
		}
}