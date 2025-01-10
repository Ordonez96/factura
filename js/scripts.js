// Configuración del gráfico
const ctx = document.getElementById('consumptionChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [{
      label: 'Consumo (kWh)',
      data: [120000, 130000, 110000, 140000, 125000],
      backgroundColor: 'rgba(0, 123, 255, 0.5)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Generar el código QR
const qrCanvas = document.getElementById('qrCodeCanvas');
QRCode.toCanvas(qrCanvas, 'http://www.example.com', function (error) {
    if (error) console.error(error);
    console.log('¡Código QR generado con éxito!');
});

// Descargar como PDF
document.getElementById("downloadPDF").addEventListener("click", () => {
  const element = document.querySelector(".container"); // Selecciona el contenedor principal
  const { jsPDF } = window.jspdf;

  html2canvas(element).then(canvas => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save("Factura_Energia.pdf");
  });
});

// Descargar como Word
document.getElementById("downloadWord").addEventListener("click", () => {
  const element = document.querySelector(".container").outerHTML; // Extraer el HTML
  const blob = new Blob(['\ufeff' + element], { type: "application/msword" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "Factura_Energia.doc";
  link.click();
});
