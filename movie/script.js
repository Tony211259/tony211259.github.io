// fungsi searchMovie
function searchMovie(){
    // kosong kan dulu data sebelumnya, baru setelah itu req dan tampilkan
    $('#video-list').html('');

    // req menggunakan ajax
    $.ajax({
        // parameter object
        // mau ngambil data dari mana
        url: 'https://api.codetabs.com/v1/proxy/?quest=https://zahirr-web.herokuapp.com/api/filmapik/search?apikey=zahirgans',
        type: 'get',
        dataType: 'json',
        // menggunakan ajax bisa menyimpan datanya disini 'data:', bukan di url
        data: {
            'film': $('#search-input').val()
        },
        // jika succes,artinya ajax nya dikirim. makan jalankan function
        success: function (result) {
            let movies = result.result;
            let movie = movies.result;
            console.log(movie)
            

            $.each(movie, function(i, data) {
                $('#video-list').append(`
                        <div class="col-md-3">
                            <div class="card mb-3">
                                <img src="`+ data.thumbnailPotrait +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.title +`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.rating +`</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.movieId +`">See detail</a>
                                </div>
                            </div>
                        </div>
                    `);
            })


        
    }

    });
}

// jalan kna sebuah function ketika tombol di klik
$('#search-button').on('click', function(){
    // panggil fungsi searchMovie
    searchMovie();
});

// ketika tombol enter di tekandi dalam inputan
$('#search-input').on('keyup', function(e){
    // ketika e punya key kode == 13, tombol enter. source https://keycode.info
    // bisa menggunakan keycode atau which
    if ( e.which == 13 ){
        searchMovie();
    }
});

// jquery tolong carikan saya element #video-list, lalu ketika saya klik element .see-detail di dalamnya(baikitu muncul nya dari awal/nanti)
$('#video-list').on('click', '.see-detail', function(){
    // cara mengambil data-id="`+ data.id +`" pada element html
    // console.log($(this).data('id'));
    // maka jalankan ajax
    $.ajax({
        url: 'https://api.codetabs.com/v1/proxy/?quest=https://zahirr-web.herokuapp.com/api/filmapik/play?apikey=zahirgans',
        dataType: 'json',
        type: 'get',
        data: {
            'id': $(this).data('id')
        },
        // jika succes, maka jalankan function
        success: function (result) {
            let movies = result.result;
            console.log(movies)
            // jika id nya benar

                // maka ganti isi html nya
                $('.modal-body').html(`
                    <a href="`+ movies.link +`">Watch</a>
                `);
        }
    });
});