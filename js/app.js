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

const app = {

    currentIndex : 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    song: [
        {
            name:'Ngỗn Ngang',
            singer: 'Rymthmastic',
            path: './song/NgonNgang.mp3',
            image: 'https://i.ytimg.com/vi/vdX6DwxyVvc/maxresdefault.jpg',
            release: '15/09/2022',
        },
        {
            name:'Lần cuối',
            singer: 'Karik',
            path: './song/LanCuoi_KaRik.mp3',
            image: 'https://lyricvn.com/wp-content/uploads/2021/03/2486d1faa0e8cfcca01c39b5814113f2.jpg',
            release: '04/05/2021'
        },        
        {
            name:'Chắc ai đó sẽ về',
            singer: 'Sơn Tùng - MTP',
            path: './song/chacAiDoSeVe.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b273f669c4465b1abe7a9b871fe4',
            release: '04/05/2019'
        },
        {
            name:'Tình yêu đâu phải phép toán',
            singer: 'Quang Hùng - Master D',
            path: './song/TinhYeuDauPhaiPhepToan_QuangHungMasterD.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/share/2022/09/14/d/f/f/b/1663138676610.jpg',
            release: '04/09/2022'
        },
        {
            name:'Từng là của nhau',
            singer: 'Bảo Anh - Táo',
            path: './song/tungLaCuaNhau_BaoAnh_Tao.mp3',
            image: 'https://mp3lofi.com/wp-content/uploads/2022/08/Loi-bai-hat-Tung-La-Cua-Nhau-Bao-Anh-x-Tao.jpg',
            release: '20/09/2022'
        },
        {
            name:'Tại vì sao',
            singer: 'MCK',
            path: './song/taiViSao.mp3',
            image: 'https://i.scdn.co/image/ab67616d00001e0255c3c05165ab7672abe1194d',
            release: '12/06/2022'
        },
        {
            name:'Người đáng thương là anh',
            singer: 'Only C',
            path: './song/nguoiDangThuongLaAnh-onlyC.mp3',
            image: 'https://i.scdn.co/image/ab67616d00001e02d6186b7d1cd7e073469bd866',
            release: '03/08/2022'
        },
        {
            name:'Vài câu nói có khiến người thay đổi',
            singer: 'GREYD - TLinh',
            path: './song/vaicaunoicokhiennguoithaydoi-GREYDxtlinh.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b273e539f5611166930d7d9f6297',
            release: '08/08/2023'
        },
        {
            name:'Một ngàn nỗi đau',
            singer: 'Văn Mai Hương',
            path: './song/motNganNoiDau_VanMaiHuong.mp3',
            image: 'https://i.ytimg.com/vi/l0yKQLaNk5g/maxresdefault.jpg',
            release: '21/11/2023'
        },
        {
            name:'Chiều hôm ấy',
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
            name:'Khác biệt to lớn',
            singer: 'Trịnh Thăng Bình - Liz Kim Cương',
            path: './song/khacBietToLon_TrinhThangBinh_lizKCuong.mp3',
            image: 'https://images.genius.com/5bc85643d37e025ac5c19f740603149f.1000x1000x1.jpg',
            release: '21/11/2018'
        },
        {
            name:'Không yêu đừng gây thương nhớ',
            singer: 'LyLy - Karik',
            path: './song/khongYeuDungGayThuongNho_Lyly_Karik.mp3',
            image: 'https://i1.sndcdn.com/artworks-Fp0Puc8Odr2nZW3R-KvH4tg-t500x500.jpg',
            release: '30/05/2021'
        },
        {
            name:'Thay tôi yêu cô ấy',
            singer: 'Thanh Hưng',
            path: './song/thayToiYeuCoAy-ThanhHung.mp3',
            image: 'https://i.ytimg.com/vi/kSYhR8vnzBg/maxresdefault.jpg',
            release: '30/05/2021'
        },
        {
            name:'Chạm đáy nỗi đau',
            singer: 'Erik',
            path: './song/CDND.mp3',
            image: 'https://photo-zmp3.zmdcdn.me/thumb_video/c/1/3/7/c1379c25604f69307458316809a9dfd1.jpg',
            release: '18/07/2019'
        },  
        {
            name:'Đếm ngày xa em',
            singer: 'OnlyC - Lou Hoàng',
            path: './song/DNXE.mp3',
            image: 'https://i.ytimg.com/vi/rtviC6i42bc/maxresdefault.jpg',
            release: '30/05/2021'
        },
        {
            name:'Là bạn không thể yêu',
            singer: 'Lou Hoàng',
            path: './song/LaBanKhongTheYeu.mp3',
            image: 'https://i.ytimg.com/vi/I8SqPRZ8OzE/maxresdefault.jpg',
            release: '26/09/2021'
        },
        {
            name:'Người lạ ơi',
            singer: 'Karik - Orange',
            path: './song/NLO.mp3',
            image: 'https://cdn.baogiaothong.vn/upload/images/2019-2/article_avatar_img/2019-05-05/h11-1557037803-width1004height565.jpg',
            release: '16/12/2019'
        },
        {
            name:'Là vì ai',
            singer: 'The Sheep',
            path: './song/LaViAi-TheSheep.mp3',
            image: 'https://mp3lofi.com/wp-content/uploads/2022/09/Loi-bai-hat-La-Vi-Ai-The-Sheep.jpg',
            release: '16/02/2022'
        },
        {
            name:'Em không sai, chúng ta sai',
            singer: 'Erik',
            path: './song/emKhongSaiChungTaSai_erik.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b273ff22ed3b7faf55f2333c2d56',
            release: '16/05/2019'
        },
        {
            name:'Thì thôi',
            singer: 'Reddy',
            path: './song/ThiThoi.mp3',
            image: 'https://i.ytimg.com/vi/Eb8fj-jstNo/maxresdefault.jpg',
            release: '04/09/2022'
        },
        {
            name:'Đau để trưởng thành',
            singer: 'Only C',
            path: './song/y2meta.com - ĐAU ĐỂ TRƯỞNG THÀNH _ ONLYC _ OFFICIAL MV (256 kbps).mp3',
            image: 'https://data.chiasenhac.com/data/cover/137/136504.jpg',
            release: '01/04/2021'
        },
        {
            name:'Tự lau nước mắt',
            singer: 'Mr Siro',
            path: './song/TuLauNuocMat_MrSiro.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b2735e7ded4d3f67a00208f9ba52',
            release: '01/03/2017'
        },
        {
            name:'Thà đừng nói ra',
            singer: 'Bảo Kun',
            path: './song/TDNR.mp3',
            image: 'https://i.ytimg.com/vi/uXQHqJ19-nM/maxresdefault.jpg',
            release: '27/10/2018'
        },
        {
            name:'Thất tình',
            singer: 'Trịnh Đình Quang',
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
            name:'Em của quá khứ',
            singer: 'Nguyễn Đình Vũ',
            path: './song/ECQK.mp3',
            image: 'https://i.ytimg.com/vi/OJfx0vO5Rak/maxresdefault.jpg',
            release: '01/04/2019'
        },
        {
            name:'Lý do là gì',
            singer: 'Lê Gia Quân',
            path: './song/LyDoLaGi.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/mv/2022/04/07/9/c/e/8/1649323030820_640.jpg',
            release: '13/11/2020'
        },
        {
            name:'Lắng nghe nước mắt',
            singer: 'MR Siro',
            path: './song/LNNM.mp3',
            image: 'https://i1.sndcdn.com/artworks-000657892486-mafx5z-t500x500.jpg',
            release: '20/12/2021'
        },
        {
            name:'Cuộc gọi cuối',
            singer: 'T.R.I',
            path: './song/cuocGoiCuoi-TRI.mp3',
            image: 'https://tailieumoi.vn/storage/uploads/images/post/banner/tri-prod-davis-1659344216.png',
            release: '20/12/2021'
        },
        {
            name:'Anh sẽ ổn thôi',
            singer: 'Vương Anh Tú',
            path: './song/anhSeOnThoi.mp3',
            image: 'https://i.ytimg.com/vi/uk7xxK0g-wo/maxresdefault.jpg',
            release: '17/12/2019'
        },
        {
            name:'Cảm ơn vì tất cả',
            singer: 'Anh Quân',
            path: './song/CamOnViTatCa.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b2734a002be8c4b4bb0a9e577ca7',
            release: '06/08/2022'
        },
        {
            name:'Giữ lại được chi',
            singer: 'Reddy',
            path: './song/giuLaiDuocChi_Reddy.mp3',
            image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/1/4/4/4/1444bcd1da05066e7562e0e34c609ff4.jpg',
            release: '27/09/2021'
        },
        {
            name:'Không trọn vẹn nữa',
            singer: 'Châu Khải Phong',
            path: './song/KhongTronVenNua_CKPhong.mp3',
            image: 'https://dj24h.com/wp-content/uploads/2022/01/khong-tron-ven-nua-ciray-remix-chau-khai-phong.jpg',
            release: '27/09/2021'
        },
        {
            name:'Nặng tình hay nhẹ lòng',
            singer: 'Tống Gia Vĩ',
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
            name:'Càng níu giữ càng dễ mất',
            singer: 'MR Siro',
            path: './song/CangNiuGiuCangDeMat.mp3',
            image: 'http://pianominhthanh.vn/upload/image/B%C3%A0i%20Vi%E1%BA%BFt%202018/sheet-nhac-piano-cang-giu-cang-de-mat-mr-siro-jpg.jpg',
            release: '11/01/2023'
        },
        {
            name:'Đáp án cuối cùng',
            singer: 'Quân AP',
            path: './song/DapAnCuoiCung-QuânP.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2022/09/16/0/2/1/c/1663300860128_640.jpg',
            release: '10/01/2022'
        },
        {
            name:'Tấm thân dãi dầu',
            singer: 'Phát Huy - TRUZG',
            path: './song/TamThanDaiDau.mp3',
            image: 'https://i.ytimg.com/vi/O9Bqpv-Eosk/maxresdefault.jpg',
            release: '20/11/2021'
        },
    ],
    setConfig: function(key, value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config));
    },
    // Hàm render playlist
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

    // Hàm định nghĩa các thuộc tính cho object 
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.song[this.currentIndex];
            }
        })
    },
    // Hàm tải thông tin bài hát hiện tại
    loadCurrentSong: function(){
        // app.setConfig('currentIndex', app.currentIndex);
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
        // this.currentIndex = this.config.currentIndex;
    },
    // hàm next bài hát
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.song.length) this.currentIndex=0;
        app.loadCurrentSong();
    },

    // hàm preve bài hát
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0) this.currentIndex = this.song.length - 1;
        app.loadCurrentSong();
    },

    // Hàm phát random bài hát
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
        }, 100)
    },

    // Hàm xử lý các sự kiện
    handleEvent: function(){

        // Xử lý CD quay/dừng
        const CDAnimation = CDThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 18000,
            iterations: Infinity,
        })
        
        CDAnimation.pause();

        //Xử lý khi ấn play
        playBtn.onclick = function(){
            if(app.isPlaying){
                audio.pause();
            } 
            else{
                audio.play();
            }
        }

        // Khi bài hát được play
        audio.onplay = function(){
            app.isPlaying = true;
            audio.play();
            addClass(playBtn, 'playing');
            CDAnimation.play();
        }

        // Khi bài hát bị pause
        audio.onpause = function(){
            audio.pause();
                removeClass(playBtn, 'playing'); 
                app.isPlaying = false;
                CDAnimation.pause();
        }

        // Thời lượng của bài hát hiện tại khi bài hát được load
        audio.onloadeddata = function(){
            if( (Math.floor(this.duration % 60)) < 10){
                maxDuaration.innerText = `${Math.floor(this.duration / 60)}:0${Math.floor(this.duration % 60)}`;
            }
            else{
                maxDuaration.innerText = `${Math.floor(this.duration / 60)}:${Math.floor(this.duration % 60)}`;
            }
        }
                
        // Khi tiến độ bài hát thay đổi
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

        // Khi âm thanh bài hát thay đổi
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

        // Cập nhật tiến trình khi click
        progressBar.onmousedown = function(e){
            let progressBarWidth = this.clientWidth;
            let clickOffsetX = e.offsetX;
            audio.currentTime = (clickOffsetX * audio.duration / progressBarWidth);
        }

        // Điều chỉnh âm lượng khi click vào thanh volume
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

        // Khi ấn next bài hát
        nextBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong();
            }
            else{
                app.nextSong();
            }
            audio.play();
            app.scrollToActiveSong();
        }

        // khí ấn prev bài hát
        prevBtn.onclick = function(){
            if(app.isRandom){
                app.randomSong();
            }
            else{
                app.prevSong();
            }
            audio.play();
            app.scrollToActiveSong();
        }

        // khi bật tắt nút random
        randomBtn.onclick = function(){
            app.isRandom = !app.isRandom;
            app.setConfig('isRandom', app.isRandom);
            randomBtn.classList.toggle('active', app.isRandom);
        }

        // khi bật tắt repeat
        repeatBtn.onclick = function(){
            app.isRepeat = !app.isRepeat;
            app.setConfig('isRepeat', app.isRepeat);
            repeatBtn.classList.toggle('active', app.isRepeat);
        }

        //  khi click vào song
        playList.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)');
            if(songNode){
                app.currentIndex = Number(songNode.dataset.index);
                app.loadCurrentSong();
                audio.play();
            }
        }

        // Khi kết thúc 1 bài hát
        audio.onended = function(){
            if(app.isRepeat){
                audio.play();
            }else{
                nextBtn.click();
            }
        }
        audio.onloadeddata = function(){
            $('.song.active').classList.remove('active');
            songs[app.currentIndex].classList.add('active');
        }
    },

    start: function(){
        this.loadConfig();
        randomBtn.classList.toggle('active', app.isRandom);
        repeatBtn.classList.toggle('active', app.isRepeat);
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        audio.volume = 0.4;
        this.handleEvent();
    }
} 
app.start();


