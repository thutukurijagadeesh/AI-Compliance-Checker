const chooseBtn = document.getElementById('chooseBtn');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const fileType = document.getElementById('fileType');
const statusMsg = document.getElementById('statusMsg');

chooseBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    fileName.textContent = file.name;
    fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';
    fileType.textContent = file.type || 'Unknown';
    fileInfo.classList.remove('hidden');
    uploadBtn.classList.remove('hidden');
    statusMsg.textContent = '';
  }
});

uploadBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file first!');
    return;
  }

  // Simulate upload process
  uploadBtn.disabled = true;
  uploadBtn.textContent = 'Analyzing...';

  setTimeout(() => {
    uploadBtn.disabled = false;
    uploadBtn.textContent = 'Upload & Analyze';
    statusMsg.textContent = `File "${file.name}" ready for processing.`;
  }, 1500);
});
