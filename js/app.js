const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';

const login = $('.sign-in');
const wrapForm = $('.wrap-form');
const closeForm = $('.form-close');
const switchLoginF = $('.switch-login-form');
const switchRegisterF = $('.switch-register-form');
const registerForm = $('#register-form');
const loginForm = $('#login-form');
const topArtistsPrev = $('.top-artists__prev');
const topArtistsNext = $('.top-artists__next');
const topArtistList = $$('.col');
const topArtist = $('.top-artists__list');
const playList = $('.music-list');
const release = $('.release span');
const currentSongNames = $$('.current-song-name');
const currentSongAuthors = $$('.current-song-author');
const Thumbs = $$('.thumb');
const CDThumb = $('.cd')
const audio = $('#audio');
const playBtn = $('.btn-play-pause');
const currentProgress = $('.current-progress');
const currentTime = $('.current-time');
const progressBar = $('.progress-bar');
const maxDuaration = $('.max-duaration');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const volumeBar = $('.volume-bar');
const currentVolume = $('.current-volume');
const iconVolume = $('.icon-volume');
const iconMute = $('.icon-mute');
let songs;

// hiden and show form
function addClass(element, classN){
    element.classList.add(classN);
}
function removeClass(element, classN){
    element.classList.remove(classN);
}
function toggleClass(element, classN){
    element.classList.toggle(classN);
}
login.onclick = function(){
    removeClass(wrapForm,'hiden');
    wrapForm.style.animation = 'growth linear 0.15s';
}
closeForm.onclick = ()=>{

    wrapForm.style.animation = 'zoom-out linear 0.15s';
    setTimeout(function(){
        addClass(wrapForm, 'hiden');
        addClass(registerForm,'hiden');
        removeClass(loginForm,'hiden');
    },150);
}

switchLoginF.onclick = () => {
    addClass(registerForm,'hiden');
    removeClass(loginForm,'hiden');
}

switchRegisterF.onclick = () => {
    removeClass(registerForm,'hiden');
    addClass(loginForm,'hiden');
}

let  currentActiv = 4;

scrollToActiv = function(){
    setTimeout(() => {
        $(".col.activ").scrollIntoView({
            behavior: "smooth", block: "nearest", inline: "end",
        })
    }, 80)
}

topArtistsNext.onclick = function(){
    $('.col.activ').classList.remove('activ');
    currentActiv++;
    if(currentActiv >= topArtistList.length) currentActiv=4;
    topArtistList[currentActiv].classList.add('activ');
    scrollToActiv();   

}

topArtistsPrev.onclick = function(){
    $('.col.activ').classList.remove('activ');
    currentActiv--;
    if(currentActiv < 4) currentActiv=topArtistList.length-1;
    topArtistList[currentActiv].classList.add('activ');
    scrollToActiv();  
}

  

