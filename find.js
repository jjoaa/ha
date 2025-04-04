//검색 목록 

window.onload = populateCities;

function updateDistricts() {
    const citySelect = document.getElementById("city");
    const districtSelect = document.getElementById("district");
    const selectedCity = citySelect.value;

    districtSelect.innerHTML = '';

    // 서울, 경기만 구 목록을 표시
    const districts = (selectedCity === '서울') ? Object.keys(DBSeoul) :
                      (selectedCity === '경기') ? Object.keys(DBGg) : [];

    // 서울, 경기 외 도시는 구 선택 불가
    if (selectedCity === '서울' || selectedCity === '경기') {
        // 구 목록을 두 번째 드롭다운에 추가
        createDistrictOption(districtSelect, '', '구를 선택하세요');
        districts.forEach(district => createDistrictOption(districtSelect, district, district));
        districtSelect.disabled = false;
    } else {
        // 서울, 경기 외의 지역에서는 구 선택 불가
        createDistrictOption(districtSelect, '', '구를 선택할 수 없습니다');
        districtSelect.disabled = true;
    }
}

// 구 옵션을 추가
function createDistrictOption(selectElement, value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}


// 도시 선택 드롭다운을 자동으로 생성하는 함수
function populateCities() {
    const citySelect = document.getElementById("city");
    createCityOption(citySelect, '', '도시를 선택하세요');
    Object.keys(DBArea).forEach(city => createCityOption(citySelect, city, city));

 
}

// 도시 옵션을 추가
function createCityOption(selectElement, value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    selectElement.appendChild(option);
}

// 제출 시 선택된 값 출력
function submit() {
    const citySelect = document.getElementById("city");
    const districtSelect = document.getElementById("district");

    const selectedCity = citySelect.value;
    const selectedDistrict = districtSelect.value;

    let sigu = selectedCity;  
    let sido = selectedDistrict ? selectedDistrict : ''; 
    //alert(`sigu: ${sigu}, sido: ${sido}`);

    //기존 데이터를 비움 처리 
    let tableBody = $('#data-table tbody');
    tableBody.empty();
    //url 전송
    sendUrl(sigu, sido);

   
}
