document.getElementById('fileInput').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
        
        let glabContent = `${img.width}x${img.height},`;
        
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i].toString(16).padStart(2, '0');
          const g = imageData[i+1].toString(16).padStart(2, '0');
          const b = imageData[i+2].toString(16).padStart(2, '0');
          glabContent += `#${r}${g}${b},`;
        }
        
        const blob = new Blob([glabContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.style.display = 'block';
        downloadLink.href = url;
        downloadLink.download = 'convert.artx';
      };
      
      img.src = URL.createObjectURL(file);
    }
  });
  