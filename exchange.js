const exchangeCountry = document.querySelector('#exchange-countries');
const krwAmount = document.querySelector('#krwAmount');
const exchangeBtn = document.querySelector('#exchange-btn');
const output1 = document.querySelector('#output2');

// 현재 선택한 연도와 관계없이 API 기준 환율을 가져옴
async function getExchangeRate() {

    // 선택한 통화 가져오기
    const currency = exchangeCountry.value;

    // 입력한 원화 금액 가져오기
    const amount = Number(krwAmount.value);

    // 입력값 확인
    if (!Number.isFinite(amount) || amount < 0) {
        output1.textContent = '올바른 금액을 입력하세요.';
        return;
    }

    // 조회 중 표시
    output1.textContent = '환율을 불러오는 중입니다.';

    // API 주소
    const url =
        `https://api.frankfurter.dev/v2/rates?base=KRW&quotes=${currency}`;

    try {
        // API 요청
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('환율 API 요청 실패');
        }

        // JSON 데이터 변환
        const data = await response.json();

        // 환율 정보 가져오기
        const rate = data[0].rate;
        const date = data[0].date;

        // 환율 계산
        const result = amount * rate;

        // 국가 이름 설정
        const currencyNames = {
            JPY: '일본 엔화',
            USD: '미국 달러',
            HKD: '홍콩 달러'
        };

        // 결과 출력
        output1.innerHTML = `
            <strong>${currencyNames[currency]}</strong>
            <p>기준 금액: ${amount.toLocaleString()}원</p>
            <p>환율: 1원 = ${rate} ${currency}</p>
            <p>환전 금액: ${result.toLocaleString('ko-KR', {
                maximumFractionDigits: 2
            })} ${currency}</p>
            <small>환율 기준일: ${date}</small>
        `;

    } catch (error) {
        console.error(error);
        output1.textContent = '환율 조회에 실패했습니다.';
    }
}

// 버튼 클릭 이벤트
exchangeBtn.addEventListener('click', getExchangeRate);