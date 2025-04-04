document.addEventListener('DOMContentLoaded', function() {
    console.log("hello");
    // URL에서 파라미터 읽기
    const params = new URLSearchParams(window.location.search);

    const hospitalInfo = {
        name: params.get('name'),
        addr: params.get('addr'),
        telno: params.get('telno'),
        code: params.get('code')
    };

    if (hospitalInfo.name && hospitalInfo.addr && hospitalInfo.telno && hospitalInfo.code) {
        console.log(hospitalInfo); // 데이터 확인
        // hospitalInfo 데이터를 화면에 출력하거나 다른 작업 수행
        document.getElementById('hospital-name').textContent = hospitalInfo.name;
        document.getElementById('hospital-address').textContent = hospitalInfo.addr;
        document.getElementById('hospital-tel').textContent = hospitalInfo.telno;
        document.getElementById('hospital-code').textContent = hospitalInfo.code;
    } else {
        console.log("병원 정보가 URL 파라미터에 없습니다.");
    }
});


// 지도
let mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성
let map = new kakao.maps.Map(mapContainer, mapOption);

//--------------------------------------------------------------------------------
//주소-좌표 변환 객체 생성
let geocoder = new kakao.maps.services.Geocoder();
let addr;
let hospital;

addr = '인천광역시 서구 원당대로 660, 401호,402호 일부호 서구 중봉대로612번길 10-16';
hospital = '검단연합의원';
// 주소로 좌표를 검색
// h-name  // 병원명
// h-addr  // 주소
// h-tell  // 전화번호
// h-code  // 병원코드
// var addr;

// function goMap(Harr) {
//     if(Harr == false && Harr == undefined) alert("오류가 있습니다.");
//     else {
//         console.log("test");
//         location.href = "./test.html";
//     }

//     addr = Harr;
    
// };
// // let arr = goMap();

// // let hospital = arr.hName;

// // console.log(addr);

geocoder.addressSearch(addr , function(result, status) {

     if (status === kakao.maps.services.Status.OK) {

        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 위치 마커표시
        let marker = new kakao.maps.Marker({
            map: map,
            position: coords
        });

        //장소 설명표시
        let infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+hospital+'</div>'
        });
        infowindow.open(map, marker);

        // TODO   지도의 중심을 결과값으로 받은 위치로 이동시킵니다 -> 이건 내위치로
        map.setCenter(coords);
    } 
});    



//---------------------------------------------------------------
//3. 다중 마커
//4. 나 위치
//5. 병원 정보 넣기