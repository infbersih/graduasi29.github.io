function generateQR() {
    let nama = document.getElementById("nama").value.trim().toUpperCase();
    let kelas = document.getElementById("kelas").value.toUpperCase();

    if (!nama || !kelas) {
        alert("Harap masukkan nama dan pilih kelas!");
        return;
    }

    let qrData = `${kelas}-${nama}`;
    let qrContainer = document.getElementById("qrcode");
    let qrText = document.getElementById("qr-text");

    qrContainer.innerHTML = ""; // Bersihkan QR Code sebelumnya
    qrText.innerHTML = ""; // Bersihkan teks sebelumnya

    // Buat Micro QR Code menggunakan qrcode-generator
    let qr = qrcode(0, 'L');
    qr.addData(qrData);
    qr.make();

    // Konversi SVG ke Canvas untuk kompatibilitas html2canvas
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = qr.createSvgTag(3, 0);
    let svg = tempDiv.querySelector("svg");

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let img = new Image();
    
    let svgData = new XMLSerializer().serializeToString(svg);
    let svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    let url = URL.createObjectURL(svgBlob);

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
    };
    img.src = url;

    qrContainer.innerHTML = ""; // Bersihkan container sebelum menambahkan QR Code dalam format image
    qrContainer.appendChild(canvas);

    // Tambahkan Nama & Kelas dalam huruf kapital dengan format yang benar
    qrText.innerHTML = `<div class="kelas">${kelas}</div><div class="nama">${nama}</div>`;

    document.getElementById("invitation-container").classList.remove("d-none");
}

function downloadInvitation() {
    let invitationCard = document.getElementById("invitation-card");
    let nama = document.getElementById("nama").value.trim().toUpperCase();
    let kelas = document.getElementById("kelas").value.toUpperCase();

    if (!nama || !kelas) {
        alert("Harap masukkan nama dan pilih kelas!");
        return;
    }

    // Format nama file: "KELAS_NAMA.png"
    let fileName = `${kelas}_${nama}.png`.replace(/\s+/g, "_"); // Ganti spasi dengan underscore

    html2canvas(invitationCard, { scale: 3 }).then((canvas) => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = fileName;
        link.click();
    });
}