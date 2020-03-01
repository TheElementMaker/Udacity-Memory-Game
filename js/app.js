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
		startTimer = true;
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
		matches = 0;
		lastTarget;
		timer = 0;
		for(let i = 0; i < $('.deck > .card').length; i++){
			$('.deck > .card').eq(i).children().attr('class','fa');
		}
		setTimeout(function(){
			startGame();
		},500)
	}
	function updateModal(winType){
		if(winType == "win"){
			$('#modalHeader').text('Congratulations you won');
		}else{
			$('#modalHeader').text('Game Over');
		}
		$('#timeModal').text('Time: '+timer+' seconds');
		$('#moveModal').text('Moves: '+(moves / 2));
		//How well did the player do
		$('#modalStar1').hide();
		$('#modalStar2').hide();
		$('#modalStar3').hide();
		if(moves < 20){
			$('#modalStar1').show();
			$('#modalStar2').show();
			$('#modalStar3').show();
		}
		if(moves < 30){
			$('#modalStar1').show();
			$('#modalStar2').show();
		}
		if(moves < 40){
			$('#modalStar1').show();
		}
		$('#modalWin').modal('show');
	}
	//Restart Button's
	$('.restart').on('click', ()=>{
		$('#modalWin').modal('hide');
		resetGame();
	})
	//Click Card
	var run;
	var lastTarget;
	var matches = 0;
	var moves = 0;
	var timer = 0;
	var startTimer = false;
	$('.card').on('click', event=>{
		if(moves > 20){
			$('#star1').hide();
		}
		if(moves > 30){
			$('#star2').hide();
		}
		if(moves > 40){
			$('#star3').hide();
		}
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
					setTimeout(function(){
						$('.guess').removeClass('show open guess');
					}, 300)
				}
			}
		}
		if(matches == 8){
			//Won the game
			startTimer = false;
			updateModal('win');
			$('#modalWin').modal('show');
		}
	})
	window.setInterval(function(){
		if(startTimer == true){
			timer++;
		}
		$('#timeOut').text('Time: '+timer);
	}, 1000)
	//Starting the game
	startGame();
})