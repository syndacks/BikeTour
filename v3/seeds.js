var mongoose = require("mongoose");
var Hostground = require("./models/hostground.js");
var Comment = require("./models/comment.js");

var seedData = [
			{
			name: "Plum Park on the Colorado",
			image: "https://lh3.googleusercontent.com/WmW46fjcTeWNbtAcjvqFIn4tF9xn_NikMykQ1NKyKq4SwCBwTc_OQ5QvJbiUvPdmdfkFj9IL5sa7k8yT0QZqpUP6Fk6inXCtRwbN9_4p6OJqOhyeDd6WlTgs6OXhJiI9lqrW4VZTFiEZn9YQxhf0fsXI4IW-ztubWL3K9p-ywNihmTzXGXNFUqdcAiIofqSyRcIziJt3Spvi8DzZH7J6GcO0w_ORSrQ_fqJHgN3LwPDiDhiTsIEvCidbN42mEwvUc4eKpv8qK-GpuhZ7cmXOCszr9w9RXpD65-umSCS4fO5oLwK36qNKFeglyrHoSCERbpnHLReIFGMj3djbHGkokk0283PESmd2ZQjhbzwBKZiRCnqwCwOy3k5vf1e9vrt4DcrEZDSPCSI2pKjcjbQ1N_SRpyCF9Q7QP9MftTHuneLl3H_bBNC06_goOW7SUpCVHn6Avc6GYosm1j3gO0r3F8GrmxGFlm81cz0dsDbKT4yKjRk31IHxiACC2rzrypdKz0wROit73eX0rf9PNRNZqMihm12RRqcimKBm4w5u1vn-PV5EkGfj_QwsBLGjSTbmf_6E4cZRp3imStRO0jCZEukQGN38xX3R1XCHxvCCHBLpCo21=w880-h583-no",
			description: "Come on baby light my fire"
			},

			{
			name: "Navasota RV Park",
			image: "https://lh3.googleusercontent.com/pKmqTWgUOjF2WT0oLVPm9pOby5VcSQzs4lkPLB9pqg_p42r6-sFREj07-W8LFIkgBCJEYjCMijwscbKFeYUcoo7gC2j12cjNVmSQQcHuxwNhRdd_KBTPHCet29lIqGEzvzaVPSbNQ6kHCj3zheE1yN9hAHjEOhMWVOas4grvrN26o3lYxpRDpPn-Iehgg45tK_0iCs6WimY7liZ6rL120hjbjr5gfZfm4J-bPliubKmHCMxDPGZSNpeTOiN6YCyCx4YaQC_Q2FCGoYUhGbnuMGJv62BRC6-muUWTAmQ15MHB4AylvzBGBWlVOkRyV_9sZepXHAx07I8YJy42_E4DLtM6kgBjRWgxgZLLZQ-llGwecwFniMfQOCuEyr-0t4X1cwCPZtwM5JT0_Kc5gWTkUXMYIZAwfS9lFgxgxsOtiFFnMYsTKHXFXZyTC8WcQ9W0mht4L-CZA5IiWCdvYewC4DbOWSYpN1cz9HbCHdkk07HVVpmBrsXi3yh1n_fzJbfeYNuWgz0WbogkH5lb7ZbuYpzIjMRadmUKVSGPdmHA9gmkPH6tlL-MY6MlNMuE5QVqyx8EeKC-9suR8Zk3xC_4GO3JaPEezt9PQD7RVMx1CSPf1NZP4Q=w880-h583-no",
			description: "mmm, its lika -- chicken_fried_thsteak"
			},

			{
			name: "The Sanctuary",
			image: "https://lh3.googleusercontent.com/Er5F37j18aLcxvQc4Ox_BvdBMdj-obC1CQFSRftemILlO1Pr59BSus3QoIEtWEUJnPy2VfklN4FIJUEWpR4djZrz_aOc7dct9_HZhDRPDkQ0xGa9iL_eLMwA7mkuPU5ntlQ_YB5rfaOmsmIry-EUNZAdsWVpUroa_wEhQp9ZOjUWHN5uJt_GBzt62ppuCLLemHiaVtHDZ70x8AbzaO0JCLeABQHXA9rNbmQDRNz0pLYdqoMpxw1toIz3GtnFFqKpcEd3Vanl2HmZezh7LGOqixfkctq0djB5LsI2WeIGB0KHC0bUXbyyWwNCTT3jI_LrnE1oXbipOzQP9hB2WYFY4eS711OwCt4YSTXLuj2Q3yVLI_mtAdwTBl41tKSB1hXOPtTCBp6-WsVl_1xtGNm7h3fJanMZMz1H0n1ZN7M7-zIjqJQzxatvcwQgpEF80EHy9RhWwVq7UVyDmjMB8YH5iDKJsLpmg4xvsbbVEKoXT0ZuAGmdL6ob03vdaoy4y9K1MC2hHEk6vFuBcIN1dSkdyb9qbFRru_XrUKXfLmFMQkb8WKddEyH43HtVM84np676DY1tTDVLoaaMoQELTRJO3Jx_FMuekLElPQwxPQLQCF4-QQSCzQ=w880-h583-no",
			description: "Buffy was here"
			}
]

function seedDB(){
	//remove campgrounds
	Hostground.remove({}, function(err){
		if(err){
			console.log(err)
		}
		console.log("removed campgrounds");
		//add a few campgrounds (need to place this inside the .remove function *after* it finishes to ensure we add hostgrounds after we delete them)
		seedData.forEach(function(seed){
			Hostground.create(seed, function(err, hostground){
				if(err){
					console.log(err);
				}else{
					console.log("newly created hostground");
					//create a comment
					Comment.create(
						{
							text:"this place is great but I wish there was coffee",
							author: "Steve"
						}, function(err, comment){
							if (err){
								console.log(err);
							} else {
							hostground.comments.push(comment);
							console.log("added a comment");
							hostground.save();
							}
						});
				}
			});
		});
	});
	// //find all campgrounds and print them out
	// Hostground.find({}, function(err, hostgrounds){
	// 	if(err){

	// 		console.log(err)
	// 	}else{
	// 		console.log("all the hostgrounds:")
	// 		console.log(hostgrounds)
	// 	}
	// });
}

module.exports = seedDB;