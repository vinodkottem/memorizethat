
$(document).ready(function(){
        $.get("/api/articles", function(data, status){
        	 displayAllImages(data.data);
        });
        $('#vinod').keypress(function (e) {
		var key = e.which;
			if (key == 13) {
				var txt = $("input").val();
				$.post("/api/articles", {
					url : txt
				}, function(result) {
					if(result.error.status != 200)
						alert(result.error.message);
					else{
						alert(result.data.message);
						location.reload();
					}
				});
			}
		});
	});
	function displayAllImages(data) {
		var htmlText = '';
		for ( var key in data) {
			htmlText += '<div class="div-conatiner">';
			htmlText += '<img alt = "no image" src = '+data[key].image+'/>';
			htmlText += '<p><b><a href='+data[key].url+'>' + data[key].title+'</a></b></p>';
			/* htmlText += '<p class="p-name"> Title: ' + data[key].title + '</p>'; */
			htmlText += '<p class="p-loc"> Words: ' + data[key].words + '</p>';
			htmlText += '<p class="p-desc"> Topics: '
					+ data[key].topics.toString().replace(/,/g, ", ");
			+'</p>';
			htmlText += ' <div class="inside"><textarea></textarea></div>';
			htmlText += '</div>';
		}
		$('body').append(htmlText);
	};