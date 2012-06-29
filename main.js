var img_array = new Array();
$(document).ready(function($) {
        
    $.ajax({url:'http://search.twitter.com/search.json?q=%23travel&result_type=recent&rpp=10',
                dataType:'jsonp',
                success:function(data){
                    $.each(data.results,function(i) {
                        console.log(data.results[i].text);
                        var regexp = new RegExp('#([^\\s]*)','gi');
                        var regexp2 = new RegExp('@([^\\s]*)','gi');
                        var regexp3 = new RegExp('http://([^\\s]*)','gi');
                        var regexp4 = new RegExp('RT','gi');
                        var replace='';
                        var replace2='';
                        var replace4='';
                        var replace3='';
                        var postText = data.results[i].text
                        if (postText.indexOf("RT")==-1){
                            var postText = postText.replace(regexp3,replace3);
                            var text='<span class="tweet col_4 item"> ' + postText+'</span>'    
                            $('#tweets').append(text);
                        }
                    } );
                }
            } );

/* Flickr photos */

    var apiUrl = 'http://api.flickr.com/services/rest/?';
    var apiKey = 'e9d8174a79c782745289969a45d350e8';
    var flag = 0;
    
    $.getJSON( apiUrl, { 'nojsoncallback': 1, 'method': 'flickr.tags.getClusterPhotos', 'api_key': apiKey,'tag': 'travel', 'cluster_id': 'sky-sea-blue', 'format': 'json' }, function( data ){
                    $.each(data.photos.photo, function( i, item ){                                        
                        $.getJSON( apiUrl, { 'nojsoncallback': 1, 'method': 'flickr.photos.getInfo', 'api_key': apiKey, 'photo_id': item.id, 'format': 'json' },
                            function( data ){
                                if( data.photo ){
                                    var image_url='http://farm' + data.photo.farm + '.staticflickr.com/' + data.photo.server +'/'+ data.photo.id +'_' + data.photo.secret + '_b.jpg';
                                    setTimeout(function(){$('body').attr("background",image_url)}, 5000*i);
                                }
                            }    
                        );
                       
                } );
    
                 
        } );

} );