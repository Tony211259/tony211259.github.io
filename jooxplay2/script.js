// fungsi searchMovie
function searchMovie(){
    // kosong kan dulu data sebelumnya, baru setelah itu req dan tampilkan
    $('#video-list').html('');

    // req menggunakan ajax
    $.ajax({
        // parameter object
        // mau ngambil data dari mana
        url: 'https://api.codetabs.com/v1/proxy/?quest=https://h4ck3rs404-api.herokuapp.com/api/joox?apikey=404Api',
        type: 'get',
        dataType: 'json',
        // menggunakan ajax bisa menyimpan datanya disini 'data:', bukan di url
        data: {
            'judul': $('#search-input').val()
        },
        // jika succes,artinya ajax nya dikirim. makan jalankan function
        success: function (result) {
            let movies = result.result;
            console.log(movies)
            

                $('#video-list').append(`
                        <div class="col-md-3">
                            <div class="card mb-3">
                                <img src="`+ movies.img_url +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+ movies.judul +`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ movies.artist +`</h6>
                                    <audio controls>
    <source src="`+ movies.mp3_url +`" type="audio/mpeg">
</audio>
                                </div>
                            </div>
                        </div>
                    `);
            


        
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
        url: 'https://api.codetabs.com/v1/proxy/?quest=https://api.zeks.xyz/api/ytmp3?apikey=apivinz',
        dataType: 'json',
        type: 'get',
        data: {
            'url': $(this).data('id')
        },
        // jika succes, maka jalankan function
        success: function (hasil) {
            let movies = hasil.result;
            console.log(hasil)
            // jika id nya benar

                // maka ganti isi html nya
                $('.modal-body').html(`
                                        <div class=""container-fluid>
                        <div class="row">
                            <div class="col-md-6">
                                <audio controls>
    <source src="`+ movies.url_audio +`" type="audio/mpeg">
    Browsermu tidak mendukung tag audio, upgrade donk!
</audio>
                            </div>
                            <div class="col-md-6">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+ movies.title +`</h3></li>
                                <li class="list-group-item">Ukuran File : `+ movies.size +`</li>
                                <li class="list-group-item"><p>Download : <a href="`+ movies.url_audio +`">Disni</a></p></li>
                                <li class="list-group-item">*Note : sebelum menutup PopUp Pause dulu</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                `);
        }
    });
});