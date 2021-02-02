$(function(){
	var LIST = $('.customer-interaction');
	var LIST_OF_ITEMS_LEFT_TO_BUY = $('.classic-div.goods-left');
	var ITEM_LEFT_TEMPLATE = $('.good-box').html();
	
	function addItem(title){
		var newDiv = $('<div class = "classic-div manage-good-wrapper"><div class="manage-good-name"><span class="good-to-buy">Помідори</span></div><div class = "manage-good-control-number"><button type="button" class = "decrease-button" data-tooltip="Decrease">-</button><div class = "manage-good-display-number">1</div><button type="button" class = "increase-button" data-tooltip="Increase">+</button></div><div class = "manage-good-action"><button type="button" class = "manage-good-cancel-button" data-tooltip="Remove good">x</button><button type="button" class = "manage-good-buy-button" data-tooltip="Buy">Куплено</button></div></div>');
		
		newDiv.find(".good-to-buy").text(title);	//Set	product	title
		
		var newSpan = $('<span class = "good-box" style="margin-right: 4px;"><span class = "item-to-buy"></span><span class = "dot">1</span></span>');
		var newSpanForBoughtGoods = $('<span class = "good-box" style="margin-right: 4px;"><span class = "item-to-buy"></span><span class = "dot">1</span></span>');
		newSpanForBoughtGoods.find(".item-to-buy").css("text-decoration", "line-through");
		newSpanForBoughtGoods.find(".dot").css("text-decoration", "line-through");
		newSpanForBoughtGoods.hide();
		
		newSpan.find(".item-to-buy").text(title);
		newSpanForBoughtGoods.find(".item-to-buy").text(title);
		
		//Delete	Action
		newDiv.find(".manage-good-cancel-button").click(function(){
			newDiv.remove();
			newSpan.remove();
		});
		
		newDiv.find(".increase-button").click(function(){
			var cntGood = parseInt(newDiv.find(".manage-good-display-number").text(), 10);
			cntGood++;
			newDiv.find(".manage-good-display-number").text(cntGood);
			newSpan.find(".dot").text(cntGood);
			newSpanForBoughtGoods.find(".dot").text(cntGood);
			newDiv.find(".decrease-button").css("opacity", 1);
		});
		
		newDiv.find(".decrease-button").click(function(){
			var cntGood = parseInt(newDiv.find(".manage-good-display-number").text(), 10);
			if(cntGood === 1) return;
			cntGood--;
			newDiv.find(".manage-good-display-number").text(cntGood);
			newSpan.find(".dot").text(cntGood);
			newSpanForBoughtGoods.find(".dot").text(cntGood);
			if(cntGood === 1) newDiv.find(".decrease-button").css("opacity", 0.5);
		});
		
		var goodBought = false;
		newDiv.find(".manage-good-buy-button").click(function(){
			if(!goodBought) {
				goodBought = true;
				newDiv.find(".good-to-buy").css("text-decoration", "line-through");
				newDiv.find(".decrease-button").css("visibility", "hidden");
				newDiv.find(".increase-button").css("visibility", "hidden");
				newDiv.find(".manage-good-cancel-button").css("display", "none");
				newDiv.find(".manage-good-buy-button").text("Не куплено");
				newDiv.find(".manage-good-buy-button").css("width", "95px");
				newSpan.hide();
				newSpanForBoughtGoods.show();
			} else {
				goodBought = false;
				newDiv.find(".good-to-buy").css("text-decoration", "auto");
				newDiv.find(".decrease-button").css("visibility", "visible");
				newDiv.find(".increase-button").css("visibility", "visible");
				newDiv.find(".manage-good-cancel-button").css("display", "block");
				newDiv.find(".manage-good-buy-button").text("Куплено");
				newDiv.find(".manage-good-buy-button").css("width", "65px");
				newSpan.show();
				newSpanForBoughtGoods.hide();
			}
		});
		
		$(document).on("keyup", ".manage-good-name", function(){
			var str = newDiv.find(".manage-good-name").find(".change-input").val();
			newSpan.find(".item-to-buy").text(str);
			newSpanForBoughtGoods.find(".item-to-buy").text(str);
		});
		
		newDiv.find(".good-to-buy").click(function(){
			btClick();
		});
		
		function btClick(){
			if(goodBought) return;
			var str = newDiv.find(".manage-good-name").text();
			newDiv.find(".manage-good-name").html('<input type="text” name="name" class = "change-input">');
			newDiv.find(".manage-good-name").find(".change-input").val(str);
			newDiv.find(".manage-good-name").find(".change-input").focus();
			
			newDiv.find(".manage-good-name").find(".change-input").focusout(function(){
				str = newDiv.find(".manage-good-name").find(".change-input").val();
				newDiv.find(".manage-good-name").html('<span class="good-to-buy"></span>');
				newDiv.find(".manage-good-name").find(".good-to-buy").text(str);
				/* newSpan.find(".item-to-buy").text(str);
				newSpanForBoughtGoods.find(".item-to-buy").text(str); */
				newDiv.find(".good-to-buy").click(function(){
					btClick();
				});
			});
		}
		
		LIST.append(newDiv);	//Add	to	the	end	of	the	list
		LIST_OF_ITEMS_LEFT_TO_BUY.append(newSpan);
		$(".goods-bought").append(newSpanForBoughtGoods);
	}
	
	addItem("Помідори");
	addItem("Печиво");
	addItem("Сир");
	
	$(".add-button").click(function(){
		var goodTitle = $(".input-style").val();
		if(goodTitle) {
			addItem(goodTitle);
			$(".input-style").val("");
			$(".input-style").focus();
		}
	});
	
	$(".input-style").keypress(function(event){
		if(event.keyCode === 13) {
			event.preventDefault();
			var goodTitle = $(".input-style").val();
			if(goodTitle) {
				addItem(goodTitle);
				$(".input-style").val("");
				$(".input-style").focus();
			}
		}
	});
});