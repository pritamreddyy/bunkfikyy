// Function to update the displayed slider value with animation
function updateSliderValue() {
  const sliderValue = document.getElementById("targetPercentage").value;
  const sliderDisplay = document.getElementById("sliderValue");
  
  // Add a little bounce animation
  sliderDisplay.style.transform = "scale(1.2)";
  sliderDisplay.textContent = sliderValue;
  
  setTimeout(() => {
    sliderDisplay.style.transform = "scale(1)";
  }, 150);
}

function calculateAttendance() {
  const button = document.querySelector('.calculate-btn');
  const resultDiv = document.getElementById("result");
  
  // Add loading state
  button.classList.add('loading');
  button.innerHTML = '<span class="btn-text">Calculating...</span>';
  
  // Simulate calculation delay for better UX
  setTimeout(() => {
    const totalHours = parseFloat(document.getElementById("totalHours").value);
    const attendedHours = parseFloat(document.getElementById("attendedHours").value);
    const targetPercentage = parseFloat(document.getElementById("targetPercentage").value);

    // Reset button
    button.classList.remove('loading');
    button.innerHTML = '<span class="btn-text">Calculate Attendance</span>';

    // Validation with better error messages
    if (totalHours < 1){
      showResult("Total hours must be greater than zero.", "warning");
      return;
    }
    if (attendedHours > totalHours) {
      showResult("Attended hours cannot be greater than total hours.", "warning");
      return;
    }

    if (isNaN(totalHours) || isNaN(attendedHours) || isNaN(targetPercentage)) {
      showResult("Please enter valid numbers in all fields.", "warning");
      return;
    }

    const targetPercentageDecimal = targetPercentage / 100;
    const attendancePercentage = Math.trunc(((100/totalHours)*attendedHours) * 10) / 10;
    const requiredAttendedHours = (attendedHours - (targetPercentageDecimal * totalHours)) / (targetPercentageDecimal -1) ;
    const futureHoursToAttend = Math.ceil(requiredAttendedHours);
    const bunkableHours = Math.floor((attendedHours*100)/(targetPercentage)-totalHours);

    let result = `<p><strong>Current Attendance:</strong> ${attendancePercentage}%</p>`;
    let resultType = "success";

    if (futureHoursToAttend > 0) {
      result += `<p><strong>Classes needed:</strong> Attend ${futureHoursToAttend} more hours to reach ${targetPercentage}%</p>`;
      resultType = attendancePercentage < targetPercentage ? "warning" : "success";
    } else {
      result = `<p><strong>Congratulations!</strong> You have ${attendancePercentage}% attendance!</p>`;
      if (bunkableHours > 0){
        result += `<p><strong>Classes you can skip:</strong> ${bunkableHours} upcoming hours while maintaining ${targetPercentage}% attendance</p>`;
      }
      resultType = "success";
    }
    
    showResult(result, resultType);
  }, 800);
}

function showResult(content, type) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = content;
  resultDiv.className = `result-${type} show`;
}
