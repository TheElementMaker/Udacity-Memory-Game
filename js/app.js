$(document).ready(()=>{
	var icons = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
	/*
		Use the shuffle function form
		https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	*/
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	function placeIcons(){
		shuffle(icons);
		let length = $('.deck > .card').length;
		for(let i = 0; i < length; i++){
			$('.deck > .card').eq(i).children().addClass(icons[i]);
			$('.deck > .card').eq(i).data('icon',icons[i]);
		}
	}
	function startGame(){
		placeIcons();
		$('.card').addClass('show');
		setTimeout(function(){
			$('.card > .fa').fadeOut();
		},2000)
		setTimeout(function(){
			$('.card').removeClass('show');
			$('.card > .fa').fadeIn();
		},2500)
	}
	function resetGame(){
		$('.card').removeClass('show open');
		$('.fa-star').show();
		$('.moves').text('0');
		moves = 0;
		life = 5;
		matches = 0;
		lastTarget;
		for(let i = 0; i < $('.deck > .card').length; i++){
			$('.deck > .card').eq(i).children().attr('class','fa');
		}
		setTimeout(function(){
			startGame();
		},500)
	}
	//Restart Button
	$('.restart').on('click', ()=>{
		resetGame();
	})
	//Click Card
	var run;
	var lastTarget;
	var matches = 0;
	var life = 5;
	var moves = 0;
	$('.card').on('click', event=>{
		if(!$(event.currentTarget).hasClass('show')){
			moves++;
			if(!run){
				run = true;
				lastTarget = $(event.currentTarget).data('icon');
				$(event.currentTarget).addClass('show open guess');
			}else{
				$(event.currentTarget).addClass('show open guess');
				run = false;
				$('.moves').text(moves / 2);
				//Compare next target
				if(lastTarget == $(event.currentTarget).data('icon')){
					//Right Guess
					matches++
					setTimeout(function(){
						$('.guess').removeClass('open guess');
					}, 300)
				}else{
					//Wrong Guess
					switch(life) {
						case 1:
							$('.fa-star').eq(0).hide();
							alert('Game Over');
							setTimeout(function(){
								resetGame();
							},300)
							break;
						case 2:
							$('.fa-star').eq(1).hide();
							break;
						case 3:
							$('.fa-star').eq(2).hide();
							break;
						case 4:
							$('.fa-star').eq(3).hide();
							break;
						case 5:
							$('.fa-star').eq(4).hide();
							break;
					}
					life--;
					setTimeout(function(){
						$('.guess').removeClass('show open guess');
					}, 300)
				}
			}
		}
		if(matches == 8){
			//Won the game
			alert('Won the game');
		}
	})
	//Starting the game
	startGame();
})