$(document).ready(function() {
    const Url='https://api.codetabs.com/v1/proxy/?quest=https://api.zeks.xyz/api/foxnews?apikey=apivinz'
    $('.btn').click(function() {
        $.ajax({
            url: Url,
            type: "GET",
            success: function(result){
                console.log(result)
                let movies = result.result;

                $.each(movies, function(i, data) {
                $('#video-list').append(`
                        <div class="col-md-4">
                          <div class="card mb-3" style="width: 18rem;">
                            <img src="`+ data.thumb +`" class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title">`+ data.title +`</h5>
                              <p class="card-text">`+ data.content +`</p>
                              <h5>`+ data.time +`</h5>
                              <a href="`+ data.url +`" class="btn btn-primary">Read More</a>
                            </div>
                          </div>
                        </div>
                    `);
            })

            }
        })
    })
})