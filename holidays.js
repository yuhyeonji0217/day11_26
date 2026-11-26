const holidayCountry = document.querySelector('#holiday-countries');
const holidayBtn = document.querySelector('#holiday-btn');
const output2 = document.querySelector('#output1');

// 현재 연도
const year = new Date().getFullYear();

// 국가별 공휴일 조회 함수
async function getHolidays() {
    // 선택한 국가 코드
    const country = holidayCountry.value;

    // API 주소
    const url = `https://nagerholidays.com/api/v4/Holidays/${country}/${year}`;

    // 조회 중 표시
    output2.textContent = '공휴일을 불러오는 중입니다.';

    try {
        // API 요청
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('API 요청 실패');
        }

        // JSON 데이터 변환
        const holidays = await response.json();

        // 전국 공휴일만 추출
        const nationalHolidays = holidays.filter(holiday => {
            return holiday.nationalHoliday === true;
        });

        // 기존 목록 초기화
        output2.innerHTML = '';

        // 제목 생성
        const title = document.createElement('h3');
        title.textContent = `${year}년 공휴일`;
        output2.appendChild(title);

        // 목록 생성
        const ul = document.createElement('ul');

        nationalHolidays.forEach(holiday => {
            const li = document.createElement('li');

            li.textContent = `${holiday.date} - ${holiday.name}`;

            ul.appendChild(li);
        });

        output2.appendChild(ul);

        // 결과가 없는 경우
        if (nationalHolidays.length === 0) {
            output2.textContent = '등록된 공휴일이 없습니다.';
        }

    } catch (error) {
        console.error(error);
        output2.textContent = '공휴일 조회에 실패했습니다.';
    }
}

// 버튼 클릭 이벤트
holidayBtn.addEventListener('click', getHolidays);