const app = {

    currentIndex : 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    song: [
        {
            name:'Ng???n Ngang',
            singer: 'Rymthmastic',
            path: './song/NgonNgang.mp3',
            image: 'https://i.ytimg.com/vi/vdX6DwxyVvc/maxresdefault.jpg',
            release: '15/09/2022',
        },
        {
            name:'L???n cu???i',
            singer: 'Karik',
            path: './song/LanCuoi_KaRik.mp3',
            image: 'https://lyricvn.com/wp-content/uploads/2021/03/2486d1faa0e8cfcca01c39b5814113f2.jpg',
            release: '04/05/2021'
        },        
        {
            name:'Ch???c ai ???? s??? v???',
            singer: 'S??n T??ng - MTP',
            path: './song/chacAiDoSeVe.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b273f669c4465b1abe7a9b871fe4',
            release: '04/05/2019'
        },
        {
            name:'T??nh y??u ????u ph???i ph??p to??n',
            singer: 'Quang H??ng - Master D',
            path: './song/TinhYeuDauPhaiPhepToan_QuangHungMasterD.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/share/2022/09/14/d/f/f/b/1663138676610.jpg',
            release: '04/09/2022'
        },
        {
            name:'T???ng l?? c???a nhau',
            singer: 'B???o Anh - T??o',
            path: './song/tungLaCuaNhau_BaoAnh_Tao.mp3',
            image: 'https://mp3lofi.com/wp-content/uploads/2022/08/Loi-bai-hat-Tung-La-Cua-Nhau-Bao-Anh-x-Tao.jpg',
            release: '20/09/2022'
        },
        {
            name:'T???i v?? sao',
            singer: 'MCK',
            path: './song/taiViSao.mp3',
            image: 'https://i.scdn.co/image/ab67616d00001e0255c3c05165ab7672abe1194d',
            release: '12/06/2022'
        },
        {
            name:'Ng?????i ????ng th????ng l?? anh',
            singer: 'Only C',
            path: './song/nguoiDangThuongLaAnh-onlyC.mp3',
            image: 'https://i.scdn.co/image/ab67616d00001e02d6186b7d1cd7e073469bd866',
            release: '03/08/2022'
        },
        {
            name:'V??i c??u n??i c?? khi???n ng?????i thay ?????i',
            singer: 'GREYD - TLinh',
            path: './song/vaicaunoicokhiennguoithaydoi-GREYDxtlinh.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b273e539f5611166930d7d9f6297',
            release: '08/08/2023'
        },
        {
            name:'M???t ng??n n???i ??au',
            singer: 'V??n Mai H????ng',
            path: './song/motNganNoiDau_VanMaiHuong.mp3',
            image: 'https://i.ytimg.com/vi/l0yKQLaNk5g/maxresdefault.jpg',
            release: '21/11/2023'
        },
        {
            name:'Chi???u h??m ???y',
            singer: 'Jaykii',
            path: './song/ChieuHAy.mp3',
            image: 'https://i.ytimg.com/vi/SA35ldy92s0/maxresdefault.jpg',
            release: '21/11/2018'
        },
        {
            name:'OK',
            singer: 'Binz',
            path: './song/OK.mp3',
            image: 'https://i.ytimg.com/vi/SNES5Y-tYxM/maxresdefault.jpg',
            release: '11/08/2018'
        },
        {
            name:'Kh??c bi???t to l???n',
            singer: 'Tr???nh Th??ng B??nh - Liz Kim C????ng',
            path: './song/khacBietToLon_TrinhThangBinh_lizKCuong.mp3',
            image: 'https://images.genius.com/5bc85643d37e025ac5c19f740603149f.1000x1000x1.jpg',
            release: '21/11/2018'
        },
        {
            name:'Kh??ng y??u ?????ng g??y th????ng nh???',
            singer: 'LyLy - Karik',
            path: './song/khongYeuDungGayThuongNho_Lyly_Karik.mp3',
            image: 'https://i1.sndcdn.com/artworks-Fp0Puc8Odr2nZW3R-KvH4tg-t500x500.jpg',
            release: '30/05/2021'
        },
        {
            name:'Thay t??i y??u c?? ???y',
            singer: 'Thanh H??ng',
            path: './song/thayToiYeuCoAy-ThanhHung.mp3',
            image: 'https://i.ytimg.com/vi/kSYhR8vnzBg/maxresdefault.jpg',
            release: '30/05/2021'
        },
        {
            name:'Ch???m ????y n???i ??au',
            singer: 'Erik',
            path: './song/CDND.mp3',
            image: 'https://photo-zmp3.zmdcdn.me/thumb_video/c/1/3/7/c1379c25604f69307458316809a9dfd1.jpg',
            release: '18/07/2019'
        },  
        {
            name:'?????m ng??y xa em',
            singer: 'OnlyC - Lou Ho??ng',
            path: './song/DNXE.mp3',
            image: 'https://i.ytimg.com/vi/rtviC6i42bc/maxresdefault.jpg',
            release: '30/05/2021'
        },
        {
            name:'L?? b???n kh??ng th??? y??u',
            singer: 'Lou Ho??ng',
            path: './song/LaBanKhongTheYeu.mp3',
            image: 'https://i.ytimg.com/vi/I8SqPRZ8OzE/maxresdefault.jpg',
            release: '26/09/2021'
        },
        {
            name:'Ng?????i l??? ??i',
            singer: 'Karik - Orange',
            path: './song/NLO.mp3',
            image: 'https://cdn.baogiaothong.vn/upload/images/2019-2/article_avatar_img/2019-05-05/h11-1557037803-width1004height565.jpg',
            release: '16/12/2019'
        },
        {
            name:'L?? v?? ai',
            singer: 'The Sheep',
            path: './song/LaViAi-TheSheep.mp3',
            image: 'https://mp3lofi.com/wp-content/uploads/2022/09/Loi-bai-hat-La-Vi-Ai-The-Sheep.jpg',
            release: '16/02/2022'
        },
        {
            name:'Em kh??ng sai, ch??ng ta sai',
            singer: 'Erik',
            path: './song/emKhongSaiChungTaSai_erik.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b273ff22ed3b7faf55f2333c2d56',
            release: '16/05/2019'
        },
        {
            name:'Th?? th??i',
            singer: 'Reddy',
            path: './song/ThiThoi.mp3',
            image: 'https://i.ytimg.com/vi/Eb8fj-jstNo/maxresdefault.jpg',
            release: '04/09/2022'
        },
        {
            name:'??au ????? tr?????ng th??nh',
            singer: 'Only C',
            path: './song/y2meta.com - ??AU ????? TR?????NG TH??NH _ ONLYC _ OFFICIAL MV (256 kbps).mp3',
            image: 'https://i.ytimg.com/vi/eoJecvGMR6E/maxresdefault.jpg',
            release: '01/04/2021'
        },
        {
            name:'T??? lau n?????c m???t',
            singer: 'Mr Siro',
            path: './song/TuLauNuocMat_MrSiro.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b2735e7ded4d3f67a00208f9ba52',
            release: '01/03/2017'
        },
        {
            name:'Th?? ?????ng n??i ra',
            singer: 'B???o Kun',
            path: './song/TDNR.mp3',
            image: 'https://i.ytimg.com/vi/uXQHqJ19-nM/maxresdefault.jpg',
            release: '27/10/2018'
        },
        {
            name:'Th???t t??nh',
            singer: 'Tr???nh ????nh Quang',
            path: './song/ThatTinh.mp3',
            image: 'https://i.ytimg.com/vi/FSeGrBw5eFA/maxresdefault.jpg',
            release: '02/08/2020'
        },
        {
            name:'Thuong',
            singer: 'Karik',
            path: './song/Thuong.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/12/19/1/e/0/d/1513679484858_640.jpg',
            release: '028/02/2017'
        },
        {
            name:'Em c???a qu?? kh???',
            singer: 'Nguy???n ????nh V??',
            path: './song/ECQK.mp3',
            image: 'https://i.ytimg.com/vi/OJfx0vO5Rak/maxresdefault.jpg',
            release: '01/04/2019'
        },
        {
            name:'L?? do l?? g??',
            singer: 'L?? Gia Qu??n',
            path: './song/LyDoLaGi.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/mv/2022/04/07/9/c/e/8/1649323030820_640.jpg',
            release: '13/11/2020'
        },
        {
            name:'L???ng nghe n?????c m???t',
            singer: 'MR Siro',
            path: './song/LNNM.mp3',
            image: 'https://i1.sndcdn.com/artworks-000657892486-mafx5z-t500x500.jpg',
            release: '20/12/2021'
        },
        {
            name:'Cu???c g???i cu???i',
            singer: 'T.R.I',
            path: './song/cuocGoiCuoi-TRI.mp3',
            image: 'https://tailieumoi.vn/storage/uploads/images/post/banner/tri-prod-davis-1659344216.png',
            release: '20/12/2021'
        },
        {
            name:'Anh s??? ???n th??i',
            singer: 'V????ng Anh T??',
            path: './song/anhSeOnThoi.mp3',
            image: 'https://i.ytimg.com/vi/uk7xxK0g-wo/maxresdefault.jpg',
            release: '17/12/2019'
        },
        {
            name:'C???m ??n v?? t???t c???',
            singer: 'Anh Qu??n',
            path: './song/CamOnViTatCa.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b2734a002be8c4b4bb0a9e577ca7',
            release: '06/08/2022'
        },
        {
            name:'Gi??? l???i ???????c chi',
            singer: 'Reddy',
            path: './song/giuLaiDuocChi_Reddy.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/4/4/4/1444bcd1da05066e7562e0e34c609ff4.jpg',
            release: '27/09/2021'
        },
        {
            name:'Kh??ng tr???n v???n n???a',
            singer: 'Ch??u Kh???i Phong',
            path: './song/KhongTronVenNua_CKPhong.mp3',
            image: 'https://dj24h.com/wp-content/uploads/2022/01/khong-tron-ven-nua-ciray-remix-chau-khai-phong.jpg',
            release: '27/09/2021'
        },
        {
            name:'N???ng t??nh hay nh??? l??ng',
            singer: 'T???ng Gia V??',
            path: './song/NangTinhHayNheLong.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b273754ba58253cc713ac1c13ff3',
            release: '02/02/2022'
        },
        {
            name:'Crying over you',
            singer: 'justatee',
            path: './song/CryingOverYou.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/covers/4/6/46252d6122b4b7615851ae9700d8f160_1386508433.jpg',
            release: '02/02/2022'
        },
        {
            name:'C??ng n??u gi??? c??ng d??? m???t',
            singer: 'MR Siro',
            path: './song/CangNiuGiuCangDeMat.mp3',
            image: 'http://pianominhthanh.vn/upload/image/B%C3%A0i%20Vi%E1%BA%BFt%202018/sheet-nhac-piano-cang-giu-cang-de-mat-mr-siro-jpg.jpg',
            release: '11/01/2023'
        },
        {
            name:'????p ??n cu???i c??ng',
            singer: 'Qu??n AP',
            path: './song/DapAnCuoiCung-Qu??nP.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2022/09/16/0/2/1/c/1663300860128_640.jpg',
            release: '10/01/2022'
        },
        {
            name:'T???m th??n d??i d???u',
            singer: 'Ph??t Huy - TRUZG',
            path: './song/TamThanDaiDau.mp3',
            image: 'https://i.ytimg.com/vi/O9Bqpv-Eosk/maxresdefault.jpg',
            release: '20/11/2021'
        },
    ],
    // H??m render playlist
    render: function(){
        const htmls = this.song.map((song,index) => {
            return `
                <div class="song ${index === 0 ? 'active':''}" data-index = "${index}">
                    <div class="song-order">${index < 9 ? `0${index+1}` : index+1 }</div>
                    <div class="song-thumb" style="background-image: url('${song.image}')"></div>
                    <div class="song-info">
                        <p class="song-name">${song.name}</p>
                        <p class="song-author">${song.singer}</p>
                    </div>
                    <div class="song-icon"><i class='bx bx-bar-chart' ></i></div>
                </div>
                `
        })
        playList.innerHTML = htmls.join('\n');
        songs = $$('.song');
    },

    // H??m ?????nh ngh??a c??c thu???c t??nh cho object 
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.song[this.currentIndex];
            }
        })
    },
    // H??m t???i th??ng tin b??i h??t hi???n t???i
    loadCurrentSong: function(){
        currentSongNames.forEach((item) =>{
            item.innerText = app.currentSong.name;
        });
        currentSongAuthors.forEach((item) =>{
            item.innerText = app.currentSong.singer;
        });
        Thumbs.forEach((item) =>{
            item.src = app.currentSong.image;
        });
        release.innerText = this.currentSong.release;
        audio.src = this.currentSong.path;
    },

    loadConfig: function(){
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
        randomBtn.classList.toggle('active', app.isRandom);
        repeatBtn.classList.toggle('active', app.isRepeat);
        // this.currentIndex = this.config.currentIndex;
    },
    // h??m next b??i h??t
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.song.length) this.currentIndex=0;
        app.loadCurrentSong();
    },

    // h??m preve b??i h??t
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0) this.currentIndex = this.song.length - 1;
        app.loadCurrentSong();
    },

    // H??m ph??t random b??i h??t
    randomSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor(Math.random() * this.song.length);
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    scrollToActiveSong: function(){
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth", block: "nearest",
            })
        }, 50)
    },
    
    switchActiveSong: function(){
        $('.song.active').classList.remove('active');
        songs[app.currentIndex].classList.add('active');
        app.scrollToActiveSong();
    },

    // H??m x??? l?? c??c s??? ki???n
    handleEvent: function(){

        // X??? l?? CD quay/d???ng
        const CDAnimation = CDThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 18000,
            iterations: Infinity,
        })
        
        CDAnimation.pause();

        //X??? l?? khi ???n play
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause();
            } 
            else{
                audio.play();
            }
        }

        // Khi b??i h??t ???????c play
        audio.onplay = function(){
            app.isPlaying = true;
            audio.play();
            addClass(playBtn, 'playing');
            CDAnimation.play();
        }

        // Khi b??i h??t b??? pause
        audio.onpause = function(){
            audio.pause();
                removeClass(playBtn, 'playing'); 
                app.isPlaying = false;
                CDAnimation.pause();
        }

        // Th???i l?????ng c???a b??i h??t hi???n t???i khi b??i h??t ???????c load
        audio.onloadeddata = function(){
            if( (Math.floor(this.duration % 60)) < 10){
                maxDuaration.innerText = `${Math.floor(this.duration / 60)}:0${Math.floor(this.duration % 60)}`;
            }
            else{
                maxDuaration.innerText = `${Math.floor(this.duration / 60)}:${Math.floor(this.duration % 60)}`;
            }
        }
                
        // Khi ti???n ????? b??i h??t thay ?????i
        audio.ontimeupdate = function(){
            let progressTime = this.currentTime;
            const progressPercent = progressTime * 100 / this.duration;
            currentProgress.style.width = progressPercent + '%';
            if( ( Math.floor(progressTime % 60)) < 10){
                currentTime.innerText = `${Math.floor(progressTime/60)}:0${Math.floor(progressTime%60)}`;
            }
            else{
                currentTime.innerText = `${Math.floor(progressTime/60)}:${Math.floor(progressTime%60)}`;
            }
        }

        // Khi ??m thanh b??i h??t thay ?????i
        audio.onvolumechange = function(){
            if(audio.volume > 0){
                iconVolume.classList.remove('hiden');
                iconMute.classList.add('hiden');
            }else{
                iconVolume.classList.add('hiden');
                iconMute.classList.remove('hiden');
            }
            currentVolume.style.width = (this.volume*100) + '%';
        }

        // C???p nh???t ti???n tr??nh khi click
        progressBar.onmousedown = function(e){
            let progressBarWidth = this.clientWidth;
            let clickOffsetX = e.offsetX;
            audio.currentTime = (clickOffsetX * audio.duration / progressBarWidth);
        }

        // ??i???u ch???nh ??m l?????ng khi click v??o thanh volume
        volumeBar.onmouseup = function(e){
            audio.volume = (Math.round(e.offsetX/this.clientWidth + "e+1") + "e-1");
        }

        // mute khi click icon loa
        iconVolume.onclick = function(){
            audio.volume = 0;
        }

        iconMute.onclick = function(){
            audio.volume = 0.6;
        }

        // Khi ???n next b??i h??t
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong();
            }
            else{
                app.nextSong();
            }
            audio.play();
            app.switchActiveSong();
            // app.scrollToActiveSong();
        }

        // kh?? ???n prev b??i h??t
        prevBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong();
            }
            else{
                app.prevSong();
            }
            audio.play();
            app.switchActiveSong();
            // app.scrollToActiveSong();
        }

        // khi b???t t???t n??t random
        randomBtn.onclick = function(){
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle('active', app.isRandom);
        }

        // khi b???t t???t repeat
        repeatBtn.onclick = function(){
            app.isRepeat = !app.isRepeat;
            repeatBtn.classList.toggle('active', app.isRepeat);
        }

        //  khi click v??o song
        playList.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode){
                app.currentIndex = Number(songNode.dataset.index);
                app.loadCurrentSong();
                audio.play();
            }
        }

        // Khi k???t th??c 1 b??i h??t
        audio.onended = function(){
            if(app.isRepeat){
                audio.play();
            }else{
                nextBtn.click();
            }
        }
    },

    start: function(){
        this.loadConfig();
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        audio.volume = 0.4;
        this.handleEvent();
    }
} 
app.start();


