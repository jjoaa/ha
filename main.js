const api = 'B551182/spclMdlrtHospInfoService1/getChildNightMdlrtList1';
const auth = 'MJMD6kyAcwn4zDEcbqLnrUmxmTo4vK0BYwnE9DtEA%2FyqKFmuGzDaRAV7RNTIH4BX1aZ9ujBOdLHeFmEhO%2FGcIA%3D%3D';
const urlBase = 'https://apis.data.go.kr/' + api + '?serviceKey=' + auth +'&numOfRows='+30;


//지역 구분
function Areacode(sigu, sido) {
    
    let urls = [];  // URL 배열 초기화
    let url ='';
    let DB='';

    if (sigu === '경기') {
        DB = DBGg;
        for (let i = 0; i < DB[sido].length; i++) {
            
            url = urlBase+'&sgguCd=' + DB[sido][i];
            urls.push(url); // 생성된 URL을 배열에 추가
        }
    }
    else if (sigu ==='서울') {
        DB = DBSeoul;
        url = urlBase + '&sgguCd=' + DB[sido];
        urls.push(url);

    } else {
        DB = DBArea;
        url =  urlBase +'&sidoCd='+ DB[sigu];
        urls.push(url);
    }

    return urls; 
}


//main.js에 sendUrl함수에서 만든 mv클래스 파싱 함수
// h-name  // 병원명
// h-addr  // 주소
// h-tell  // 전화번호
// h-code  // 병원코드
const mvPage = () => {
    const btn = document.querySelectorAll('.mv'); // 'mv' 클래스를 가진 모든 버튼 선택

    btn.forEach((button, index) => {
        button.addEventListener('click', () => {
            const row = button.closest('tr'); // 클릭된 버튼의 부모 tr 요소 찾기
            const hName = row.querySelector('.h-name').textContent; // 병원명
            const hAddr = row.querySelector('.h-addr').textContent; // 주소
            const hTell = row.querySelector('.h-tell').textContent; // 전화번호
            const hCode = row.querySelector('.h-code').textContent; // 병원코드

            const hospitalInfo = {
                name: hName,
                addr: hAddr,
                telno: hTell,
                code: hCode
            };
            goMap(hospitalInfo);
        });
    });
};


// url 전송
let sendUrl = function(sigu, sido) {
    
    //urls = Areacode();
  
    Areacode(sigu, sido).map((url) => {
        //console.log(url);
        axios.get(url).then((res) => {
            
            let apiList = res.data.response.body.items.item;  

            //console.log(apiList.length);
            
            let tableBody = $('#data-table tbody');

            if (Array.isArray(apiList)) {
                // TODO 나중에할것 가나다순으로?
                apiList.map(function(H_info) {
                    //console.log(H_info); 나는 배열
                    let row = $('<tr class="h-info">'); // 새로운 행 생성
    
                    row.append('<td class="h-name">' + H_info.yadmNm + '</td>');  // 병원명
                    row.append('<td class="h-addr">' + H_info.addr + '</td>');  // 주소
                    row.append('<td class="h-tell">' + H_info.telno + '</td>');  // 전화번호
                    row.append('<td class="h-code">' + H_info.clCdNm+ '</td>');  // 병원코드
                    row.append('<td><button class="mv" onclick="goMap(' + JSON.stringify(H_info) + ')">지도</button></td>');

                   
 
                    // 행을 테이블 본문에 추가
                    tableBody.append(row);
                });
            }
            mvPage();
        })
    })
    .catch(function(error) {
        // 오류 처리
        console.error('API 요청 중 오류가 발생했습니다: ', error);
    });

};

function goMap(hospitalInfo) {
    // hospitalInfo를 URL 파라미터로 변환
    const params = new URLSearchParams({
        name: hospitalInfo.name,
        addr: hospitalInfo.addr,
        telno: hospitalInfo.telno,
        code: hospitalInfo.code
    }).toString();

    // map.html로 이동하면서 파라미터 전달
    window.location.href = './map.html?' + params; 
}
