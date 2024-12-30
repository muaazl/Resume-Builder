document.addEventListener('DOMContentLoaded', () => {
    const autoGenerateBtn = document.getElementById('autoGenerateBtn');
    const manualWriteBtn = document.getElementById('manualWriteBtn');
    const autoGenerateForm = document.getElementById('autoGenerateForm');
    const manualEditorDiv = document.getElementById('manualEditor');
    const previewContainer = document.getElementById('previewContainer');
     const coverLetterPreview = document.getElementById('coverLetterPreview');
    const downloadBtn = document.getElementById('downloadBtn');
    const autoPreviewBtn = document.getElementById('autoPreviewBtn');
    const manualPreviewBtn = document.getElementById('manualPreviewBtn');
    const manualTextArea = document.getElementById('manualTextArea');
      const autoForm = document.getElementById('autoForm');
  
  
     let currentEditor = null;
  
  
  
        autoGenerateBtn.addEventListener('click', () => {
          autoGenerateForm.classList.remove('hidden');
          manualEditorDiv.classList.add('hidden');
            previewContainer.classList.add('hidden');
            downloadBtn.classList.add('hidden');
             manualTextArea.value = "";
           currentEditor = 'auto';
      });
  
  
      manualWriteBtn.addEventListener('click', () => {
         autoGenerateForm.classList.add('hidden');
         manualEditorDiv.classList.remove('hidden');
         previewContainer.classList.add('hidden');
        downloadBtn.classList.add('hidden');
          currentEditor = 'manual';
  
     });
  
  
  
      const generateAutoCoverLetterContent = () => {
          const formData = new FormData(autoForm);
           const autoData = Object.fromEntries(formData);
  
  
           let coverLetterHTML =`
              <p>Dear Hiring Manager,</p>
  
               <p>My name is <strong>${autoData.userNameAuto}</strong> and I am writing to express my interest in the ${autoData.jobTitle} position at ${autoData.companyName}.</p>
  
              <p>I understand that the position requires skills in the following areas, as described in the job description:</p>
  
               <p>${autoData.jobDescription}</p>
  
              <p>I am confident that my qualifications align well with the requirements for this position.  I am excited about the opportunity to contribute to the success of ${autoData.companyName}. Thank you for your time and consideration. I look forward to hearing from you soon.</p>
  
               <p>Sincerely,</p>
                <p><strong>${autoData.userNameAuto}</strong></p>
          `;
           return coverLetterHTML;
     }
  
  
     const generateManualCoverLetterContent = () => {
            const userName = document.getElementById("userNameManual").value;
           let coverLetterHTML = `
                  <p>Dear Hiring Manager,</p>
                   <p>My name is <strong>${userName}</strong> and  I am writing to express my interest in a potential position at your company.</p>
                  <p>${manualTextArea.value}</p>
  
                 <p>Sincerely,</p>
                <p><strong>${userName}</strong></p>
           `
             return coverLetterHTML;
  
     };
  
     autoPreviewBtn.addEventListener('click', () => {
         if(autoForm.checkValidity()){
             previewContainer.classList.remove('hidden');
            coverLetterPreview.innerHTML = generateAutoCoverLetterContent();
             downloadBtn.classList.remove('hidden');
         }else{
             alert('Please fill out all required fields!');
         }
  
     });
  
  
  
     manualPreviewBtn.addEventListener('click', () => {
         if (document.getElementById('userNameManual').value !== '' && manualTextArea.value !== ''){
           previewContainer.classList.remove('hidden');
           coverLetterPreview.innerHTML = generateManualCoverLetterContent();
           downloadBtn.classList.remove('hidden');
       } else {
           alert('Please make sure your name is filled in the form and that there is content in the manual input!');
       }
  
     });
  
  
    downloadBtn.addEventListener('click', () => {
           const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
             let content;
            if(currentEditor == 'auto'){
                 content = generateAutoCoverLetterContent();
              } else if (currentEditor == 'manual'){
                   content = generateManualCoverLetterContent();
           }
  
          pdf.html(content, {
             callback: function (pdf) {
                  pdf.save('coverletter.pdf');
              }
        });
     });
  });