document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const previewBtn = document.getElementById('previewBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewContainer = document.getElementById('previewContainer');
    const resumePreview = document.getElementById('resumePreview');
  
  
      const generateResumeContent = () => {
        const formData = new FormData(resumeForm);
        const resumeData = Object.fromEntries(formData);
  
         const skillsArray = resumeData.skills.split(',').map(skill => skill.trim());
  
  
          let resumeHTML = `
               <h2 class="text-2xl font-semibold mb-4">Personal Information</h2>
               <p><strong>Name:</strong> ${resumeData.name}</p>
               <p><strong>Email:</strong> ${resumeData.email}</p>
               <p><strong>Phone:</strong> ${resumeData.phone}</p>
              <p><strong>Address:</strong> ${resumeData.address}</p>
  
              <h2 class="text-2xl font-semibold mt-4 mb-4">Education</h2>
              <p><strong>Degree:</strong> ${resumeData.degree}</p>
              <p><strong>Institution:</strong> ${resumeData.institution}</p>
             <p><strong>Duration:</strong> ${resumeData.duration}</p>
  
              <h2 class="text-2xl font-semibold mt-4 mb-4">Work Experience</h2>
              <p><strong>Position:</strong> ${resumeData.position}</p>
             <p><strong>Company:</strong> ${resumeData.company}</p>
             <p><strong>Duration:</strong> ${resumeData.workDuration}</p>
               <p><strong>Responsibilities:</strong> ${resumeData.responsibilities}</p>
  
              <h2 class="text-2xl font-semibold mt-4 mb-4">Skills</h2>
               <ul>
                ${skillsArray.map(skill => `<li>${skill}</li>`).join('')}
               </ul>
           `;
             return resumeHTML;
  
        }
  

    previewBtn.addEventListener('click', () => {
        if (resumeForm.checkValidity()){
              previewContainer.classList.remove('hidden');
             resumePreview.innerHTML = generateResumeContent();
        }else{
           alert("Please fill out all required fields!");
        }
  
    });
  
  
      downloadBtn.addEventListener('click', () => {
         if (resumeForm.checkValidity()){
            const resumeContent = generateResumeContent();
             const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            pdf.html(resumeContent, {
                callback: function (pdf) {
                    pdf.save('resume.pdf');
                }
            });
           }else{
              alert("Please fill out all required fields!");
          }
      });
  });