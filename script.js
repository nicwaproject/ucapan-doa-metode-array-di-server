document.addEventListener("DOMContentLoaded", () => {
  const randomBtn = document.getElementById("randomBtn");
  const randomResult = document.getElementById("randomResult");
  const ucapanForm = document.getElementById("ucapanForm");
  const addResult = document.getElementById("addResult");

  const baseURL = "https://handle-pesan-dengan-array-server.glitch.me";  // Ganti dengan URL proyek Glitch Anda

  randomBtn.addEventListener("click", () => {
    fetch(`${baseURL}/random`)
      .then(response => response.json())
      .then(data => {
        randomResult.innerHTML = `<p><strong>Ucapan:</strong> ${data.ucapan}</p>
                                  <p><strong>Doa:</strong> ${data.doa}</p>
                                  <p><strong>Kehadiran:</strong> ${data.kehadiran}</p>`;
      })
      .catch(error => {
        randomResult.innerHTML = "<p>Error fetching data</p>";
        console.error("Error fetching data:", error);
      });
  });

  ucapanForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const ucapan = document.getElementById("ucapan").value;
    const doa = document.getElementById("doa").value;
    const kehadiran = document.getElementById("kehadiran").value;

    fetch(`${baseURL}/ucapan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `ucapan=${encodeURIComponent(ucapan)}&doa=${encodeURIComponent(doa)}&kehadiran=${encodeURIComponent(kehadiran)}`
    })
      .then(response => response.json())
      .then(data => {
        addResult.innerHTML = `<p>Ucapan dan Doa berhasil ditambahkan!</p>`;
        ucapanForm.reset();
      })
      .catch(error => {
        addResult.innerHTML = "<p>Error adding data</p>";
        console.error("Error adding data:", error);
      });
  });
});
