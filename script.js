const API_KEY = "d695b3b809afe42bf93b2d675b8bb85095e05105c908e0500cbc71388ff9a10a";

async function searchHospital() {
  const keyword = document.getElementById("searchInput").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "검색 중입니다...";

  const url =
    `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList` +
    `?serviceKey=${API_KEY}` +
    `&pageNo=1` +
    `&numOfRows=10` +
    `&sidoCd=${keyword}` +
    `&_type=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const items = data.response.body.items.item;

    if (!items || items.length === 0) {
      resultDiv.innerHTML = "검색 결과가 없습니다.";
      return;
    }

    resultDiv.innerHTML = "";

    items.forEach(hospital => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${hospital.yadmNm}</h3>
        <p>📍 주소: ${hospital.addr}</p>
        <p>☎ 전화번호: ${hospital.telno}</p>
      `;

      resultDiv.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "오류가 발생했습니다.";
  }
}