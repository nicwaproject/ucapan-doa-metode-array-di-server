document.getElementById("ucapanForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value;
  const ucapan = document.getElementById("ucapan").value;
  const doa = document.getElementById("doa").value;
  const kehadiran = document.getElementById("kehadiran").value;

  const newUcapanDoa = {
    nama: nama,
    ucapan: ucapan,
    doa: doa,
    kehadiran: kehadiran
  };

  fetch("https://handle-pesan-dengan-array-server.glitch.me/ucapan", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(newUcapanDoa)
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("ucapanForm").reset();
    addUcapanDoaToList(data);
  })
  .catch(error => console.error("Error:", error));
});

function addUcapanDoaToList(ucapanDoa) {
  const list = document.getElementById("ucapanDoaList");

  const ucapanDoaItem = document.createElement("div");
  ucapanDoaItem.className = "ucapanDoa";
  ucapanDoaItem.innerHTML = `<strong>Nama:</strong> ${ucapanDoa.nama} <br>
                             <strong>Ucapan:</strong> ${ucapanDoa.ucapan} <br>
                             <strong>Doa:</strong> ${ucapanDoa.doa} <br>
                             <strong>Kehadiran:</strong> ${ucapanDoa.kehadiran}`;

  list.appendChild(ucapanDoaItem);
}

// Load all ucapan dan doa on page load
window.onload = function() {
  fetch("https://handle-pesan-dengan-array-server.glitch.me/ucapan")
  .then(response => response.json())
  .then(data => {
    data.forEach(ucapanDoa => {
      addUcapanDoaToList(ucapanDoa);
    });
  })
  .catch(error => console.error("Error:", error));
};
