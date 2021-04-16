// fungsi searchMovie
function searchMovie(){
    // kosong kan dulu data sebelumnya, baru setelah itu req dan tampilkan
    $('#video-list').html('');

    // req menggunakan ajax
    $.ajax({
        // parameter object
        // mau ngambil data dari mana
        url: 'https://api.codetabs.com/v1/proxy/?quest=https://api.zeks.xyz/api/igs?apikey=apivinz',
        type: 'get',
        dataType: 'json',
        // menggunakan ajax bisa menyimpan datanya disini 'data:', bukan di url
        data: {
            'username': $('#search-input').val()
        },
        // jika succes,artinya ajax nya dikirim. makan jalankan function
        success: function (result) {
            let movies = result.data;
            console.log(result)
            

            $.each(movies, function (i, data) {
                $('#video-list').append(`
                    <div class="col-md-3">
                            <div class="card mb-3">
                                <video style="width:100%;"
            controls
            id="player">
           
            <source 
            src="`+ data.url +`" 
            />
                                <div class="card-body">
                                    <p><a href="`+ data.url +`">Download</a></p>
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
        url: 'https://api.codetabs.com/v1/proxy/?quest=https://docs-jojo.herokuapp.com/api/ytmp4',
        dataType: 'json',
        type: 'get',
        data: {
            'url': $(this).data('id')
        },
        // jika succes, maka jalankan function
        success: function(movie) {
            // jika id nya benar

                // maka ganti isi html nya
                $('.modal-body').html(`
                    <div class=""container-fluid>
                        <div class="row">
                            <div class="col-md-6">
                                <video style="width:100%;"
            controls
            data-poster="`+ movie.thumb +`"
            id="player">
           
            <source 
            src="`+ movie.result +`" 
            />
            
          </video>
                            </div>
                            <div class="col-md-6">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+ movie.title +`</h3></li>
                                <li class="list-group-item">Ukuran File : `+ movie.filesize +`</li>
                                <li class="list-group-item"><p>Download : <a href="`+ movie.result +`">Disni</a></p></li>
                                <li class="list-group-item">*Note : sebelum menutup PopUp Pause dulu</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                `);
        }
    });
});